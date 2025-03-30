import { Routes, Route } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectIsAuthenticated } from "./redux/auth/selectors";
import { setUser, clearAuthState } from "./redux/auth/authSlice";
import PrivateRoute from "./components/routes/PrivateRoute";
import RestrictedRoute from "./components/routes/RestrictedRoute";
import Header from "./components/shared/Header";
import Loader from "./components/Loader/Loader.jsx";
import css from "./App.module.css";

// Ленивое подключение страниц
const HomePage = lazy(() => import("./pages/HomePage.jsx"));
const LoginPage = lazy(() => import("./pages/LoginPage.jsx"));
const SignupPage = lazy(() => import("./pages/SignupPage.jsx"));
const GamesPage = lazy(() => import("./pages/GamesPage.jsx"));
const NotFoundPage = lazy(() =>
  import("./pages/NotFoundPage/NotFoundPage.jsx")
);

export default function App() {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const dispatch = useDispatch();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const userStr = localStorage.getItem("user");
        const token = localStorage.getItem("token");
        const refreshToken = localStorage.getItem("refreshToken");

        if (token && userStr && userStr !== "undefined") {
          const userData = JSON.parse(userStr);
          if (userData && userData.email) {
            dispatch(setUser(userData));
          } else {
            dispatch(clearAuthState());
          }
        } else {
          dispatch(clearAuthState());
        }
      } catch (error) {
        console.error("Ошибка при инициализации аутентификации:", error);
        dispatch(clearAuthState());
      }
    };

    initializeAuth();
  }, [dispatch]);

  return (
    <div className={css.app}>
      <Suspense fallback={<Loader loader={true} />}>
        <Routes>
          <Route
            path="/"
            element={
              <div className={css.layout}>
                <main className={css.main}>
                  <HomePage />
                </main>
              </div>
            }
          />

          <Route
            path="/games"
            element={
              <div className={css.layout}>
                <Header />
                <main className={css.main}>
                  <GamesPage />
                </main>
              </div>
            }
          />

          <Route
            path="/login"
            element={
              <RestrictedRoute redirectTo="/">
                <LoginPage />
              </RestrictedRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <RestrictedRoute redirectTo="/">
                <SignupPage />
              </RestrictedRoute>
            }
          />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </div>
  );
}
