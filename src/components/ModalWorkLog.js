import React, { useState } from "react";
import axios from "axios";

const ModalWorkLog = (props) => {
  const [workLog, setworkLog] = useState(0);

  const changeInputHandler = (event) => {
    event.persist();
    setworkLog(event.target.value);
  };

  const seNewtWorkLog = () => {
    if (!workLog || workLog < 1) {
      return;
    }
    const newWorkLog = +props.workLog + +workLog;
    props.changeWorkLog(newWorkLog);
    axios
      .put("http://localhost:8080/api/tasks/work-log/" + props.id, {
        workLog: newWorkLog,
      })
      .then((response) => {
        console.log(response);
      });
    setworkLog(0);
  };

  return (
    <div
      className="modal fade modal-worklLog"
      id={props.id}
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Work log</h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="modal-workLog">
              <div className="task-form">
                <input
                  type="text"
                  className="form-control"
                  id="workLog"
                  name="workLog"
                  value={workLog}
                  onChange={changeInputHandler}
                />
                <button
                  className="btn btn-success send-task"
                  data-dismiss="modal"
                  onClick={() => {
                    seNewtWorkLog();
                  }}
                >
                  Сохранить
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalWorkLog;
