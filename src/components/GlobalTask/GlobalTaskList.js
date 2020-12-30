import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import GlobalTaskCard from "./GlobalTaskCard";
import {useHttp} from "../../hooks/http.hook";
import {setAllGlobalTasks} from "../../store/global_task/actions";

const GlobalTaskList = () => {
    const {request} = useHttp();
    const dispatch = useDispatch();
    const project = JSON.parse(localStorage.getItem("project"))
    useEffect(() => {
        const getGlobalTasks = async () => {
            const global_tasks = await request("/global-task/all/" + project?.id);
            dispatch(setAllGlobalTasks(global_tasks));
        };
        getGlobalTasks();
    }, []);


  const global_tasks = useSelector(
    (state) => state.global_tasks.allGlobalTasks
  );
  const global_tasksList =
      project?.id && global_tasks
      ? global_tasks?.map((global_task, index) => (
          <li key={index} className="list-group-item">
            <GlobalTaskCard
              id={project.id}
              global_taskId={global_task.id}
              title={global_task.title}
              description={global_task.description}
            />
          </li>
        ))
      : "Список пуст";
  return (
    <div id="global_task-list">
      <h1>Глобальный список заданий</h1>
      {global_tasksList}
    </div>
  );
};

export default GlobalTaskList;
