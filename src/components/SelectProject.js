import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHttp } from "../hooks/http.hook";
import { getAllDataFromProject } from "../store/project/actions";
import { setAllGlobalTasks } from "../store/global_task/actions";
import { setAllTasks } from "../store/tasks/actions";
import Modal from "./Modals/Modal";
import ProjectForm from "../components/Project/ProjectForm";

// ! CHECK AUTH LOCAL_STORAGE

const SelectProject = () => {
  const storage = localStorage;
  const { request } = useHttp();
  const dispatch = useDispatch();
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState();
  const getStore = (key) => JSON.parse(storage.getItem(key));
  // ! FIX SET ALL STATE AND SET PROJECT TO LOCAL STORAGE
  const setStore = (key, value = {}) => {
    storage.setItem(key, JSON.stringify(value));
  };
  const user_id = getStore("user") && getStore("user").userId;
  useEffect(() => {
    const getProjects = async () => {
      const projects = await request("/project/users/" + user_id);
      setProjects(projects);
      const storageProject = getStore("project") || "";
      if (!storageProject.title) {
        setStore("project", projects[0]);
      }
      initializationData(getStore("project"));

    };
    getProjects();
  }, [request]);
  
  const initializationData = async (
    project 
  ) => {

    if (project) {
      console.log('initializationData project', project)
      setSelectedProject(project.title || ''); // setState selectProject
      dispatch(getAllDataFromProject(project.id)); // get all data by project
      const global_tasks = await request("/global-task/all/" + project.id); // get global tasks
      dispatch(setAllGlobalTasks(global_tasks)); // set state global tasks
      const g_tasksID = global_tasks.map((g_task) => g_task.id);
      const tasks = await request(
        "/tasks/all-tasks/from/globlal-tasks",
        "get",
        { params: { g_tasksID } }
      );
      dispatch(setAllTasks(tasks));
    }
  };

  const projectsList =
    projects.length &&
    projects.map(
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
  if (!selectedProject) {
    return (
      <div>
        <Modal
          forElement="project-form"
          title="Create project"
          component={<ProjectForm />}
        />
        <button
          className="btn btn-success"
          data-toggle="modal"
          data-target="#project-form"
        >
          Создать проект
        </button>
      </div>
    );
  }

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
