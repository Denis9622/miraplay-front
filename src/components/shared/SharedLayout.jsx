import { Outlet } from "react-router-dom";
import Header from "./Header.jsx";
import Sidebar from "./Sidebar.jsx";
import css from "./sharedLayout.module.css";

const SharedLayout = () => {
  return (
    <div className={css.layout}>
      <header className={css.header}>
        <Header />
      </header>
      <div className={css.content}>
        <aside className={css.sidebar}>
          <Sidebar />
        </aside>
        <main className={css.main}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default SharedLayout;