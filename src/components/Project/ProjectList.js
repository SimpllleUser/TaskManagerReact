import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pane, Heading } from "evergreen-ui";
import { setProjects } from "../../store/project/actions";
import { useHttp } from "../../hooks/http.hook";
import EmptContent from "../../components/EmptContent";

import ProjectCard from "./ProjectCard";
const ProjectsList = () => {
  const dispatch = useDispatch();
  const { request } = useHttp();
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user && user.userId;
  const [showDialog, setShowDialog] = useState(false);
  useEffect(() => {
    const getProjects = async () => {
      const projects = await request("/project/users/" + userId);
      dispatch(setProjects(projects));
    };
    getProjects();
  }, []);

  const projects = useSelector((state) => state.projects.projects);
  const projectsList =
    projects?.length ? 
    projects.map((project, index) => (
      <ProjectCard
        key={index}
        id={project.id}
        title={project.title}
        description={project.description}
      />
    )) : <EmptContent object_name="project" />

    return (
      <div id="project_list">
        <Pane display="flex" justifyContent="center">
          <Heading size={900}>Projecs list</Heading>
        </Pane>
        <Pane display="flex" justifyContent="center">
        <div>{projectsList}</div>
        </Pane>
      </div>
    );

};

export default ProjectsList;
