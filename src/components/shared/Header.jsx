import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../redux/auth/authSlice";
import styles from "./Header.module.css";
import Authorization from "../Authorization/Authorization";
import { useSocket } from "../../contexts/SocketContext";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [scrolled, setScrolled] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const socketService = useSocket();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAuthClick = () => {
    setIsAuthModalOpen(true);
    setAuthMode("login");
  };

  const handleAuthClose = () => {
    setIsAuthModalOpen(false);
  };

  const handleAuthModeChange = (newMode) => {
    setAuthMode(newMode);
  };

  const handleLogout = () => {
    if (user) {
      socketService.emitUserLogout(user._id);
    }
    dispatch(logout());
    navigate("/");
  };

  const handleGamesClick = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      handleAuthClick();
    } else {
      navigate("/games");
      setIsMenuOpen(false);
    }
  };

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
        <div className={styles.container}>
          <Link to="/" className={styles.logoWrap}>
            <h5 className={styles.logoTitle}>MIRAPLAY</h5>
            <p className={styles.logoText}>Cloud Gaming</p>
          </Link>

          <nav className={`${styles.nav} ${isMenuOpen ? styles.active : ""}`}>
            <ul className={styles.list}>
              <li className={styles.item}>
                <a
                  href="/games"
                  onClick={handleGamesClick}
                  className={styles.link}
                >
                  <h5 className={styles.title}>Ігри</h5>
                </a>
                <div className={styles.botLine}></div>
              </li>
            </ul>
          </nav>

          <div className={styles.btnWrap}>
            {!isAuthenticated ? (
              <>
                <button
                  className={`${styles.btn} ${styles.authBtn}`}
                  onClick={handleAuthClick}
                  type="button"
                >
                  Увійти
                </button>
                <button
                  className={`${styles.btn} ${styles.authBtn} ${styles.signupBtn}`}
                  onClick={() => handleAuthModeChange("register")}
                  type="button"
                >
                  Реєстрація
                </button>
              </>
            ) : (
              <>
                <button
                  className={`${styles.btn} ${styles.authBtn} ${styles.adminBtn}`}
                  onClick={() => navigate("/admin")}
                  type="button"
                >
                  Адмінпанель
                </button>
                <button
                  className={`${styles.btn} ${styles.authBtn}`}
                  onClick={handleLogout}
                  type="button"
                >
                  Вийти
                </button>
              </>
            )}
          </div>
        </div>
      </header>
      {isAuthModalOpen && (
        <Authorization
          isOpen={isAuthModalOpen}
          onClose={handleAuthClose}
          mode={authMode}
          onModeChange={handleAuthModeChange}
        />
      )}
    </>
  );
};

export default Header;
