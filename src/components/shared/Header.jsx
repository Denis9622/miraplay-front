import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../redux/auth/authOperations";

import { useNavigate, NavLink } from "react-router-dom";
import styles from "./Header.module.css";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user); // Получаем пользователя из стора
  const [ setSignUpOpen] = useState(false);
  const [ setSignInOpen] = useState(false);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate("/login"); // Перенаправляем на страницу входа
  };

  return (
    <header className={styles.header}>
      {/* Logo (Главная для авторизованного, LoginPage для гостя) */}
      <h1 className={styles.logo}>
        <NavLink to={user ? "/" : "/login"}>Medicine Store</NavLink>
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
        </ul>
      </nav>

      {/* Аутентификация */}
      <div className={styles.userAuth}>
        {user ? (
          <>
            {/* Email пользователя */}
            <span className={styles.username}>{user.email}</span>
            {/* Кнопка выхода */}
            <button
              onClick={handleLogout}
              className={`${styles.linkAuth} ${styles.logoutUserButton}`}
            >
              Logout
            </button>
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
  );
}

export default Header;
