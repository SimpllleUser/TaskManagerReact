import React, { useState, useEffect } from "react";
import axios from "axios"
import { PlusSquare } from "react-feather";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useHttp } from "../hooks/http.hook";
import ModalCreateGlobalTask from "../components/ModalCreateGlobalTask"

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState({});
  const { request, loading } = useHttp();
  useEffect(() => {
    const getProject = async () => {
      const res = await request("http://localhost:8080/api/project/" + id);
      setProject(res);
    };
    getProject();
  }, [id, request]);

  const deleteGlobalTask = async (global_taskId) => {
    console.log('id,global_taskId',id,global_taskId)
    const res = await axios.delete("http://localhost:8080/api/project/delete/global-task",{data:{id:id,global_taskId:global_taskId}})
    console.log("RES",res)
  }

  const global_tasksList = project?.global_tasks?.map((global_task, index) => (
    <li key={index} className="list-group-item">
      <div>
        <h4>
          <NavLink to={`tasks/list/` + global_task._id}>
            {global_task.title}
          </NavLink>
        </h4>
        <div>
          <p>{global_task.description}</p>
          {/* <span>Progress</span>00% */}
          <button onClick={()=>{deleteGlobalTask(global_task._id)}} className="btn btn-danger global_task-delete" >&times;</button>
        </div>
      </div>
    </li>
  ));

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
        <div className="bock_global_task-list_title">
          Global tasks
         <ModalCreateGlobalTask project_id={project._id}  />
          <PlusSquare
            size="36"
            data-toggle="modal" data-target="#create-create-global_task"
          />
        </div>
        <ul className="bock_global_task-list_body list-group">
          {global_tasksList}
        </ul>
      </div>
    </div>
  );
};

export default ProjectDetail;
