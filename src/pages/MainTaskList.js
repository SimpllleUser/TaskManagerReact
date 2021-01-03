import React, { useEffect } from "react";
import { Pane, Heading } from "evergreen-ui";
import { useHttp } from "../hooks/http.hook";
import TaskList from "../components/Task/TaskList";
import { useDispatch, useSelector } from "react-redux";
import { setAllTasks } from "../store/tasks/actions";
const MainTaskList = () => {
  const { request } = useHttp();
  const dispatch = useDispatch();
  const project = JSON.parse(localStorage.getItem("project"));

  useEffect(() => {
    const getTasks = async () => {
      const global_tasks = await request("/global-task/all/" + project?.id);
      const g_tasksID = global_tasks && global_tasks.map((g_task) => g_task.id);
      const tasks = await request(
        "/tasks/all-tasks/from/globlal-tasks",
        "get",
        { params: { g_tasksID } }
      );
      dispatch(setAllTasks(tasks));
    };
    getTasks();
  }, []);

  const tasks = useSelector((state) => state?.tasks.allTasks);
  return (
    <div>
      <Pane display="flex" justifyContent="center">
        <Heading size={900}>All tasks</Heading>
      </Pane>
      <Pane display="flex" justifyContent="center">
        <div>
          <TaskList tasks={tasks} />
        </div>
      </Pane>
    </div>
  );
};

export default MainTaskList;
