import React from "react";
import { BrowserRouter as Router, NavLink } from "react-router-dom";
import {AuthContext} from "./context/AuthContext.js"
import { useAuth } from "./hooks/auth.hook";
import {useRoutes} from './routes'

function App() {
  const activePage = "active btn btn-primary";

  const {token, login, logout, userId} = useAuth()
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated)
  return (
    <div className="container pt-3">
      <div className="nav-links">
        <AuthContext.Provider value={{  token, login, logout, userId, isAuthenticated}}>
        <Router>
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
          </div>
          {routes}
        </Router>
        </AuthContext.Provider>
      </div>
    </div>
  );
}

export default App;
