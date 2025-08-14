import { useEffect } from "react";

type ToastProps = {
  message: string;
  show: boolean;
  onClose: () => void;
};

export default function Toast({ message, show, onClose }: ToastProps) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onClose, 5000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  return (
    <div
      className={`fixed bottom-5 right-5 px-4 py-3 rounded-lg shadow-lg text-white select-none text-sm transition-opacity duration-500 ${
        show ? "opacity-100 bg-green-600" : "opacity-0 pointer-events-none"
      }`}
    >
      {message}
    </div>
  );
}
