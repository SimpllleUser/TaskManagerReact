import React from "react";
import {connect} from 'react-redux'
import Post from "./Post";
import {NavLink} from "react-router-dom";


const Posts = ({syncPosts}) => {
    if (!syncPosts.length) {
        return <div className="jumbotron"><h1 className="display-4"> Постоп пока нет </h1>
            <hr className="my-4"/>
            <p>Для создание можете перейти нижу по ссылке.</p>
            <NavLink to='/create-post' className="btn btn-primary btn-lg">Создать пост</NavLink>
        </div>
    ;
    }

    return syncPosts.map((post) =>
        <Post post={post} key={post.id}/>
    );
    };

    const mapStateToProps = state =>{
        return {
        syncPosts: state.posts.posts
    }
    }

    export default connect(mapStateToProps, null)(Posts)
