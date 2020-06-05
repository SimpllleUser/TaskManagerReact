import React from "react"
import PostForm from "./components/PostForm"
import Posts from "./components/Posts"
import FetchedPosts from "./components/FetchedPosts"
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import CreatePost from "./pages/CreatePost"
import ListPosts from "./pages/ListPosts"
import EditPost from "./pages/EditPosts"

function App() {
    return (
        <div className="container pt-3">
            <Router>
                <Link to='/'>Posts list</Link>
                <Link to='/create-post'>Create post</Link>
                <Link to='/edit-post'>Edit post</Link>

                <Route exact path="/" component={ListPosts}/>
                <Route path="/create-post" component={CreatePost}/>
                <Route path="/edit-post" component={EditPost}/>
            </Router>


            <div className="row">
                <div className="col"><PostForm/></div>
            </div>
            <div className="row">
                <div className="col">
                    <h2>Синхронные посты</h2>
                    <div className="post-list">
                        <Posts/>
                    </div>
                </div>
                <div className="col">
                    <h2>Асинхронные посты</h2>
                    <FetchedPosts/>
                </div>
            </div>
        </div>
    );
}

export default App;
