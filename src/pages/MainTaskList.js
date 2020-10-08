import React, { useState, useEffect } from "react";
import TaskList from "../Task/TaskList"
// import _TaskList from "../components/_TaskList";
import { useDispatch, useSelector } from "react-redux";
import { useHttp } from "../hooks/http.hook";
import { initTasks } from "../store/tasks/actions";
const MainTaskList = () => {

        const dispatch = useDispatch();
        const { id } = JSON.parse(localStorage.getItem('project'))
        const { request, loading } = useHttp();
        useEffect(() => {
            const getAllTasksProject = async() => {
                // ! ADD TRY CATCH AND SHOW TOAST
                const tasks = await request("http://localhost:8080/api/tasks/all_tasks/" + id);
                dispatch(initTasks(tasks));
            };
            getAllTasksProject();
        }, [id, request]);
        const tasks = useSelector((state) => state.tasks.tasks);
        return <div id = "main-task-list" > {
            tasks.length ? < TaskList tasks = { tasks }
            /> : 'No tasks' }

            <
            /div>
        }

        export default MainTaskList