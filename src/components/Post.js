import React from "react";
import {useDispatch} from "react-redux";
import {deletePost} from "../redux/actions";

export default ({post}) => {
    const classMod = val => val + " test";
    const dispatch = useDispatch();

    return (
        <div className="card m-2">
            <div className="card-body">
                <h5 className={"card-title" + classMod(post.id)}>
                    <span>ID:{post.id}</span>
                    <hr/>
                    {post.title}
                </h5>
                <hr/>
                <p className="card-text description-text">{post.description}</p>
                <div className='options'><span className={'m-2 p-2 badge badge-pill ' + post.status.class}>{post.status.name}</span>
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
            </div>
        </div>
    );
};
