import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { createProject } from "../store/project/actions";
import {useDispatch } from "react-redux";

const ProjectForm = () => {
  const dispatch = useDispatch();

  // const [redirect, setRedirect] = useState(false);
  const [projectForm, setProjectForm] = useState({
    title: "",
    description: "",
    // status
  });
  const changeInputHandler = (event) => {
    setProjectForm({ ...projectForm, [event.target.name]: event.target.value });
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const { title, description } = projectForm;

    if (title.trim() && description.trim()) {
      const newProject = {
        title,
        description
      }
      dispatch(createProject(newProject))
      setProjectForm({})
    }
  };

  return (
    <div className="project_create">
      <form onSubmit={submitHandler}>
        <div className="project_create_title form-group">
          <label htmlFor="title">Title</label>
          <input
            className="form-control"
            type="text"
            name="title"
            id="title"
            onChange={changeInputHandler}
          ></input>
        </div>

        <div className="project_create_description form-group">
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control"
            name="description"
            id="description"
            onChange={changeInputHandler}
          ></textarea>
        </div>
        <button className="btn btn-success m-2">Create</button>
      </form>
    </div>
  );
};

export default ProjectForm;
