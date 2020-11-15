import React, {useEffect, useState} from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteProject } from "../../store/project/actions";
import Modal from "../Modals/Modal";
import ProjectForm from "./ProjectForm";
import Options from "../Options";
import {useHttp} from "../../hooks/http.hook";
import RoundedProgressBar from "../RoundedProgressBar";

const ProjectCard = ({ title, description, id }) => {
  const dispatch = useDispatch();

    const { request } = useHttp();
    const [progress, setProgress] = useState(0)
    useEffect(() => {
        const getProgress = async () => {
            const res = await request('/project/progress/' + id)
            setProgress(res.progress)
        }
        getProgress();
    },[id,request]);

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
          <span class="text-dark font-weight-bold">Description</span>
        <p className="card-text">{description}</p>
         <div className="progress-block"><span>Progress </span> <RoundedProgressBar progress={progress} /></div>
        <div className="actions">
          <Options
            items={[
              <div>
                <div
                  className="list-group-item list-group-item-action bg-warning text-dark"
                  data-toggle="modal"
                  data-target={"#edit-project" + id}
                >
                  Edit
                </div>
                <div
                  className="list-group-item list-group-item-action bg-danger text-white"
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
