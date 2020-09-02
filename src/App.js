import React from "react";
import { BrowserRouter as Router, NavLink } from "react-router-dom";
import {useRoutes} from './routes'

function App() {
  const activePage = "active btn btn-primary";
  const access = !!localStorage.getItem('user')
  const routes = useRoutes(access)

  return (
    <div className="container pt-3">
      <div className="nav-links">
        
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
      </div>
    </div>
  );
}

export default App;
