import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHttp } from "../hooks/http.hook";
import { getAllDataFromProject } from "../store/project/actions";

const SelectProject = () => {
  const { request } = useHttp();
  const dispatch = useDispatch();
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState();
  useEffect(() => {
    const getProjects = async () => {
      const res = await request('http://localhost:8080/api/project')
      setProjects(res)
    };
    const initProject = JSON.parse(localStorage.getItem('project')) || projects[0]
    setProjectData(initProject)
    getProjects();
  }, [request]);
  const setProjectData = (project = projects[0]) => {
    const {title, id} = project
    localStorage.setItem('project', JSON.stringify({title,id}))
    setSelectedProject(project.title)
    dispatch(getAllDataFromProject(project.id))
  }

  const projectsList = projects.map(
    (project, index) =>
      selectedProject != project.title && (
        <a
          className={"dropdown-item"}
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
            <div className="dropdown-menu" aria-labelledby="selectProject">
              {projectsList}
            </div>
          }
        </div>
      )}
      {console.log()}
    </div>
  );
};

export default SelectProject;
