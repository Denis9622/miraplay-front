import { Routes, Route } from "react-router-dom";// , Navigate 
import { lazy, Suspense } from "react";//
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
  return (
    <div className={css.app}>
      <SharedLayout />
      <Suspense fallback={<Loader loader={true} />}>
        <Routes>
          {/* Общий layout с Header и Sidebar */}
          <Route path="/" element={<SharedLayout />}>
            {/* <Route index element={<Navigate to="/dashboard" replace />} /> */}
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
            />
         */}
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
            path="/Signup"
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
