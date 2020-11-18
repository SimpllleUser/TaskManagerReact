import React, {useEffect} from "react";
import {useHttp} from "../hooks/http.hook";
import TaskList from "../components/Task/TaskList";
import {useDispatch, useSelector} from "react-redux";
import {setAllTasks} from "../store/tasks/actions";
const MainTaskList = () => {
  const {request} = useHttp();
  const dispatch = useDispatch();
  const project = JSON.parse(localStorage.getItem("project"))

  useEffect(() => {
    const getTasks = async () => {
      const global_tasks = await request("/global-task/all/" + project?.id);
      const g_tasksID = global_tasks.map((g_task) => g_task.id);
      const tasks = await request(
          "/tasks/all-tasks/from/globlal-tasks",
          "get",
          {params: {g_tasksID}}
      );
      dispatch(setAllTasks(tasks));
    };
    getTasks();
  }, [request]);

  const tasks = useSelector((state) => state.tasks.allTasks);
  return (
    <div id="main-task-list">
      {tasks ? <TaskList tasks={tasks} /> : "No tasks"}
    </div>
  );
};

export default MainTaskList;
