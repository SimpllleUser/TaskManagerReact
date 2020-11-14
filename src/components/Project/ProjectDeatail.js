import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PlusSquare } from "react-feather";
import { useParams } from "react-router-dom";
import { useHttp } from "../../hooks/http.hook";
import { getUsers } from "../../store/users/actions";
import Modal from "../Modals/Modal";
import GlobalTaskCard from "../GlobalTask/GlobalTaskCard";
import GlobalTaskForm from "../GlobalTask/GlobalTaskForm";
import UserList from "../User/UserList"
import {setGlobalTasks} from "../../store/global_task/actions"

const ProjectDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [project, setProject] = useState({});
  // const [global_tasks, setGlobal_tasks] = useState([]);

  const { request } = useHttp();
  useEffect(() => {
    const getProject = async () => {
      const project = await request("/project/" + id);
      const progress = await request('/project/progress/' + id)
        console.log('progress',progress)
        project.progress = progress.projectProgress
      setProject(project);
    };
    const getGlobalTasks = async () => {
      const global_tasks = await request("/global-task/all/" + id);
      dispatch(setGlobalTasks(global_tasks))
    };
    dispatch(getUsers({project_id: id}))

    getProject();
    getGlobalTasks();
  }, [dispatch, id, request]);
  const users = useSelector((state) => state.users.users) ;
  const global_tasks = useSelector((state) => state.global_tasks.global_tasks)
  const getDatatObject = (data) => {console.log('data',data)}
  const global_tasksList =
    global_tasks &&
    global_tasks.map((global_task, index) => (
      <li key={index} className="list-group-item">
        <GlobalTaskCard
          id={id}
          global_taskId={global_task.id}
          title={global_task.title}
          description={global_task.description}
          getData={getDatatObject}
        />
      </li>
    ));

  return (
    <div className="project_detail row">
      <div className="col-9">
      <div className="jumbotron jumbotron-fluid">
        <div className="container">
          <h3>{project.title}</h3>
          <p className="lead pl-1">{project.description}</p>
        </div>
      </div>
      <div className="block_user-list">
        <ul>
          <li>user -1</li>
        </ul>
      </div>
      <div className="bock_global_task-list">
      <Modal
            title="Create global task"
            forElement="create-global_task"
            component={<GlobalTaskForm project_id={id} />}
          />
        <div className="bock_global_task-list_title mb-2">
        <h2 className="text-center mb-2 pb-1 text-dark border-bottom border-dark">
        Список глобальных заданий
          <PlusSquare
            className="ml-5"
            size="24"
            data-toggle="modal"
            data-target="#create-global_task"
          />
           </h2>
        </div>
        <ul className="bock_global_task-list_body list-group">
          {global_tasksList}
        </ul>
      </div>
      </div>
      <div className="col-3">
      <UserList project_id={id} users={users} />
      </div>
    </div>
  );
};

export default ProjectDetail;