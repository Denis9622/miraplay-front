import { Routes, Route } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { refreshToken, logoutUser } from "./redux/auth/authOperations.js";
import { selectToken } from "./redux/auth/selectors.js";
import { PrivateRoute } from "./components/routes/PrivateRoute.jsx";
import { RestrictedRoute } from "./components/routes/RestrictedRoute.jsx";
import Loader from "./components/Loader/Loader.jsx";
import { SharedLayout } from "./components/shared/SharedLayout.jsx";

import css from "./App.module.css";

// Ленивое подключение страниц
const DashboardPage = lazy(() => import("./pages/DashboardPage.jsx"));
const OrdersPage = lazy(() => import("./pages/OrdersPage.jsx"));
const ProductsPage = lazy(() => import("./pages/ProductsPage.jsx"));
// const CustomersPage = lazy(() => import("./pages/CustomersPage.jsx"));
// const SuppliersPage = lazy(() => import("./pages/SuppliersPage.jsx"));
const LoginPage = lazy(() => import("./pages/LoginPage.jsx"));
const SignupPage = lazy(() => import("./pages/SignupPage.jsx"));
// const NotFoundPage = lazy(() => import("./pages/NotFoundPage.jsx"));

export default function App() {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);

  useEffect(() => {
    if (token) {
      try {
        const tokenParts = token.split(".");
        if (tokenParts.length !== 3) {
          throw new Error("Invalid token structure");
        }

        const decodedPayload = JSON.parse(atob(tokenParts[1]));
        const tokenExpiration = decodedPayload.exp * 1000;

        if (Date.now() >= tokenExpiration) {
          dispatch(refreshToken());
        }
      } catch (error) {
        console.error("Ошибка при обработке токена:", error);
        dispatch(logoutUser());
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    }
  }, [dispatch, token]);

  return (
    <div className={css.app}>
      <Suspense fallback={<Loader loader={true} />}>
        <Routes>
          {/* Общий layout с Header и Sidebar */}
          <Route path="/" element={<SharedLayout />}>
            <Route
              path="/dashboard"
              element={
                <PrivateRoute
                  redirectTo="/login"
                  component={<DashboardPage />}
                />
              }
            />
            <Route
              path="/orders"
              element={
                <PrivateRoute redirectTo="/login" component={<OrdersPage />} />
              }
            />
            <Route
              path="/products"
              element={
                <PrivateRoute
                  redirectTo="/login"
                  component={<ProductsPage />}
                />
              }
            />
            {/* <Route
              path="/customers"
              element={
                <PrivateRoute
                  redirectTo="/login"
                  component={<CustomersPage />}
                />
              }
            /> */}
            {/* <Route
              path="/suppliers"
              element={
                <PrivateRoute
                  redirectTo="/login"
                  component={<SuppliersPage />}
                />
              }
            /> */}
          </Route>

          {/* Авторизация */}
          <Route
            path="/login"
            element={
              <RestrictedRoute
                redirectTo="/dashboard"
                component={<LoginPage />}
              />
            }
          />
          <Route
            path="/signup"
            element={
              <RestrictedRoute
                redirectTo="/dashboard"
                component={<SignupPage />}
              />
            }
          />

          {/* Страница не найдена */}
          {/* <Route path="*" element={<NotFoundPage />} /> */}
        </Routes>
      </Suspense>
    </div>
  );
}
