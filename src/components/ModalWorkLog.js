import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setWorkLogToTask } from "../store/tasks/actions";

// import { useHttp } from "../hooks/http.hook";

const ModalWorkLog = (props) => {
  const dispatch = useDispatch();
  // const { request } = useHttp();
  const [workLog, setworkLog] = useState(parseFloat(0));

  const changeInputHandler = (event) => {
    event.persist();
    setworkLog(event.target.value);
  };

  const seNewtWorkLog = async () => {
    if (!workLog || workLog < 1) {
      return;
    }
    let newWorkLog = parseFloat(workLog) + parseFloat(props.workLog);
    dispatch(setWorkLogToTask({ workLog: newWorkLog, task_id: props.id }));
    props.updateWorkLog(newWorkLog);
  };
  return (
    <div
      className="modal fade modal-worklLog"
      id={"worklog" + props.id}
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div
        className="modal-dialog modal-sm modal-dialog-centered"
        role="document"
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Время работы</h5>
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
              <div className="form-group">
                <label htmlFor="time">Time</label>
                <input
                  type="number"
                  className="form-control"
                  id="workLog"
                  name="workLog"
                  value={workLog}
                  onChange={changeInputHandler}
                />
                {/* <textarea name="worklog_commnet" id="" cols="30" rows="10"></textarea> */}
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
