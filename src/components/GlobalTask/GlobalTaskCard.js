import React, {useEffect,useState} from "react";
import Options from "../Options";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import {deleteGlobalTask, setGlobalTasks} from "../../store/global_task/actions";
import Modal from "../Modals/Modal";
import GlobalTaskForm from "./GlobalTaskForm";
import {useHttp} from "../../hooks/http.hook";
import {getUsers} from "../../store/users/actions";
import ProgressBar from "../ProgressBar";
import RoundedProgressBar from "../RoundedProgressBar"
const GlobalTaskCard = ({ id, global_taskId, title, description }) => {
  const dispatch = useDispatch();

    const { request } = useHttp();
    const [progress, setProgress] = useState(0)
    useEffect(() => {
        const getProgress = async () => {
            const res = await request('/global-task/progress/' + global_taskId)
            setProgress(res.progress)
        }
        getProgress();
    },[global_taskId,request]);

  return (
    <div className="global_task">
        <div className="main-info">
      <h4>
        Title: <NavLink to={`/detail-global_task/` + global_taskId}>{title}</NavLink>
      </h4>
            <p>Desciprion: {description}</p>

        </div>
        <RoundedProgressBar progress={progress} />

        <div>
        {/* <span>Progress</span>00% */}
        {/*  <ProgressBar progress={progress}/>*/}
          <Options
          items={[
            <div>
              <div
                className="list-group-item list-group-item-action bg-warning text-dark"
                data-toggle="modal"
                data-target={"#edit-global_task" + global_taskId}
              >
                Edit
              </div>
              <div
                className="list-group-item list-group-item-action bg-danger text-white"
                onClick={() => {
                  dispatch(deleteGlobalTask(global_taskId));
                }}
              >
                Delete
              </div>

            </div>,
          ]}
        />
        <Modal
          forElement={"edit-global_task" + global_taskId}
          component={
            <GlobalTaskForm
              id={global_taskId}
              title={title}
              description={description}
            />
          }
        />
      </div>
    </div>
  );
};

export default GlobalTaskCard;
