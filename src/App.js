import React from "react"
import {BrowserRouter as Router, Route, NavLink} from "react-router-dom";
import CreatePost from "./pages/CreatePost"
import ListPosts from "./pages/ListPosts"
import EditPost from "./pages/EditPosts"

function App() {
    const activePage = 'active btn btn-primary'
    return (
        <div className="container pt-3">
            <div className="nav-links">
                <Router>
                    <NavLink exact to='/' activeClassName={activePage}>Список заданий</NavLink>
                    <NavLink to='/create-post' activeClassName={activePage}>Создать задание</NavLink>
                    <Route exact path="/" component={ListPosts}/>
                    <Route  path="/edit-post/:id" component={EditPost}/>
                    <Route exact path="/create-post" component={CreatePost}/>
                </Router>
            </div>
        </div>
    );
}

export default App;
