import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PlusSquare } from "react-feather";
import { useParams } from "react-router-dom";
import { useHttp } from "../hooks/http.hook";
import { setGlobalTasks } from "../store/global_task/actions";
import Modal from "../Modals/Modal";
import GlobalTaskCard from "../GlobalTask/GlobalTaskCard";
import GlobalTaskForm from "../GlobalTask/GlobalTaskForm";
import axios from "axios";

const ProjectDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [project, setProject] = useState({});
  const [global_tasks, setGlobal_tasks] = useState({});
  const { request, loading } = useHttp();
  useEffect(() => {
    const getProject = async () => {
      const project = await request("http://localhost:8080/api/project/" + id);
      setProject(project);
    };
    const getGlobalTask = async () => {
      const global_tasks = await request(
        "http://localhost:8080/api/global-task/all/" + id
      );
      setGlobal_tasks(global_tasks);
    };
    getProject();
    getGlobalTask();
  }, [id, request]);

  // const global_tasks = useSelector((state) => state.global_tasks.global_tasks);

  // const global_tasksList = global_tasks ? global_tasks.map((global_task, index) => (
  //   <li key={index} className="list-group-item">
  //       <GlobalTaskCard id={id} global_taskId={global_task.id} title={global_task.title} description={global_task.description} />
  //   </li>
  // )) : '';

  return (
    <div className="project_detail">
      <div className="base_info_project">
        <h3>{project.title}</h3>
        <p>{project.description}</p>
      </div>
      <div className="block_user-list">
        <ul>
          <li>user -1</li>
        </ul>
      </div>

      <div className="bock_global_task-list">
        <div className="bock_global_task-list_title mb-2">
          Global tasks
          <Modal
            title="Create global task"
            forElement="create-global_task"
            component={<GlobalTaskForm project_id={id} />}
          />
          <PlusSquare
            className="ml-5"
            size="24"
            data-toggle="modal"
            data-target="#create-global_task"
          />
        </div>
        <ul className="bock_global_task-list_body list-group">
          {global_tasks.length && global_tasks.map((global_task, index) => (
            <li key={index} className="list-group-item">
              <GlobalTaskCard
                id={id}
                global_taskId={global_task.id}
                title={global_task.title}
                description={global_task.description}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProjectDetail;
