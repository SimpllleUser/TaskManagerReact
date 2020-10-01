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
  const [selectedProject, setSelectedProject] = useState('')
  useEffect(() => {
    const getProjects = async () => {
      dispatch(getAllProjects());
    };
    getProjects();
  }, [request]);
  // const projects = useSelector((state) => state.projects.projects);
  const projectsList = projects.map((project, index) => (
    <a class="dropdown-item" href="#" key={index} onClick={() => {setSelectedProject(project.title)}}>
      {project.title}
    </a>
  ));
  return (
    <div className="selector_project">
      {console.log('projects.lenght',projects.length)}
      {projects.length <= 1 ? <h3>{projects[0]?.title}</h3> :
      <div className="dropdown">
        <button
          className={`btn btn-secondary dropdown-toggle ${!projects.lenght <= 2 && 'none'}`}
          type="button"
          id="selectProject"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          {selectedProject || projects[0]?.title}
        </button>
        {<div class="dropdown-menu" aria-labelledby="selectProject">
        {projectsList}
        </div>}
      </div>}
    </div>
  );
};

export default SelectProject;
