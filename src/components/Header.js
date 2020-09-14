import React, { useHistory, useContext } from "react";
import { BrowserRouter as Router, NavLink, Redirect } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Header = () => {
  const history = useHistory;
  const auth = useContext(AuthContext);
  const activePage = "active btn btn-primary";
  const logoutHandler = () => {
    auth.logout()
    return <Redirect to="/"/>
  };
  return (
    <header>
      <div className="main-links">
        <NavLink exact to="/" activeClassName={activePage}>
          Список заданий
        </NavLink>
        <NavLink to="/create-task" activeClassName={activePage}>
          Создать задание
        </NavLink>
        <NavLink to="/event-calendar" activeClassName={activePage}>
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
