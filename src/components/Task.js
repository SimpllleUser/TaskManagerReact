import React from "react";
import { useDispatch } from "react-redux";
import { deleteTask, setEditableTask } from "../redux/actions";
import { Router, Route, NavLink } from "react-router-dom";

import EditTask from "../pages/TaskEdit";
import SelectorElement from "./SelectorElement";

export default ({ task }) => {
  const classMod = (val) => val + " test";
  const dispatch = useDispatch();

  return (
    <div className="task-card card 1">
      <Route path="/:id/:param?" component={EditTask} />
      <div className="card-body">
        <div className="card-detail-info">
          <h5 className={"card-title" + classMod(task.id)}>
            <span>
              ID:
              <NavLink
                to={`/detail-task/${task.id}`}
                className="bg-primary text-white"
              >
                {task.id}
              </NavLink>
            </span>
            <hr />
            Title: {task.title}
          </h5>
          <p className="card-text description-text">
            Description
            <br /> {task.description}
          </p>
        </div>
        <div className="options">
          <span className={"m-1 p-1 badge badge-pill badge-"}>
          {/* + task.priority.class */}
            {/* {task.priority.name} */}
          </span>
          {/* + task.status.class */}
          <SelectorElement data={task.priority} type="priority" />
          <SelectorElement data={task.status} type="status" />

          <span className={"m-1 p-1 badge badge-pill badge-" }>
            {task.status.name}
          </span>
        </div>
        <div className="actions">
          <button
            onClick={() => {
              dispatch(deleteTask(task.id));
            }}
            className="btn btn-danger"
          >
            Delete
          </button>
          <NavLink
            to={`/edit-task/${task.id}`}
            className="bg-warning text-dark"
          >
            Edit task
          </NavLink>
        </div>
      </div>
    </div>
  );
};
