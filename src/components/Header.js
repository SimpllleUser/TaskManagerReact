import React, { useEffect, useState, useContext } from "react";
import {
  BrowserRouter as Router,
  NavLink,
  Redirect,
  useLocation,
} from "react-router-dom";
import { Button, Pane } from "evergreen-ui";
import { AuthContext } from "../context/AuthContext";
import Toast from "./Toast";
import SelectProject from "./SelectProject";

const Header = () => {
  const auth = useContext(AuthContext);
  const route = useLocation();
  useEffect(() => {
    toggleActiveLink(route.pathname);
  }, []);
  const activePage =
    "active border border-light rounded bg-white text-primary font-weight-bold";
  const border = "border-bottom border-white";
  const [links, setLinks] = useState([
    {
      name: "Список заданий",
      path: "/",
      active: false,
    },
    {
      name: "Список глобальных заданий",
      path: "/global_task-list",
      active: false,
    },
    {
      name: "Список глобальных заданий",
      path: "/projects-list",
      active: false,
    },
  ]);

  const statusLink = (active) => (active ? "primary" : "none");
  const list_link = links.map((link, index) => (
    <NavLink to={link.path} key={index}>
      <Button
        height={32}
        marginRight={16}
        intent={statusLink(!link.active)}
        appearance={statusLink(link.active)}
        onClick={() => {
          toggleActiveLink(link.path);
        }}
      >
        {link.name}
      </Button>
    </NavLink>
  ));
  const toggleActiveLink = (path) => {
    const updatedActiveLink = links.map((link) => ({
      ...link,
      active: link.path === path ? true : false,
    }));
    setLinks(updatedActiveLink);
  };

  const logoutHandler = () => {
    auth.logout();
    return <Redirect to="/" />;
  };
  return (
    <Pane border background="blueTint" elevation={0}>
      <Toast />
      <nav id="header_nav" className="navbar navbar-expand-lg">
        <div className="navbar-brand">
          <SelectProject />
        </div>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarContent">
          {list_link}

          <div className="btn-exit">
            
            <Button
              appearance="primary"
              intent="danger"
              height={32}
              onClick={() => {
                logoutHandler();
              }}
            >
              Выход
            </Button>
          </div>
        </div>
      </nav>
    </Pane>
  );
};
export default Header;
