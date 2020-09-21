import React from "react";
import TaskForm from "../pages/TaskCreate";

const ModalCreateTask = ({forElement,id}) => {
  return (
    <div
      className={`modal fade ${forElement} `}
      id="date-"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="myLargeModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-xl modal-content p-5">
      <div className="modal-header">
            <h4 className="modal-title">Create task</h4>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <TaskForm id={id}/>
      </div>
    </div>
  ); 
};

export default ModalCreateTask;
