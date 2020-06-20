import React from "react";
import {useDispatch} from "react-redux";
import {deletePost, setEditablePost} from "../redux/actions";
import { Router, Route, NavLink} from "react-router-dom";

import EditPost from "../pages/EditPosts";

export default ({post}) => {
    const classMod = val => val + " test";
    const dispatch = useDispatch();

    return (
        <div className="card m-2">
            <Route path="/:id/:param?" component={EditPost} />
            <div className="card-body">
                <h5 className={"card-title" + classMod(post.id)}>
                    <span>ID:{post.id}</span>
                    <hr/>
                    Title: {post.title}
                </h5>
                <p className="card-text description-text">Description<br/> {post.description}</p>
                <hr/>
                <div className='options'><span
                    className={'m-2 p-2 badge badge-pill ' + post.status.class}>{post.status.name}</span>
                    <span className={'m-2 p-2 badge badge-pill ' + post.priority.class}>{post.priority.name}</span>
                </div>
                <br/>
                <button
                    onClick={() => {
                        dispatch(deletePost(post.id));
                    }}
                    className="btn btn-danger"
                >
                    Delete
                </button>
                <button
                    onClick={() => {
                        dispatch(setEditablePost(post));
                    }}
                    className="btn btn-warning"
                >
                    Edit
                </button>
            </div>
        </div>
    );
};
