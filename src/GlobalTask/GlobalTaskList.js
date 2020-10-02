import React, { useState, useEffect } from "react";
import {useDispatch, useSelector } from "react-redux";
import { useHttp } from "../hooks/http.hook";
import { setGlobalTasks } from "../store/global_task/actions";
import GlobalTaskCard from "../GlobalTask/GlobalTaskCard"

const GlobalTaskList = () => {
    const dispatch = useDispatch();
    const id = JSON.parse(localStorage.getItem('project')).id
    const [project, setProject] = useState({});
    const { request, loading } = useHttp();
    useEffect(() => {
      const getProject = async () => {
        const res = await request("http://localhost:8080/api/project/" + id);
        dispatch(setGlobalTasks(res.global_tasks || []))
        setProject(res);
      };
      getProject();
    }, [id, request]);
    const global_tasks = useSelector((state) => state.global_tasks.global_tasks);
    const global_tasksList = global_tasks?.map((global_task, index) => (
        <li key={index} className="list-group-item">
            <GlobalTaskCard id={id} global_taskId={global_task.id} title={global_task.title} description={global_task.description} />
        </li>
      ));
    return(
        <div id="global_task-list">
            <h1>GlobalTask List</h1>
            <div>
                {global_tasksList}
            </div>
        </div>
    )
}

export default GlobalTaskList