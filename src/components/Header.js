import React, { useContext } from "react";
import { BrowserRouter as Router, NavLink, Redirect } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useSelector } from "react-redux";
import Loader from "./Loader";
import Toast from "./Toast";
import SelectProject from "./SelectProject";

const Header = () => {
  const auth = useContext(AuthContext);
  const activePage = "active border border-light rounded";
  const logoutHandler = () => {
    auth.logout();
    return <Redirect to="/" />;
  };
  const loader = useSelector((state) => state.loader.loader);
  return (
    <header className="header navbar navbar-dark bg-primary">
      {loader && <Loader />}
      <Toast />
      <nav id="header_nav" class="navbar">
        <SelectProject />
        <NavLink
          exact
          to="/"
          activeClassName={activePage}
          className="nav-item nav-link text-white"
        >
          Список заданий
        </NavLink>
        <NavLink
          to="/global_task-list"
          activeClassName={activePage}
          className="nav-item nav-link text-white"
        >
          Список глобальных заданий
        </NavLink>
        <NavLink
          to="/event-calendar"
          activeClassName={activePage}
          className="nav-item nav-link text-white"
        >
          Календарь событий
        </NavLink>
        <NavLink
          to="/projects-list"
          activeClassName={activePage}
          className="nav-item nav-item nav-link text-white"
        >
          Проекты
        </NavLink>
        <button
          type="button"
          className="log-out btn btn-danger"
          onClick={() => {
            logoutHandler();
          }}
        >
          Выход
        </button>
      </nav>
    </header>
  );
};
export default Header;
