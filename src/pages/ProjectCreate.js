import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

const ProjectCreate = () => {
  const [redirect, setRedirect] = useState(false);
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
      try {
        const res = axios.post("http://localhost:8080/api/project", {
          title,
          description,
        });
        console.log(res);
        setRedirect(true);
      } catch (err) {
        console.log("err", err);
      }
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
    <div className="project_create" id="project-form">
      <h1>Project creaet</h1>

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

export default ProjectCreate;
