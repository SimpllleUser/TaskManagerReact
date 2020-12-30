import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pane, Text, Badge, Pill, Heading } from "evergreen-ui";
import { setProjects } from "../../store/project/actions";
import { useHttp } from "../../hooks/http.hook";

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
      <Pane display="flex" justifyContent="center">
        <Heading size={900}>Projecs list</Heading>
      </Pane>
      <br />
      <Pane
        elevation={3}
        width={600}
        height={120}
        marginTop={200}
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Text >
          Sorry project empty<Badge color="red">:(</Badge>{" "}
        </Text>
        <Text size={600}>
          Plese, create project click on header button{" "}
          <Pill color="green">:)</Pill>
        </Text>
      </Pane>
      <div className="projetcs_list row">{projectsList}</div>
    </div>
  );
};

export default ProjectsList;
