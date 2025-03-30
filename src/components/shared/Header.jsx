import { useState, useEffect } from "react";
import styles from "./Header.module.css";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.container}>
        <div className={styles.logoWrap}>
          <div>
            <h5 className={styles.logoTitle}>MIRAPLAY</h5>
            <p className={styles.logoText}>Cloud Gaming</p>
          </div>
        </div>

        <nav className={styles.nav}>
          <ul className={styles.list}>
            <li className={styles.item}>
              <a href="#gamesSection">
                <h5 className={styles.title}>Ігри</h5>
              </a>
              <div className={styles.botLine}></div>
            </li>
          </ul>
        </nav>

        <div className={styles.btnWrap}>
          <button className={styles.btn}></button>
          <button className={`${styles.btn} ${styles.bell}`}></button>
          <button className={styles.btn}></button>
          <button className={`${styles.btn} ${styles.green}`}>
            <div className={styles.iconWrap}>
              <span>Завантажити клієнт</span>
            </div>
            <div className={styles.appleWrap}></div>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
