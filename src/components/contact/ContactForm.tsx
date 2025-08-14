import { useState } from "react";
import Toast from "./Toast";

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
        setToast({ show: true, message: t('Contact.message_1')}); 
        form.reset();
      } else {
        setToast({ show: true, message: t('Contact.message_2')});
      }
    } catch {
      setToast({ show: true, message: t('Contact.message_3')});
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-jet flex flex-col items-center justify-center p-4 bg-[var(--bg-secondary-transparent)] rounded-lg shadow w-full">
      <h3 className="text-[var(--text-terceiro)] text-base font-semibold mb-4 select-none">
        {t('Contact.titulo_2')}
      </h3>

      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3 text-[var(--text-primary)] text-sm">
        <input
          type="text"
          name="name"
          placeholder={t('Contact.name')}
          required
          className="p-2 rounded bg-[var(--button-bg)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-primary select-none text-sm"
        />
        <input
          type="email"
          name="email"
          placeholder={t('Contact.email_2')}
          required
          className="p-2 rounded bg-[var(--button-bg)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-primary select-none text-sm"
        />
        <textarea
          name="message"
          placeholder={t('Contact.mensagem')}
          required
          rows={4}
          className="p-2 rounded bg-[var(--button-bg)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-primary select-none text-sm"
        ></textarea>

        <button
          type="submit"
          disabled={loading}
          className={`${
            loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
          } transition cursor-pointer text-white p-2 rounded font-semibold flex items-center justify-center select-none text-sm`}
        >
          {loading ? (
            <>
              <svg
                className="animate-spin h-5 w-5 mr-2 text-white"
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
      </form>

      <Toast
        message={toast.message}
        show={toast.show}
        onClose={() => setToast({ ...toast, show: false })}
      />
    </div>
  );
}
