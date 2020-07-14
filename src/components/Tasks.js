import React from "react";
import {connect} from 'react-redux'
import Task from "./Task";
import {NavLink} from "react-router-dom";


const Tasks = ({syncTasks}) => {
    if (!syncTasks.length) {
        return <div className="jumbotron"><h1 className="display-4">Заданий нет </h1>
            <hr className="my-4"/>
            <p>Для создания можете перейти ниже по ссылке.</p>
            <NavLink to='/create-task' className="btn btn-primary btn-lg">Создать задание</NavLink>
        </div>
    ;
    }

    return syncTasks.map((task) =>
        <Task task={task} key={task.id}/>
    );
    };

    const mapStateToProps = state =>{
        return {
        syncTasks: state.tasks.tasks
    }
    }

    export default connect(mapStateToProps, null)(Tasks)
