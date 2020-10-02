import React, { useContext } from "react";
import { BrowserRouter as Router, NavLink, Redirect } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useSelector } from "react-redux";
import Loader from "./Loader";
import Toast from "./Toast";
import SelectProject from "./SelectProject";

const Header = () => {
  const auth = useContext(AuthContext);
  const activePage = "active btn btn-light";
  const logoutHandler = () => {
    auth.logout();
    return <Redirect to="/" />;
  };
  const loader = useSelector((state) => state.loader.loader);
  return (
    <header className="navbar navbar-dark bg-light">
      {loader && <Loader />}
      <Toast />
      <div className="main-links">
        <SelectProject />
        <NavLink
          exact
          to="/tasks-list"
          activeClassName={activePage}
          className="btn btn-outline-primary"
        >
          Список заданий
        </NavLink>
        <NavLink
          to="/global_task-list"
          activeClassName={activePage}
          className="btn btn-outline-primary"
        >
          Список глобальных заданий
        </NavLink>
        <NavLink
          to="/event-calendar"
          activeClassName={activePage}
          className="btn btn-outline-primary"
        >
          Календарь событий
        </NavLink>
        <NavLink
          to="/projects-list"
          activeClassName={activePage}
          className="btn btn-outline-primary"
        >
          Проекты
        </NavLink>
        <button
          type="button"
          className="btn btn-dark btn-logout"
          onClick={() => {
            logoutHandler();
          }}
        >
          Выход
        </button>
      </div>
    </header>
  );
};
export default Header;
