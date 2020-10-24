import React, { useState, useEffect } from "react";
import moment from "moment";
import { Redirect, useParams } from "react-router-dom";
import SelectorElement from "../components/SelectorElement";
import SelectorForm from "../components/SelectorForm";
import { updateOptionTask } from "../store/tasks/actions";
import { useDispatch } from "react-redux";
import { useHttp } from "../hooks/http.hook";
import CommnetList from "../components/CommnetList"
import ModalWorkLog from "../components/ModalWorkLog";

const TaskDetail = () => {
  const dispatch = useDispatch();
  let { id } = useParams();
  let [task, setTask] = useState({});

  const { request } = useHttp();
  useEffect(() => {
    const getTask = async () => {
      const res = await request("/tasks/id=" + id);
      setTask(res);
    };
    getTask();
  }, [id, request]);

  const changeWorkLog = (data) => {
    if (task.workLog != data) {
      setTask({ ...task, workLog: data });
    }
  };

  const updateDataStatus = (data) => {
    if (task.status != data) {
      setTask({ ...task, status: data });
      dispatch(updateOptionTask({ task_id: id, option: { status: data } }));
    }
  };

  const updateDataPriority = (data) => {
    if (task.priority != data) {
      setTask({ ...task, priority: data });
      dispatch(updateOptionTask({ task_id: id, option: { priority: data } }));
    }
  };

  const updateDataType = (data) => {
    if (task.type != data) {
      setTask({ ...task, type: data });
      dispatch(updateOptionTask({ task_id: id, option: { type: data } }));
    }
  };

  if (task === undefined) {
    return <Redirect to="/" />;
  }
  return (
    <div className="jumbotron" id="task-detail">
      <div className="task-body">
        <h3 className="title display-4"> {task.title} </h3>
        <hr />
        <p className="description my-4"> {task.description} </p>
      </div>
      <div className="task-elements">
        <div className="options selector">
          <div className="priority">
            <SelectorElement
              name={task.priority}
              type="priority"
              className="selector"
            />
            <SelectorForm
              updateData={updateDataPriority}
              data={"priority"}
              value={task.priority}
              className="selector-form  priority"
            />
          </div>
          <div className="status">
            <SelectorElement
              name={task.status}
              type="status"
              className="selector"
            />
            <SelectorForm
              updateData={updateDataStatus}
              data={"status"}
              value={task.status}
              className="selector-form  status"
            />
          </div>
          <div className="type">
            <SelectorElement
              name={task.type}
              type="type"
              className="selector"
            />
            <SelectorForm
              updateData={updateDataType}
              data={"type"}
              value={task.type}
              className="selector-form  type"
            />
          </div>
          <div className="selectors-options"></div>
        </div>
        <div className="task-work">
          <div>estimate: {task.estimate || 0}ч</div>
          <div>workLog: {task.workLog}ч</div>
          <ModalWorkLog
            changeWorkLog={changeWorkLog}
            id={task.id}
            workLog={task.workLog}
          />
          <button
            type="button"
            className="btn btn-primary"
            data-toggle="modal"
            data-target={"#worklog" + task.id}
          >
            Add work-log
          </button>
        </div>
        <small className="date-created">
          {moment(task.createdAt).format("DD-MMMM-YYYY")}
        </small>
      </div>
    <CommnetList comments={task.comments} />
    </div>
  );
};

export default TaskDetail;
