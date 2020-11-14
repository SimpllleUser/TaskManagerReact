import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProjects } from "../../store/project/actions";
import { useHttp } from "../../hooks/http.hook";
import { PlusSquare } from "react-feather";
import Modal from "../Modals/Modal"
import ProjectForm from "./ProjectForm"
import ProjectCard from "./ProjectCard";
const ProjectsList = () => {
  const dispatch = useDispatch();
  const { request } = useHttp();
  const user = JSON.parse(localStorage.getItem('user'))
  const userId = user && user.userId
  useEffect(() => {
    const getProjects = async () => {
      const projects = await  request('/project/users/' + userId)
      console.log('projects',projects)
      dispatch(setProjects(projects));
    };
    getProjects();
  }, [request]);

  const projects = useSelector((state) => state.projects.projects);
  const projectsList = projects ? (
    projects.map((project, index) => (
      <ProjectCard
        key={index}
        id={project.id}
        title={project.title}
        description={project.description}
      />
    ))
  ) : (
    <h3>Список проектов пуст! : (</h3>
  );

  return (
    <div className="project_list_container">
      <h3 className="project_list_title">
        Проекты
        <Modal forElement="project-form" title="Create project" component={<ProjectForm/>} />
        <PlusSquare size="24" className="ml-5" data-toggle="modal" data-target="#project-form" />
      </h3>

      <div className="projetcs_list">{projectsList}</div>
    </div>
  );
  // }
};

export default ProjectsList;
