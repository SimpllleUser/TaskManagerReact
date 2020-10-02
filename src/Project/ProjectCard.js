import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteProject } from "../store/project/actions";
// import ModalEditProject from "./ModalEditProject";
import Modal from "../Modals/Modal";
import ProjectForm from "./ProjectForm";

const ProjectCard = ({ title, description, id }) => {
  const dispatch = useDispatch();

  const deleteHundelerProject = (id) => {
    if (!id) {
      return;
    }
    dispatch(deleteProject(id));
  };
  return (
    <div className="project_card card p-2">
      <h3>
        {" "}
        <NavLink to={`/detail-project/${id}`}>
          {" "}
          {title || "None title"}{" "}
        </NavLink>
      </h3>
      <div className="card-body">
        <p className="card-text">{description}</p>
        <div className="actions">
          <button
            className="btn btn-danger"
            onClick={() => {
              deleteHundelerProject({
                id,
                user_id: JSON.parse(localStorage.getItem("user")).userId,
              });
            }}
          >
            X
          </button>
          {/* <ModalEditProject project={{id,title, description}} /> */}
          <Modal
            title="Edit project"
            forElement={"edit-project" + id}
            component={
              <ProjectForm title={title} description={description} id={id} />
            }
          />
          <button
            className="btn btn-warning"
            data-toggle="modal"
            data-target={"#edit-project" + id}
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};
export default ProjectCard;
