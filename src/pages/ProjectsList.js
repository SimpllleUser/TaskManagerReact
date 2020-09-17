import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import { useHttp } from "../hooks/http.hook";
const ProjectsList = () => {
  const { request, loading } = useHttp();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
      const getProjects = async () => {
        const res = await request('http://localhost:8080/api/project')
        setProjects(res)
        console.log(loading)
      }
      getProjects()
  }, [request]); // !FIX useHtpp


//   if(loading){
//       return <h3>Loading</h3>
// }
// else{
  const projectsList = projects.map((project, index) => <div className="project_card card p-2" key={index} >
      <h3> <NavLink to={`/detail-project/${project._id}`}> {project.title || 'None title'} </NavLink></h3>
  <div className="card-body">
    <p className="card-text">{project.description}</p>
  </div>
</div>)
  
  return (
    <div className="project_list_container">
        {loading ? <h3>Loading</h3> : ''}
      <h3>Projects</h3>
      <div className="projetcs_list">
          { projectsList}
      </div>
    </div>
  );
// }
};

export default ProjectsList;
