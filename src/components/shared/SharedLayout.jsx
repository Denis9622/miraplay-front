import { Outlet } from "react-router-dom";
import Header from "./Header.jsx";
import Sidebar from "./Sidebar.jsx";
import css from "./sharedLayout.module.css";

export const SharedLayout = () => {
  return (
    <div className={css.layout}>
      <Header />
      <div className={css.content}>
        <Sidebar />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};
