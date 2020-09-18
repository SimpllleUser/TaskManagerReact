import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {useDispatch, useSelector } from "react-redux";
import { getAllProjects } from "../store/project/actions";

import { useHttp } from "../hooks/http.hook";
const ProjectsList = () => {
  const dispatch = useDispatch();

  const { request, loading } = useHttp();

  useEffect(() => {
      const getProjects = async () => {
        dispatch(getAllProjects())
      }
      getProjects()
  }, [request]); // !FIX useHtpp
const projects = useSelector((state) => state.projects.projects);

//   if(loading){
//       return <h3>Loading</h3>
// }
// else{
  const projectsList =  projects ? projects.map((project, index) => <div className="project_card card p-2" key={index} >
      <h3> <NavLink to={`/detail-project/${project._id}`}> {project.title || 'None title'} </NavLink></h3>
  <div className="card-body">
    <p className="card-text">{project.description}</p>
  </div>
</div>)  : (<h3>Список проектов пуст! : (</h3>)
  
  return (
    <div className="project_list_container">
        {loading ? <h3>Loading</h3> : ''}
      <h3>Projects</h3>
      <div className="projetcs_list">
          {projectsList}
      </div>
    </div>
  );
// }
};

export default ProjectsList;
