import React from "react"
import {BrowserRouter as Router, Route, NavLink} from "react-router-dom";
import TaskCreate from "./pages/TaskCreate"
import TaskList from "./pages/TaskList"
import EditPost from "./pages/TaskEdit"
import EventCalebdar from "./pages/EventCalebdar"


function App() {
    const activePage = 'active btn btn-primary'
    return (
        <div className="container pt-3">
            <div className="nav-links">
                <Router>
                    <NavLink exact to='/' activeClassName={activePage}>Список заданий</NavLink>
                    <NavLink to='/create-post' activeClassName={activePage}>Создать задание</NavLink>
                    <NavLink to='/event-calendar' activeClassName={activePage}>Календарь событий</NavLink>
                    <Route exact path="/" component={TaskList}/>
                    <Route exact path="/event-calendar" component={EventCalebdar}/>
                    <Route  path="/edit-post/:id" component={EditPost}/>
                    <Route exact path="/create-post" component={TaskCreate}/>
                </Router>
            </div>
        </div>
    );
}

export default App;
