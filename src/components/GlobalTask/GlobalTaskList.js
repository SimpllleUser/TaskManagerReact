import React from "react";
import { useSelector } from "react-redux";
import GlobalTaskCard from "./GlobalTaskCard";

const GlobalTaskList = () => {
  const id = JSON.parse(localStorage.getItem("project"))?.id || "";
  const global_tasks = useSelector(
    (state) => state.global_tasks.allGlobalTasks
  );
  const global_tasksList =
    id && global_tasks
      ? global_tasks?.map((global_task, index) => (
          <li key={index} className="list-group-item">
            <GlobalTaskCard
              id={id}
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
