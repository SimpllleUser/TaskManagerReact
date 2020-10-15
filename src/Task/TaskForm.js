import React, { useState } from "react";
import moment from "moment";
import { useDispatch } from "react-redux";
import { createTask } from "../store/tasks/actions";
import { saveEditableTask } from "../store/tasks/actions";
import SelectorForm from "../components/SelectorForm";
const TaskForm = (props) => {
  const dispatch = useDispatch();
  const [taskForm, setTaskForm] = useState({
    id: props.id || "",
    title: props.title || "",
    description: props.description || "",
    estimate: props.estimate || "",
    priority: props.priority || "Low",
    status: props.status || "Open",
    type: props.type || "Feature",
  });
  const submitHandler = (event) => {
    event.preventDefault();
    const { title, description, estimate, status, priority, type } = taskForm; // this.state;

    if (!title && !description) {
      return;
    }

    const Task = {
      id: taskForm.id,
      title,
      description,
      estimate,
      status,
      priority,
      type,
      date: moment().format("DD-MM-YYYY"),
    };
    const user_id = JSON.parse(localStorage.getItem("user")).userId;
    taskForm.id
      ? dispatch(saveEditableTask({ task: Task }))
      : dispatch(createTask({ id: props.global_task_id, task: Task, user_id }));
    setTaskForm({});
  };
  const changeInputHandler = (event) => {
    setTaskForm({ ...taskForm, [event.target.name]: event.target.value });
  };
  const updateDataStatus = (data) => {
    if (taskForm.status != data) {
      setTaskForm({ ...taskForm, status: data });
    }
  };
  const updateDataPriority = (data) => {
    if (taskForm.priority != data) {
      setTaskForm({ ...taskForm, priority: data });
    }
  };

  const updateDataType = (data) => {
    if (taskForm.type != data) {
      setTaskForm({ ...taskForm, type: data });
    }
  };

  return (
    <form onSubmit={submitHandler} className="task-form">
      <div className="inputs-text">
        <div className="form-group">
          <label htmlFor="title"> Название </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={taskForm.title || ""}
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
            value={taskForm.description || ""}
          ></textarea>
          <label htmlFor="estimate"> Часов </label>
          <input
            type="number"
            className="form-control"
            id="estimate"
            name="estimate"
            value={taskForm.estimate || ""}
            onChange={changeInputHandler}
          />
        </div>
        <button className="btn btn-success ml-2">
          
          {taskForm.id ? "Сохранить" : "Создать"}
        </button>
      </div>
      <div className="selectors-options">
        
        {taskForm.status && (
          <SelectorForm
            updateData={updateDataStatus}
            data={"status"}
            value={taskForm.status}
          />
        )}
        <SelectorForm
          updateData={updateDataType}
          data={"type"}
          value={taskForm.type}
        />
        <SelectorForm
          updateData={updateDataPriority}
          data={"priority"}
          value={taskForm.priority}
        />
      </div>
    </form>
  );
};

export default TaskForm;
