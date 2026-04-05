import { useState, useRef, useEffect } from "react";
import ReCAPTCHA from "react-google-recaptcha";

import { useTranslation } from "react-i18next";

type ToastState = {
  show: boolean;
  message: string;
};

export default function ContactForm() {
  const { t, i18n } = useTranslation();
  document.documentElement.lang = i18n.language;

  const [toast, setToast] = useState<ToastState>({ show: false, message: "" });
  const [loading, setLoading] = useState(false);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  // Detectar o tema atual do site
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : true;
  });

  // Observar mudanças no tema
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const currentTheme = document.body.className.includes('dark-theme');
      setIsDarkMode(currentTheme);
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  // Efeito para sumir a mensagem de feedback após 3 segundos
  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        setToast((prev) => ({ ...prev, show: false }));
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast.show]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validar reCAPTCHA
    const recaptchaValue = recaptchaRef.current?.getValue();

    if (!recaptchaValue) {
      setToast({ show: true, message: t('Contact.message_captcha') });
      return;
    }

    setLoading(true);
    const form = e.currentTarget;
    const formData = new FormData(form);

    // Configurações extras do FormSubmit
    formData.append("_captcha", "false");
    formData.append("_template", "box");

    try {
      const res = await fetch("https://formsubmit.co/ajax/contato.andrecodedev@gmail.com", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success === "true") {
        setToast({ show: true, message: t('Contact.message_1') });
        form.reset();
        recaptchaRef.current?.reset(); // Reset reCAPTCHA
      } else {
        setToast({ show: true, message: t('Contact.message_2') });
      }
    } catch {
      setToast({ show: true, message: t('Contact.message_3') });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-jet flex flex-col items-center justify-center p-4 bg-[var(--bg-secondary-transparent)] rounded-lg shadow w-full">
      <h3 className="text-[var(--text-terceiro)] text-base font-semibold mb-4 select-none">
        {t('Contact.titulo_2')}
      </h3>

      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3 text-[var(--text-primary)] text-sm relative">
        <input
          type="text"
          name="name"
          placeholder={t('Contact.name')}
          required
          className="p-3 rounded bg-[var(--button-bg)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-primary select-none text-sm transition-all"
        />
        <input
          type="email"
          name="email"
          placeholder={t('Contact.email_2')}
          required
          className="p-3 rounded bg-[var(--button-bg)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-primary select-none text-sm transition-all"
        />
        <textarea
          name="message"
          placeholder={t('Contact.mensagem')}
          required
          rows={4}
          className="p-3 rounded bg-[var(--button-bg)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-primary select-none text-sm transition-all"
        ></textarea>

        {/* Google reCAPTCHA */}
        <div className="flex justify-center w-full my-1">
          <ReCAPTCHA
            key={isDarkMode ? 'dark' : 'light'}
            ref={recaptchaRef}
            sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY || "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"}
            theme={isDarkMode ? "dark" : "light"}
            className="recaptcha-container"
          />
        </div>

        <button
          type="submit"
          disabled={loading || toast.show}
          className={`transition-all duration-300 cursor-pointer p-3 rounded font-semibold flex items-center justify-center select-none text-sm w-full mt-1 active:scale-95 ${loading ? "cursor-not-allowed opacity-80" : "hover:bg-[var(--button-hover)]"
            } ${toast.show
              ? toast.message === t('Contact.message_1')
                ? "bg-green-600 text-white"
                : "bg-[var(--error)] text-white hover:bg-[var(--error-hover)]"
              : "bg-[var(--button-bg)] text-[var(--text-primary)]"
            }`}
        >
          {loading ? (
            <>
              <svg
                className="animate-spin h-5 w-5 mr-3 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
                ></path>
              </svg>
              {t('Contact.enviando')}
            </>
          ) : toast.show ? (
            toast.message
          ) : (
            t('Contact.enviar')
          )}
        </button>
      </form>
    </div>
  );
}
