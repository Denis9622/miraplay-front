import { Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { SocketProvider } from "./contexts/SocketContext";
import Header from "./components/shared/Header";
import Loader from "./components/Loader/Loader.jsx";
import HeadSwiper from "./components/HeadSwiper/HeadSwiper";
import Authorization from "./components/Authorization/Authorization";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import AdminRoute from "./components/AdminRoute/AdminRoute";
import TopGameNotification from "./components/TopGameNotification/TopGameNotification";
import { lazy, Suspense, useState, useEffect } from "react";
import css from "./App.module.css";

// Ленивое подключение страниц
const GamesPage = lazy(() => import("./pages/GamesPage.jsx"));
const AdminPage = lazy(() => import("./pages/AdminPage.jsx"));
const NotFoundPage = lazy(() =>
  import("./pages/NotFoundPage/NotFoundPage.jsx")
);

export default function App() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");

  const handleAuthClick = (mode) => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  const handleAuthClose = (mode) => {
    setIsAuthOpen(false);
    if (mode) {
      setAuthMode(mode);
    }
  };

  return (
    <Provider store={store}>
      <SocketProvider>
        <div className={css.app}>
          <Header onAuthClick={handleAuthClick} />
          <Suspense fallback={<Loader loader={true} />}>
            <Routes>
              <Route
                path="/"
                element={
                  <div className={css.layout}>
                    <HeadSwiper onAuthClick={handleAuthClick} />
                  </div>
                }
              />
              <Route
                path="/games"
                element={
                  <PrivateRoute>
                    <div className={css.layout}>
                      <main className={css.main}>
                        <GamesPage />
                      </main>
                    </div>
                  </PrivateRoute>
                }
              />
              <Route
                path="/admin"
                element={
                  <AdminRoute>
                    <div className={css.layout}>
                      <main className={css.main}>
                        <AdminPage />
                      </main>
                    </div>
                  </AdminRoute>
                }
              />
              <Route
                path="*"
                element={
                  <div className={css.layout}>
                    <main className={css.main}>
                      <NotFoundPage />
                    </main>
                  </div>
                }
              />
            </Routes>
          </Suspense>

          <Authorization
            isOpen={isAuthOpen}
            onClose={handleAuthClose}
            mode={authMode}
          />
          <TopGameNotification />
        </div>
      </SocketProvider>
    </Provider>
  );
}
