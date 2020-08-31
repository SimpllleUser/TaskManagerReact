import React from "react";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
// import TaskCreate from "./pages/TaskCreate";
// import TaskList from "./pages/TaskList";
// import EditTask from "./pages/TaskEdit";
// import EventCalebdar from "./pages/EventCalebdar";
import TaskDetail from "./pages/TaskDetail";
import {useRoutes} from "./pages/pages"

function App() {
  const activePage = "active btn btn-primary";
  const routes = useRoutes(true)

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
