import React from "react";
import { useDispatch } from "react-redux";
import { deleteTask } from "../redux/actions";
import { Route, NavLink } from "react-router-dom";
import { Edit2, Trash2 } from "react-feather";

import EditTask from "../pages/TaskEdit";
import SelectorElement from "./SelectorElement";

export default ({ task }) => {
  const classMod = (val) => val + " test";
  const dispatch = useDispatch();

  return (
    <div  className="task-card card">
      <Route path="/:id/:param?" component={EditTask} />
      <div className="card-body">
        <div className="card-detail-info">
          <h5 className={"card-title " + classMod(task.id)}>
            <NavLink to={`/detail-task/${task.id}`}>{task.title}</NavLink>
          </h5>
          <div className="options">
          <SelectorElement data={task.priority} type="priority" />
          <SelectorElement data={task.status} type="status" />
        </div>
        </div>

        <div className="actions">
          <div className="delete_task">          <Trash2
            className="text-secondary"
            onClick={() => {
              dispatch(deleteTask(task.id));
            }}
          /></div>

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
