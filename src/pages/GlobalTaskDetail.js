import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { useHttp } from "../hooks/http.hook";

const GlobalTaskDetail = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const [global_task, setGlobal_task] = useState({});
    const { request, loading } = useHttp();
    useEffect(() => {
        const getGlobalTask = async () => {
          const res = await request("http://localhost:8080/api/global_task/" + id);
        //   dispatch(setGlobalTasks(res.global_tasks || []))
          setGlobal_task(res);
        };
        getGlobalTask();
      }, [id, request]);
    return (
        <div className="global_task--detail">
                <div className="base_info_project">
        <h3>{global_task.title}</h3>
        <p>{global_task.description}</p>
      </div>
        </div>
    )
}

 export default GlobalTaskDetail