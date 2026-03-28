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

  // Efeito para sumir a mensagem de feedback após 5 segundos
  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        setToast((prev) => ({ ...prev, show: false }));
      }, 5000);
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
          disabled={loading}
          className={`${loading ? "bg-[var(--button-bg)] cursor-not-allowed" : "bg-[var(--button-bg)] hover:bg-[var(--button-hover)]"
            } transition cursor-pointer text-[var(--text-primary)] p-3 rounded font-semibold flex items-center justify-center select-none text-sm w-full mt-1 active:scale-95`}
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
          ) : (
            t('Contact.enviar')
          )}
        </button>

        {/* Mensagem de Feedback Flutuante (Absolute para não quebrar o layout) */}
        <div
          className={`absolute -bottom-16 left-0 right-0 p-3 rounded-md text-center text-sm font-medium transition-all duration-500 pointer-events-none ${toast.show
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 -translate-y-2 scale-95"
            } ${toast.message === t('Contact.message_1')
              ? "bg-green-500/20 text-green-400 border border-green-500/30"
              : "bg-red-500/20 text-red-400 border border-red-500/30"
            }`}
        >
          {toast.message}
        </div>
      </form>
    </div>
  );
}
