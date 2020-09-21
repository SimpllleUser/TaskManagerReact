import React, { useState } from "react";
import moment from "moment";
import { useDispatch } from "react-redux";
import { createTaskInGlobal_task } from "../store/tasks/actions";
import SelectorForm from "../components/SelectorForm";
const TaskForm = ({id}) => {
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
    
    dispatch(createTaskInGlobal_task({id,newTask}));
    setRedirect(true);
  };
  const changeInputHandler = (event) => {
    setTask({ ...task, [event.target.name]: event.target.value });
  };
  const updateDataPriority = (data) => {
    if (task.priority != data) {
      setTask({ ...task, priority: data });
    }
  };

  const updateDataType = (data) => {
      setTask({ ...task, type: data });
    console.log("TASK",task)
  };

  return (
    <div className="task-form">
      <div className="inputs-text">
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
          data-dismiss="modal" aria-label="Close"
          onClick={() => {
            submitHandler();
          }}
        >
          Создать
      </button>
      </div>
      <div className="selectors-options">
        {/* <SelectorForm updateData={this.updateDataStatus} data={"status"} /> */}
        <SelectorForm updateData={updateDataType} data={"type"} />
        <SelectorForm updateData={updateDataPriority} data={"priority"} />
      </div>

    </div>
  );
};

export default TaskForm;
