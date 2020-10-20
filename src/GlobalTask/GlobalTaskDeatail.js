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
    const getGlobalTask = async () => {
      const global_task = await request(
        "/global-task/" + id
      );
      setGlobal_task(global_task);
      const tasks = await request("/tasks/all/" + id);
      dispatch(initTasks(tasks));
    };
    getGlobalTask();
  }, [dispatch, id, request]);
  const tasks = useSelector((state) => state.tasks.tasks);
  return (
    <div className="global_task--detail">
      <h1>Detail global_task</h1>
      <div className="base_info_project">
        <h3>{global_task.title}</h3>
        <p>{global_task.description}</p>
      </div>
      <Modal
        title="Create task"
        className="global-task__detail__title ml-5"
        forElement="create-task"
        component={<TaskForm global_task_id={id} />}
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
      {tasks || tasks?.length ? (
        <TaskList global_taskId={id} tasks={tasks} />
      ) : (
        "No tasks"
      )}
    </div>
  );
};

export default GlobalTaskDetail;
