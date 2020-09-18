import React from "react"
import { NavLink } from "react-router-dom";
import {useDispatch } from "react-redux";
import { deleteProject } from "../store/project/actions";
import ModalEditProject from "./ModalEditProject";



const ProjectCard = ({title, description, id}) => {
    const dispatch = useDispatch();


    const deleteHundelerProject = (id) => {
        if(!id){
            console.log("Err contexnt empty project ID")
            return
        }
        dispatch(deleteProject(id))
    }
    return (
<div className="project_card card p-2"  >
      <h3> <NavLink to={`/detail-project/${id}`}> {title || 'None title'} </NavLink></h3>
  <div className="card-body">
    <p className="card-text">{description}</p>
    <div className="actions">
      <button className="btn btn-danger" onClick={() => {deleteHundelerProject(id)}}>X</button>
      <ModalEditProject project={{id,title, description}} />
      {/* <button className="btn btn-warning" data-toggle="modal" data-target={"#edit-project_"+id}>Edit</button> */}
      <button className="btn btn-warning" data-toggle="modal" data-target={".project" + id}>Edit</button>

      
    </div>
  </div>
</div>
    )
}
export default ProjectCard