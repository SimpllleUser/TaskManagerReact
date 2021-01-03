import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pane, Heading } from "evergreen-ui";
import GlobalTaskCard from "./GlobalTaskCard";
import { useHttp } from "../../hooks/http.hook";
import { setAllGlobalTasks } from "../../store/global_task/actions";
import EmptContent from "../../components/EmptContent";
const GlobalTaskList = () => {
  const { request } = useHttp();
  const dispatch = useDispatch();
  const project = JSON.parse(localStorage.getItem("project"));
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
    project?.id && global_tasks ? (
      global_tasks?.map((global_task, index) => (
        <li key={index} className="list-group-item">
          <GlobalTaskCard
            id={project.id}
            global_taskId={global_task.id}
            title={global_task.title}
            description={global_task.description}
          />
        </li>
      ))
    ) : (
      <EmptContent object_name="global task" />
    );
  return (
    <div id="global_task-list">
      <Pane display="flex" justifyContent="center">
        <Heading size={900}>Global task list</Heading>
      </Pane>
      <Pane display="flex" justifyContent="center">
        {global_tasksList}
      </Pane>
    </div>
  );
};

export default GlobalTaskList;
