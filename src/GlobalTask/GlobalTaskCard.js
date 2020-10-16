import React from "react";
import Options from "../components/Options";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteGlobalTask } from "../store/global_task/actions";
import Modal from "../Modals/Modal";
import GlobalTaskForm from "./GlobalTaskForm";
const GlobalTaskCard = ({ id, global_taskId, title, description }) => {
  const dispatch = useDispatch();

  return (
    <div className="global_task">
      <h4>
        <NavLink to={`/detail-global_task/` + global_taskId}>{title}</NavLink>
      </h4>
      <div>
        <p>{description}</p>
        {/* <span>Progress</span>00% */}

        <Options
          items={[
            <div>
              <div
                className="list-group-item list-group-item-action"
                data-toggle="modal"
                data-target={"#edit-global_task" + global_taskId}
              >
                Edit
              </div>
              <div
                className="list-group-item list-group-item-action"
                onClick={() => {
                  dispatch(deleteGlobalTask(global_taskId));
                }}
              >
                Delete
              </div>
            </div>,
          ]}
        />
        <Modal
          forElement={"edit-global_task" + global_taskId}
          component={
            <GlobalTaskForm
              id={global_taskId}
              title={title}
              description={description}
            />
          }
        />
      </div>
    </div>
  );
};

export default GlobalTaskCard;
