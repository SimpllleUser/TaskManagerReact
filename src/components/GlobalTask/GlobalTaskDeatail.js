import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { PlusSquare } from "react-feather";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import Modal from "../Modals/Modal";
import TaskList from "../Task/TaskList";
import TaskForm from "../Task/TaskForm";
import ProgressBar from "../ProgressBar"
import { useHttp } from "../../hooks/http.hook";
import { setTasks } from "../../store/tasks/actions";
const GlobalTaskDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [global_task, setGlobal_task] = useState({});
  const { request } = useHttp();
  useEffect(() => {
    const getData = async () => {
      const global_tasks = await request(
        "http://localhost:8080/api/global-task/" + id
      );
      setGlobal_task(global_tasks);
      const tasks = await request("http://localhost:8080/api/tasks/all/" + id);
      dispatch(setTasks(tasks));
    };
    getData();
  }, [dispatch, id, request]);

  const tasks = useSelector((state) => state.tasks.tasks);
  const done = tasks?.filter(task => task.status == 'Done')
  const progress = 100 * done?.length / tasks?.length
  return (
    <div className="global_task">
      {progress ? <ProgressBar progress={progress}/> : ''}
      <div className="jumbotron jumbotron-fluid">
        <div className="container">
          <h1>{global_task.title}</h1>
          <p className="lead pl-1">{global_task.description}</p>
        </div>
      </div>
      <Modal
        title="Create task"
        className="global-task__detail__title ml-5"
        forElement="create-task"
        component={<TaskForm projectID={global_task.projectID} global_task_id={id} />}
      />
      <h3>
        Tasks list
        <PlusSquare
          size="24"
          className="ml-5"
          data-toggle="modal"
          data-target="#create-task"
        />
      </h3>
      {tasks && tasks.length ? (
        <TaskList projectID={global_task.projectID} global_taskId={id} tasks={tasks} />
      ) : (
        "No tasks"
      )}
    </div>
  );
};

export default GlobalTaskDetail;
