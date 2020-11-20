import React, {useContext} from "react";
import {BrowserRouter as Router, NavLink, Redirect} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";
import {useSelector} from "react-redux";
import Loader from "./Loader";
import Toast from "./Toast";
import SelectProject from "./SelectProject";

const Header = () => {
    const auth = useContext(AuthContext);
    const activePage = "active border border-light rounded bg-white text-primary font-weight-bold";
    const border = "border-bottom border-white"
    const logoutHandler = () => {
        auth.logout();
        return <Redirect to="/"/>;
    };
    return (
        <header className="header navbar navbar-dark bg-primary">
            <Toast/>
            <nav id="header_nav" className="navbar navbar-expand-lg">
                <div className="navbar-brand">
                    <SelectProject/>
                </div>

                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarContent"
                        aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarContent">

                    <NavLink
                        exact
                        to="/"
                        activeClassName={activePage}
                        className={"nav-item nav-item nav-link text-white text-white " + border}
                    >
                        Список заданий
                    </NavLink>
                    <NavLink
                        to="/global_task-list"
                        activeClassName={activePage}
                        className={"nav-item nav-item nav-link text-white text-white " + border}
                    >
                        Список глобальных заданий
                    </NavLink>
                    {/* <NavLink
          to="/event-calendar"
          activeClassName={activePage}
          className="nav-item nav-link text-white"
        >
          Календарь событий
        </NavLink> */}
                    <NavLink
                        to="/projects-list"
                        activeClassName={activePage}
                        className={"nav-item nav-item nav-link text-white text-white " + border}
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
                </div>
            </nav>
        </header>
    );
};
export default Header;
