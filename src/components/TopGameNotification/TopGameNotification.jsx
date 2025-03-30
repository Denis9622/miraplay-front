import { useEffect, useState } from "react";
import styles from "./TopGameNotification.module.css";
import { socketService } from "../../api/socket";

const TopGameNotification = () => {
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    socketService.subscribe("popularGame", (data) => {
      if (!data || typeof data !== "object") return;
      const { commonGameName, inTop } = data;
      if (!commonGameName) return;

      setNotification(
        inTop
          ? `Гру "${commonGameName}" додано до топу!`
          : `Гру "${commonGameName}" видалено з топу!`
      );
      setTimeout(() => setNotification(null), 3000);
    });

    return () => {
      socketService.unsubscribe("popularGame");
    };
  }, []);

  if (!notification) return null;

  return (
    <div className={styles.notification}>
      <p>{notification}</p>
      <button
        className={styles.closeButton}
        onClick={() => setNotification(null)}
      >
        ✕
      </button>
    </div>
  );
};

export default TopGameNotification;
