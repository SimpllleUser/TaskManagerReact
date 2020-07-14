import React from "react";
import {connect} from 'react-redux'
import Post from "./Task";
import {NavLink} from "react-router-dom";


const Tasks = ({syncPosts}) => {
    if (!syncPosts.length) {
        return <div className="jumbotron"><h1 className="display-4">Заданий нет </h1>
            <hr className="my-4"/>
            <p>Для создания можете перейти ниже по ссылке.</p>
            <NavLink to='/create-post' className="btn btn-primary btn-lg">Создать задание</NavLink>
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

    export default connect(mapStateToProps, null)(Tasks)
