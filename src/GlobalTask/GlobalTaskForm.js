import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createGlobalTask } from "../store/global_task/actions";
import { editGlobalTask } from "../store/global_task/actions";

const GlobalTaskForm = (props) => {
  const dispatch = useDispatch();

  const [global_taskForm, setGlobal_taskForm] = useState({
    id: props.id || "",
    title: props.title || "",
    description: props.description || "",
    // status
  });
  const changeInputHandler = (event) => {
    setGlobal_taskForm({ ...global_taskForm, [event.target.name]: event.target.value });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const { id, title, description } = global_taskForm;

    if (title.trim() && description.trim()) {
      const GlobalTask = {
        id,
        title,
        description,
      };
      props.project_id
        ? dispatch(createGlobalTask({id:props.project_id,global_task:GlobalTask}))
        : dispatch(editGlobalTask(GlobalTask));

        setGlobal_taskForm({});
    }
  };

  return (
    <div className="global_task-create">
      <form onSubmit={submitHandler}>
        <div className="project_create_title form-group">
          <label htmlFor="title">Title</label>
          <input
            className="form-control"
            type="text"
            name="title"
            id="title"
            value={global_taskForm.title || ''}
            onChange={changeInputHandler}
          ></input>
        </div>

        <div className="project_create_description form-group">
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control"
            name="description"
            id="description"
            value={global_taskForm.description || ''}
            onChange={changeInputHandler}
          ></textarea>
        </div>
        <button className="btn btn-success m-2">
          {props.id ? "Edit" : "Create"}
        </button>
      </form>
    </div>
  );
};

export default GlobalTaskForm;
