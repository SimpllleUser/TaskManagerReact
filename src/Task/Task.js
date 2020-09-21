import React from "react";
import { useDispatch } from "react-redux";
import {deleteTaskInGlobal_task} from "../store/tasks/actions"
import {  NavLink } from "react-router-dom";
import { Edit2, Trash2 } from "react-feather";

// import EditTask from "../pages/TaskEdit";
import SelectorElement from "../components/SelectorElement";

export default ({ global_taskId,task }) => {
  const dispatch = useDispatch();

  return (
    <div className="task-card card">
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
        <div className="actions">
          <div className="delete_task">
            <Trash2
              className="text-secondary"
              onClick={() => {
                dispatch(deleteTaskInGlobal_task({id:global_taskId,taskId:task.id}));
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
