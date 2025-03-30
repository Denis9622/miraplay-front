import { useEffect, useState } from "react";
import css from "./GameNotification.module.css";

export default function GameNotification({ message, type, onClose }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  if (!isVisible) return null;

  return (
    <div className={`${css.notification} ${css[type]}`}>
      <p>{message}</p>
      <button
        onClick={() => {
          setIsVisible(false);
          onClose();
        }}
        className={css.closeButton}
      >
        ✕
      </button>
    </div>
  );
}
