import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteProject } from "../store/project/actions";
import Modal from "../Modals/Modal";
import ProjectForm from "./ProjectForm";
import Options from "../components/Options";

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
        <NavLink to={`/detail-project/${id}`}>{title || "None title"}</NavLink>
      </h3>
      <div className="card-body">
        <p className="card-text">{description}</p>
        <div className="actions">
          <Options
            items={[
              <div>
                <div
                  className="list-group-item list-group-item-action"
                  data-toggle="modal"
                  data-target={"#edit-project" + id}
                >
                  Edit
                </div>
                <div
                  className="list-group-item list-group-item-action"
                  onClick={() => {
                    deleteHundelerProject({
                      id,
                      user_id: JSON.parse(localStorage.getItem("user")).userId,
                    });
                  }}
                >
                  Delete
                </div>
              </div>,
            ]}
          />
          <Modal
            title="Edit project"
            forElement={"edit-project" + id}
            component={
              <ProjectForm title={title} description={description} id={id} />
            }
          />
        </div>
      </div>
    </div>
  );
};
export default ProjectCard;
