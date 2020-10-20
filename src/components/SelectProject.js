import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHttp } from "../hooks/http.hook";
import { getAllDataFromProject } from "../store/project/actions";
import { setGlobalTasks } from "../store/global_task/actions";
import { initTasks } from "../store/tasks/actions";

const SelectProject = () => {
  const storage = localStorage;
  const { request } = useHttp();
  const dispatch = useDispatch();
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState();
  useEffect(() => {
    const getProjects = async () => {
      const projects = await request("/project");
      setProjects(projects);
      const sorageProject = JSON.parse(storage.getItem('project'))
      if(!sorageProject){
        storage.setItem('project',JSON.stringify(projects))
    }
    };
    getProjects();
    initializationData(JSON.parse(storage.getItem('project')));
  }, [request]);
  const initializationData = async (project = JSON.parse(storage.getItem('project'))[0] ) => {
    if (project) {
      const { title, id } = project;
      storage.setItem("project", JSON.stringify({ title, id }));
      setSelectedProject(project.title);
      dispatch(getAllDataFromProject(project.id));
      const global_tasks = await request("/global-task/all/" + project.id);
      dispatch(setGlobalTasks(global_tasks));
      const g_tasksID = global_tasks.map((g_task) => g_task.id);
      const tasks = await request(
        "/tasks/all-tasks/from/globlal-tasks",
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
            initializationData(project);
          }}
        >
          {project.title}
        </a>
      )
  );
  return (
    <div className="selector_project">
      {/* {storage.getItem('project')} */}
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
