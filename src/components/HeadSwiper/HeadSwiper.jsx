import styles from "./HeadSwiper.module.css";

function HeadSwiper() {
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
      <div
        className={`swiper swiper-initialized swiper-horizontal swiper-pointer-events ${styles.swiper} swiper-backface-hidden`}
      >
        <div
          className="swiper-wrapper"
          style={{ transform: "translate3d(0px, 0px, 0px)" }}
        >
          <div
            className={`swiper-slide ${styles.swiperSlide} swiper-slide-active`}
            style={{ width: "1300px" }}
          >
            <div>
              <img
                className={styles.secondWarrior}
                src="/static/media/warrior2-bg.9dca7da456022ed648d2.png"
                alt="warriorBg"
              />
              <div className={styles.swiperSlideItem}>
                <h1
                  className={styles.title}
                  style={{ opacity: 1, transform: "none" }}
                >
                  Грай у улюблені{" "}
                  <span className={styles.thickTitle}>
                    шутери, стратегії, гонки
                  </span>
                  в хмарі
                </h1>
                <p
                  className={styles.text}
                  style={{ opacity: 1, transform: "none" }}
                >
                  Топові ігри на{" "}
                  <span className={styles.thickText}>будь-якому ПК</span> вже
                  зараз, реєструйся і грай 30 хв безкоштовно
                </p>
                <div>
                  <button className={styles.btn}>ПОЧАТИ ГРАТИ</button>
                  <button className={styles.downloadBtn}>
                    Скачати клієнт
                    <svg className={styles.icon}>
                      <use href="/static/media/symbol.7171e4effa7582d47429967d0ac6a394.svg#icon-window"></use>
                    </svg>
                    <svg className={`${styles.icon} ${styles.apple}`}>
                      <use href="/static/media/symbol.7171e4effa7582d47429967d0ac6a394.svg#icon-apple"></use>
                    </svg>
                    <p className={styles.downloadText}>
                      Windows (x64), MacOs 10.14+
                    </p>
                  </button>
                </div>
              </div>
              <img
                className={styles.primaryWarrior}
                src="/static/media/dragon-bg.c315081664b44b7c5794.png"
                alt="warrior"
              />
            </div>
          </div>
        </div>
        <div className="swiper-pagination"></div>
      </div>
    </section>
  );
}

export default HeadSwiper;
