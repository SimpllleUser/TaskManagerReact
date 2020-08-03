import React from "react";
import { useDispatch } from "react-redux";
import { deleteTask } from "../redux/actions";
import { Route, NavLink } from "react-router-dom";
import { Edit2, Trash2 } from "react-feather";

import EditTask from "../pages/TaskEdit";
import SelectorElement from "../components/SelectorElement";

export default ({ task }) => {
  const dispatch = useDispatch();

  return (
    <div className="task-card card">
      <Route path="/:id/:param?" component={EditTask} />
      <div className="card-body">
        <div className="card-detail-info">
          <h5 className="card-title ">
            <NavLink to={`/detail-task/${task.id}`}>{task.title}</NavLink>
          </h5>
        {console.log(task)}
          <div className="options">
            <SelectorElement name={task.priority} type="priority" />
            <SelectorElement name={task.status} type="status" />
            <SelectorElement name={task.type} type="type" />
          </div>
        </div>
        <div className="actions">
          <div className="delete_task">
            <Trash2
              className="text-secondary"
              onClick={() => {
                dispatch(deleteTask(task.id));
              }}
            />
          </div>

          <div className="edit_task">
            <NavLink className="text-secondary" to={`/edit-task/${task.id}`}>
              <Edit2 />
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};
