import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../redux/auth/authOperations";
import { useNavigate, NavLink } from "react-router-dom";
import SignIn from "../../pages/LoginPage";
import SignUp from "../../pages/SignupPage";
import styles from "./Header.module.css";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const [isSignUpOpen, setSignUpOpen] = useState(false);
  const [isSignInOpen, setSignInOpen] = useState(false);

  useEffect(() => {
    console.log("User from Redux:", user);
    console.log("Is Authenticated:", isAuthenticated);
  }, [user, isAuthenticated]);

  const handleLogout = async () => {
    console.log("Logout button clicked");
    await dispatch(logoutUser());
    console.log("User has been logged out");
    navigate("/login");
  };

  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.logo}>
          <NavLink to="/">Medicine Store</NavLink>
        </h1>

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

        <div className={styles.userAuth}>
          {isAuthenticated ? (
            <div className={styles.userInfo}>
              <span className={styles.username}>
                {user && (user.displayName || user.email)}
              </span>
              <button
                onClick={handleLogout}
                className={`${styles.linkAuth} ${styles.logoutUserButton}`}
              >
                Logout
              </button>
            </div>
          ) : (
            <>
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

      {isSignInOpen && <SignIn onClose={() => setSignInOpen(false)} />}
      {isSignUpOpen && <SignUp onClose={() => setSignUpOpen(false)} />}
    </>
  );
}

export default Header;
