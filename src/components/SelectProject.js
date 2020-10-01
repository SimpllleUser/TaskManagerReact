import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHttp } from "../hooks/http.hook";
import { getAllProjects } from "../store/project/actions";

const SelectProject = () => {
  const { request } = useHttp();
  const dispatch = useDispatch();
  const [project, setProject] = useState({ title: "" });
  const projects = useSelector((state) => state.projects.projects);
  const [selectedProject, setSelectedProject] = useState(JSON.parse(localStorage.getItem('project')).title);
  useEffect(() => {
    const getProjects = async () => {
      dispatch(getAllProjects());
    };
    getProjects();
  }, [request]);
  const setProjectData = (project) => {
    localStorage.setItem('project',JSON.stringify({title:project.title,id:project.id}))
    setSelectedProject(project.title)
  }

  const projectsList = projects.map(
    (project, index) =>
      selectedProject != project.title && (
        <a
          class={"dropdown-item"}
          href="#"
          key={index}
          onClick={() => {
            setProjectData(project);
          }}
        >
          {project.title}
        </a>
      )
  );
  return (
    <div className="selector_project">
      {projects.length <= 1 ? (
        <h3>{projects[0]?.title}</h3>
      ) : (
        <div className="dropdown">
          <button
            className={`btn btn-secondary dropdown-toggle selectedProject ${
              projects.length <= 1 && "none"
            }`}
            type="button"
            id="selectProject"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            {selectedProject || projects[0]?.title}
          </button>
          {
            <div class="dropdown-menu" aria-labelledby="selectProject">
              {projectsList}
            </div>
          }
        </div>
      )}
    </div>
  );
};

export default SelectProject;
