import React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import Modal from "../Modals/Modal";
import TaskForm from "./TaskForm";
import {deleteTaskInGlobal_task} from "../store/tasks/actions"
// import EditTask from "../pages/TaskEdit";
import SelectorElement from "../components/SelectorElement";

const TaskCard = ({ global_taskId,task }) => {
  const dispatch = useDispatch();

  return (
    <div className="task-card card">
      {/* <Route path="/:id/:param?" component={EditTask} /> */}
      <div className="card-body">
        <div className="card-detail-info">
          <h5 className="card-title ">
            <NavLink to={`/detail-task/${task.id}`}>{task.title}</NavLink>
          </h5>
          <div className="options">
            <SelectorElement name={task.status} type="status" />
            <SelectorElement name={task.type} type="type" />
            <SelectorElement name={task.priority} type="priority" />
          </div>
        </div>
      </div>
      <Modal
        forElement={"edit-task" + task.id}
        title="Edit task"
        component={
          <TaskForm
            id={task.id}
            title={task.title}
            description={task.description}
            status={task.status}
            type={task.type}
            priority={task.priority}
          />
        }
      />

      <button
        className="btn btn-warning"
        data-toggle="modal"
        data-target={"#edit-task" + task.id}
      >
        Edit
      </button>
      <button
        className="btn btn-danger"
        onClick={() => {dispatch(deleteTaskInGlobal_task({id:global_taskId,taskId:task.id}))}}
      >
        Delete
      </button>
    </div>
  );
};

export default TaskCard;
