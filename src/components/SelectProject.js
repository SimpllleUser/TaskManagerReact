import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHttp } from "../hooks/http.hook";
import { getAllDataFromProject } from "../store/project/actions";
import { setGlobalTasks } from "../store/global_task/actions";
import { initTasks } from "../store/tasks/actions";

// ! CHECK AUTH LOCAL_STORAGE

const SelectProject = () => {
  const storage = localStorage;
  const { request } = useHttp();
  // const dispatch = useDispatch();
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState();
  const getStore = (key) => JSON.parse(storage.getItem(key))
  const setStore = (key, value) => {storage.setItem(key, JSON.stringify(value))} 
  const user_id = getStore("user").userId
  useEffect(() => {
    const getProjects = async () => {
      const projects = await request("/project/users/" + user_id);
      initializationData(projects)
      // setProjects(projects);
      // const sorageProject = JSON.parse(storage.getItem("project"));
      // if (!sorageProject) {
      //   setStore("project", projects)
      //   // storage.setItem("project", JSON.stringify(projects));
      // }
    };
    getProjects();
    initializationData(JSON.parse(storage.getItem("project")));
  }, [request]);
  const initializationData = (projects = getStore("project")[0]) => {
    console.log(getStore("project"))

    // const selectProject  = !projects ? getStore("project")[0] || {title:"None project"} : projects[0]
    // console.log("selectProject",selectProject)

    // setSelectedProject(selectProject)
    // setStore("project",selectProject) 
  //         const { title, id } = project;
  //   if (title && id) {
  //     setStore("project", { title, id })
  //     setSelectedProject(project.title)
  // };
}

  const projectsList = projects.map(
    (project, index) =>
      selectedProject != project.title && (
        <a
          className="dropdown-item "
          href="#"
          key={index}
          onClick={() => {
            initializationData(project);
          }}
        >
          {project.title}
        </a>
      )
  );
  return (
    <div className="selector_project">
      {projects.length <= 1 ? (
        <h3 className="navbar-brand">{projects[0]?.title}</h3>
      ) : (
        <div className="dropdown">
          <a
            href="#"
            className={` btn btn-outline-light ${
              projects.length <= 1 && "none"
            }`}
            type="button"
            id="selectProject"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            {selectedProject || projects[0]?.title}
          </a>
          {
            <div className="dropdown-menu" aria-labelledby="selectProject">
              {projectsList}
            </div>
          }
        </div>
      )}
    </div>
  );
};

export default SelectProject;
