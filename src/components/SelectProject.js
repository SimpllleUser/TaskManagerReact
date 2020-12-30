import React, {useEffect} from "react";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import { Button } from "evergreen-ui";

import {useHttp} from "../hooks/http.hook";
import {setProjects} from "../store/project/actions";
import {getAllDataFromProject} from "../store/project/actions";
import {setAllGlobalTasks} from "../store/global_task/actions";
import {setAllTasks} from "../store/tasks/actions";
import Modal from "./Modals/Modal";
import ProjectForm from "../components/Project/ProjectForm";

const SelectProject = () => {
    const storage = localStorage;
    const {request} = useHttp();
    const dispatch = useDispatch();
    const userStore = useSelector((state) => state.users.user)
    const [selectedProject, setSelectedProject] = useState();
    const getStore = (key) => JSON.parse(storage.getItem(key));
    const setStore = (key, value = {}) => {
        storage.setItem(key, JSON.stringify(value));
    };
    const localUserId = getStore("user") && getStore("user").userId;

    useEffect(() => {
        const getProjects = async () => {
            const user_id = userStore.id || localUserId
            const projects = await request("/project/users/" +user_id);
            if (projects.length > 0) {
                dispatch(setProjects(projects))
                const storageProject = getStore("project") || {};
                if (!storageProject.title) {
                    const {id, title, description} = projects[0]
                    setStore("project", {id, title, description});
                }
                    await initializationData(getStore("project"));
            }
        };
        getProjects();
    }, []);

    const projects = useSelector((state) => state.projects.projects);


    const initializationData = async (
        project
    ) => {
        if (project) {
            setStore('project', project)
            setSelectedProject(project.title); // setState selectProject
            dispatch(getAllDataFromProject(project.id)); // get all data by project
            const global_tasks = await request("/global-task/all/" + project.id); // get global tasks

            dispatch(setAllGlobalTasks(global_tasks)); // set state global tasks
            const g_tasksID = global_tasks.map((g_task) => g_task.id);
            const tasks = await request(
                "/tasks/all-tasks/from/globlal-tasks",
                "get",
                {params: {g_tasksID}}
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
    if (!projects.length) {
        return (
            <div>
                <Modal
                    forElement="project-form"
                    title="Create project"
                    component={<ProjectForm/>}
                />
                <Button
                   appearance="primary"
                    intent="success"
                    data-target="#project-form"
                >
                    Создать проект
                </Button>
            </div>
        );
    }

    return (
        <div className="selector_project nav-item dropdown">
            {projects.length <= 1 ? (
                <a className="navbar-brand h4 text-white border rounded">{projects[0]?.title}</a>
            ) : (

                <div className="nav-item dropdown">
                    <a className="h4 text-white nav-link dropdown-toggle border rounded" href="#" id="dropdownProject" role="button"
                       data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {selectedProject}
                    </a>
                    <div className="dropdown-menu" aria-labelledby="dropdownProject">
                        {projectsList}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SelectProject;
