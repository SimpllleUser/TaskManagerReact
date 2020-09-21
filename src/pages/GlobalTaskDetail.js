import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { PlusSquare } from "react-feather";
import ModalCreateTask from "../components/ModalCreateTask"
import _TaskList from "../components/_TaskList"
import { useDispatch, useSelector } from "react-redux";
import { useHttp } from "../hooks/http.hook";
import {initTasks} from "../store/tasks/actions"
const GlobalTaskDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [global_task, setGlobal_task] = useState({});
  const { request, loading } = useHttp();
  useEffect(() => {
    const getGlobalTask = async () => {
      const res = await request("http://localhost:8080/api/global_task/" + id);
      setGlobal_task(res);
    };
    getGlobalTask();
  }, [id, request]);
  const tasks = useSelector((state) => state.tasks.tasks);
  return (
    <div className="global_task--detail">
      <h1>Detail global_task</h1>
      <div className="base_info_project">
        <h3>{global_task.title}</h3>
        <p>{global_task.description}</p>
      </div>
      <ModalCreateTask forElement="create-task" id={id} />
      <h3>Tasks list      <PlusSquare
            size="36"
            data-toggle="modal" data-target=".create-task"
          /></h3>
          <_TaskList global_taskId={id} tasks={tasks}/>
    </div>
  );
};

export default GlobalTaskDetail;
