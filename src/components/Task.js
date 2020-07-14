import React from "react";
import { useDispatch } from "react-redux";
import { deleteTask, setEditableTask } from "../redux/actions";
import { Router, Route, NavLink } from "react-router-dom";

import EditTask from "../pages/TaskEdit";

export default ({ task }) => {
  const classMod = (val) => val + " test";
  const dispatch = useDispatch();

  return (
    <div className="card m-2">
      <Route path="/:id/:param?" component={EditTask} />
      <div className="card-body">
        <h5 className={"card-title" + classMod(task.id)}>
          <span>ID:{task.id}</span>
          <hr />
          Title: {task.title}
        </h5>
        <p className="card-text description-text">
          Description
          <br /> {task.description}
        </p>
        <hr />
        <div className="options">
        <span className={"m-2 p-2 badge badge-pill " + task.priority.class}>
            {task.priority.name}
          </span>
          <span className={"m-2 p-2 badge badge-pill " + task.status.class}>
            {task.status.name}
          </span>
        </div>
        <br />
        <button
          onClick={() => {
            dispatch(deleteTask(task.id));
          }}
          className="btn btn-danger"
        >
          Delete
        </button>
        <NavLink to={`/edit-task/${task.id}`} className="bg-warning text-dark">
          Edit task
        </NavLink>
      </div>
    </div>
  );
};
