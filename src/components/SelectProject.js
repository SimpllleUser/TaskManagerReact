import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHttp } from "../hooks/http.hook";
import { getAllDataFromProject } from "../store/project/actions";
import { setGlobalTasks } from "../store/global_task/actions";
import { initTasks } from "../store/tasks/actions";

const SelectProject = () => {
  const { request } = useHttp();
  const dispatch = useDispatch();
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState();
  useEffect(() => {
    const initProject =
      JSON.parse(localStorage.getItem("project")) || projects[0];
    const getData = async () => {
      const projects = await request("http://localhost:8080/api/project");
      setProjects(projects);
    };
    setProjectData(initProject);
    getData();
  }, [request]);
  const setProjectData = async (project = projects[0]) => {
    if (project) {
      const { title, id } = project;
      localStorage.setItem("project", JSON.stringify({ title, id }));
      setSelectedProject(project.title);
      dispatch(getAllDataFromProject(project.id));
      const global_tasks = await request(
        "http://localhost:8080/api/global-task/all/" + project.id
      );
      dispatch(setGlobalTasks(global_tasks));
      const g_tasksID = global_tasks.map((g_task) => g_task.id);
      const tasks = await request(
        "http://localhost:8080/api/tasks/all-tasks/from/globlal-tasks",
        "get",
        { params: { g_tasksID } }
      );
      dispatch(initTasks(tasks));
    }
  };

  const projectsList = projects.map(
    (project, index) =>
      selectedProject != project.title && (
        <a
          className="dropdown-item "
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
