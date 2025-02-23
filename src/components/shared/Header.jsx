import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../redux/auth/authOperations";
import { useNavigate, NavLink } from "react-router-dom";
import SignIn from "../../pages/LoginPage"; // Подключаем модалку входа
import SignUp from "../../pages/SignupPage"; // Подключаем модалку регистрации
import styles from "./Header.module.css";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user); // Получаем пользователя из Redux
  console.log("User from Redux:", user);


  const [isSignUpOpen, setSignUpOpen] = useState(false);
  const [isSignInOpen, setSignInOpen] = useState(false);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate("/login"); // Перенаправляем на страницу входа
  };

  return (
    <>
      
      <header className={styles.header}>
        {/* Логотип */}
        <h1 className={styles.logo}>
          <NavLink to="/">Medicine Store</NavLink>
        </h1>

        {/* Навигация */}
        <nav className={styles.nav}>
          <ul className={styles.ulclass}>
            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive ? styles.navLinkActive : styles.navLink
                }
              >
                Dashboard
              </NavLink>
            </li>
            {user && (
              <li>
                <NavLink
                  to="/favorites"
                  className={({ isActive }) =>
                    isActive ? styles.navLinkActive : styles.navLink
                  }
                >
                  Favorites
                </NavLink>
              </li>
            )}
          </ul>
        </nav>

        {/* Аутентификация */}
        <div className={styles.userAuth}>
          {user ? (
            <>
              {/* Блок с именем пользователя и выходом */}
              <div className={styles.userInfo}>
                <span className={styles.username}>
                  {user.displayName || user.email}
                </span>
                <button
                  onClick={handleLogout}
                  className={`${styles.linkAuth} ${styles.logoutUserButton}`}
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Кнопки входа и регистрации */}
              <button
                onClick={() => setSignInOpen(true)}
                className={styles.linkAuth}
              >
                Log In
              </button>
              <button
                onClick={() => setSignUpOpen(true)}
                className={styles.linkAuth}
              >
                Registration
              </button>
            </>
          )}
        </div>
      </header>

      {/* Модалки для входа и регистрации */}
      {isSignInOpen && <SignIn onClose={() => setSignInOpen(false)} />}
      {isSignUpOpen && <SignUp onClose={() => setSignUpOpen(false)} />}
      
    </>
  );
}

export default Header;
