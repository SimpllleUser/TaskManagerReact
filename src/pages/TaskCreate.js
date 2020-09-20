import React, { useState } from "react";
import moment from "moment";
import { connect, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { createTaskInGlobal_task } from "../store/tasks/actions";
import SelectorForm from "../components/SelectorForm";
// class TaskForm extends React.Component {
const TaskForm = () => {
  const dispatch = useDispatch();
  const [task, setTask] = useState({
    title: "",
    description: "",
    estimate: "",
    priority: "Low",
    status: "Open",
    type: "Feature",
  });
  const [redirect, setRedirect] = useState(false);

  const submitHandler = () => {
    const { title, description, estimate, status, priority, type } = task; // this.state;

    if (!title && !description) {
      return;
    }

    const newTask = {
      id: Date.now().toString(),
      title,
      description,
      estimate,
      status,
      priority,
      type,
      date: moment().format("DD-MM-YYYY"),
    };

    dispatch(createTaskInGlobal_task(newTask));
    setRedirect(true);
  };
  const changeInputHandler = (event) => {
    setTask({ ...task, [event.target.name]: event.target.value });
  };
  const updateDataPriority = (data) => {
    if (task.priority != data.value) {
      setTask({ ...task, [data.name]: data.value });
    }
  };

  const updateDataType = (data) => {
    if (task.type != data.value) {
      setTask({ ...task, [data.name]: data.value });
    }
  };

  if (redirect) {
    return (
      <Redirect
        to={{
          pathname: "/",
        }}
      />
    );
  }
  return (
    <div className="task-form row">
      <div className="inputs-text col-6">
        <div className="form-group">
          <label htmlFor="title"> Название </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={task.title}
            onChange={changeInputHandler}
          />
          <label htmlFor="description pt-2"> Описание </label>
          <textarea
            className="form-control"
            onChange={changeInputHandler}
            name="description"
            id="description"
            cols="30"
            rows="10"
          ></textarea>
          <label htmlFor="estimate"> Часов </label>
          <input
            type="number"
            className="form-control"
            id="estimate"
            name="estimate"
            value={task.estimate}
            onChange={changeInputHandler}
          />
        </div>
        <button
          className="btn btn-success ml-2"
          onClick={() => {
            submitHandler();
          }}
        >
          Создать
      </button>
      </div>
      <div className="selectors-options col-6">
        {/* <SelectorForm updateData={this.updateDataStatus} data={"status"} /> */}
        <SelectorForm updateData={updateDataType} data={"type"} />
        <SelectorForm updateData={updateDataPriority} data={"priority"} />
      </div>

    </div>
  );
};

export default TaskForm;
