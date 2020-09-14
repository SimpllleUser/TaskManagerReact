import React, { useHistory, useContext } from "react";
import { BrowserRouter as Router, NavLink, Redirect } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Header = () => {
  const history = useHistory;
  const auth = useContext(AuthContext);
  const activePage = "active btn btn-light";
  const logoutHandler = () => {
    auth.logout()
    return <Redirect to="/"/>
  };
  return (
    <header className="navbar navbar-dark bg-light">
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
