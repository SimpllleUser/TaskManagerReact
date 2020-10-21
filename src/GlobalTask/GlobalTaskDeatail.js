import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { PlusSquare } from "react-feather";
// import ModalCreateTask from "../components/ModalCreateTask";
import Modal from "../Modals/Modal";
import TaskList from "../Task/TaskList";
import TaskForm from "../Task/TaskForm";
import { useDispatch, useSelector } from "react-redux";
import { useHttp } from "../hooks/http.hook";
import { initTasks } from "../store/tasks/actions";
const GlobalTaskDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [global_task, setGlobal_task] = useState({});
  const { request } = useHttp();
  useEffect(() => {
    const getData = async () => {
      const global_tasks = await request("http://localhost:8080/api/global-task/" + id);
      setGlobal_task(global_tasks)
      const tasks = await request("http://localhost:8080/api/tasks/all/" + id);

      dispatch(initTasks(tasks));
    };
    getData();
  }, [dispatch, id, request]);
  const tasks = useSelector((state) => state.tasks.tasks);
  return (
    <div className="global_task">
      <div className="jumbotron jumbotron-fluid">
        <div className="container">
          <h1>{global_task.title}</h1>
          <p className="lead pl-1">{global_task.description}</p>
        </div>
      </div>
      <Modal title="Create task" className="global-task__detail__title ml-5" forElement="create-task" component={<TaskForm global_task_id={id}/>} />
      <h3>
        Tasks list
        <PlusSquare size="24" className="ml-5" data-toggle="modal" data-target="#create-task" />
      </h3>
      {console.log(tasks)}
      {tasks && tasks.length  ? <TaskList global_taskId={id} tasks={tasks} /> : "No tasks" }      

    </div>
  );
};

export default GlobalTaskDetail;
