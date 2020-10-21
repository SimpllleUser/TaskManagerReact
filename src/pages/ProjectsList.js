import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProjects } from "../store/project/actions";
import { useHttp } from "../hooks/http.hook";

import ProjectCard from "../components/ProjectCard";

const ProjectsList = () => {
  const dispatch = useDispatch();

  const { request, loading } = useHttp();

  useEffect(() => {
    const getProjects = async () => {
      dispatch(getAllProjects());
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
      {loading ? <h3>Loading</h3> : ""}
      <h3>Проекты</h3>
      <div className="projetcs_list">{projectsList}</div>
    </div>
  );
  // }
};

export default ProjectsList;
