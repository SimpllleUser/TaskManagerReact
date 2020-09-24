import React, { useContext } from "react";
import { BrowserRouter as Router, NavLink, Redirect } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Header = () => {
  const auth = useContext(AuthContext);
  const activePage = "active btn btn-light";
  const logoutHandler = () => {
    auth.logout()
    return <Redirect to="/"/>
  };
  return (
    <header className="navbar navbar-dark bg-light">
            <h3 className="title m-auto" >Task manager
            <hr/>
            </h3>

      <div className="main-links">
        <NavLink exact to="/" activeClassName={activePage} className="btn btn-outline-primary">
          Список заданий
        </NavLink>
        <NavLink to="/create-task" activeClassName={activePage} className="btn btn-outline-primary">
          Создать задание
        </NavLink>
        <NavLink to="/event-calendar" activeClassName={activePage} className="btn btn-outline-primary">
          Календарь событий
        </NavLink>
        <NavLink to="/create-project" activeClassName={activePage} className="btn btn-outline-primary">
          Создать проект
        </NavLink>
        <NavLink to="/projects-list" activeClassName={activePage} className="btn btn-outline-primary">
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
