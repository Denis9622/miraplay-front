import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "./HeadSwiper.module.css";

const HeadSwiper = ({ onAuthClick }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleStartPlayingClick = () => {
    if (isAuthenticated) {
      navigate("/games");
    } else if (typeof onAuthClick === "function") {
      onAuthClick("login");
    }
  };

  return (
    <section className={styles.welcome}>
      <video
        src="/head_bd_video.2373e50d378dc15f1bb7.mp4"
        type="video/mp4"
        className={styles.video}
        loop
        autoPlay
        muted
        playsInline
      />
      <div className={styles.welcomeBotBg}></div>
      <div className={styles.content}>
        <div className={styles.swiperSlideItem}>
          <h1 className={styles.title}>
            Грай у улюблені{" "}
            <span className={styles.thickTitle}>шутери, стратегії, гонки</span>{" "}
            <br />в хмарі
          </h1>
          <p className={styles.text}>
            Топові ігри на{" "}
            <span className={styles.thickText}>будь-якому ПК</span> вже зараз,
            реєструйся і грай 30 хв безкоштовно
          </p>
          <div>
            <button
              className={styles.btn}
              onClick={handleStartPlayingClick}
              type="button"
            >
              {isAuthenticated ? "ПОЧАТИ ГРАТИ" : "РЕЄСТРАЦІЯ"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeadSwiper;
