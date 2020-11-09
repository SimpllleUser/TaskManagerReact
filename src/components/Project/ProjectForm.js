import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createProject } from "../../store/project/actions";
import { editProject } from "../../store/project/actions";

const ProjectForm = (props) => {
  const dispatch = useDispatch();
  const user_id = JSON.parse(localStorage.getItem("user"));
  const [projectForm, setProjectForm] = useState({
    id: props.id || "",
    title: props.title || "",
    description: props.description || "",
  });
  const changeInputHandler = (event) => {
    setProjectForm({ ...projectForm, [event.target.name]: event.target.value });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const { id, title, description } = projectForm;

    if (title.trim() && description.trim()) {
      const Project = {
        id,
        title,
        description,
        user_id,
      };
      if (id) {
        dispatch(editProject(Project))
      } else {
        dispatch(createProject(Project));
        setProjectForm({id:"",title:"",description:""});
      }
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
            value={projectForm.title}
            onChange={changeInputHandler}
          ></input>
        </div>

        <div className="project_create_description form-group">
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control"
            name="description"
            id="description"
            value={projectForm.description}
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

export default ProjectForm;
