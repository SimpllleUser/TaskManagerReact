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
