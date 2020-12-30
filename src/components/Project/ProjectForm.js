import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { TextInput, Textarea, Button } from "evergreen-ui";
import { createProject } from "../../store/project/actions";
import { editProject } from "../../store/project/actions";
// TextInput
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

  const submitHandler = () => {
    const { id, title, description } = projectForm;

    if (title.trim() && description.trim()) {
      const Project = {
        id,
        title,
        description,
        user_id,
      };
      if (id) {
        dispatch(editProject(Project));
      } else {
        dispatch(createProject(Project));
        setProjectForm({ id: "", title: "", description: "" });
      }
    }
  };

  return (
    <div className="project_create">
      <form>
        <div className="project_create_title form-group">
          <label htmlFor="title" className="badge badge-light">
            Title
          </label>
          <TextInput
            className="form-control"
            type="text"
            name="title"
            id="title"
            value={projectForm.title}
            onChange={changeInputHandler}
          ></TextInput>
        </div>

        <div className="project_create_description form-group">
          <label htmlFor="description" className="badge badge-light">
            Description
          </label>
          <Textarea
            className="form-control"
            name="description"
            id="description"
            value={projectForm.description}
            onChange={changeInputHandler}
          ></Textarea>
        </div>
        <Button
          onClick={() => {
            submitHandler();
          }}
          appearance="primary"
          intent="success"
        >
          {props.id ? "Save" : "Create"}
        </Button>
      </form>
    </div>
  );
};

export default ProjectForm;
