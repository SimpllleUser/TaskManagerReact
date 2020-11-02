import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHttp } from "../hooks/http.hook";
import { getAllDataFromProject } from "../store/project/actions";
import { setAllGlobalTasks } from "../store/global_task/actions";
import { initTasks } from "../store/tasks/actions";

// ! CHECK AUTH LOCAL_STORAGE

const SelectProject = () => {
  const storage = localStorage;
  const { request } = useHttp();
  const dispatch = useDispatch();
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState();
  const getStore = (key) => JSON.parse(storage.getItem(key));
  const setStore = (key, value) => {
    storage.setItem(key, JSON.stringify(value));
  };
  const user_id = getStore("user").userId;
  useEffect(() => {
    const getProjects = async () => {
      const projects = await request("/project/users/" + user_id);
      setProjects(projects);
      const sorageProject = JSON.parse(storage.getItem("project"));
      if (!sorageProject) {
        setStore("project", projects);
        // storage.setItem("project", JSON.stringify(projects));
      }
    };
    getProjects();
    initializationData(JSON.parse(storage.getItem("project")));
  }, [request]);
  const initializationData = async (
    // project = JSON.parse(storage.getItem("project"))[0]
    project = getStore("project")[0]
  ) => {
    const { title, id } = project;
    if (title && id) {
      //storage.setItem("project", JSON.stringify({ title, id })); // setSelectProject to localStorage
      setStore("project", { title, id });
      setSelectedProject(project.title); // setState selectProject
      dispatch(getAllDataFromProject(project.id)); // get all data by project
      const global_tasks = await request("/global-task/all/" + project.id); // get global tasks
      dispatch(setAllGlobalTasks(global_tasks)); // set state global tasks
      const g_tasksID = global_tasks.map((g_task) => g_task.id);
      // const tasks = await request(
      //   "/tasks/all-tasks/from/globlal-tasks",
      //   "get",
      //   { params: { g_tasksID } }
      // );
      // dispatch(initTasks(tasks));
    }
  };

  const projectsList = projects.map(
    (project, index) =>
      selectedProject != project.title && (
        <a
          className="dropdown-item "
          href=""
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
            href=""
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
