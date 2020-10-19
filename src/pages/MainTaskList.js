import React, { useState, useEffect } from "react";
import TaskList from "../Task/TaskList";
import { useSelector } from "react-redux";
const MainTaskList = () => {
  const tasks = useSelector((state) => state.tasks.tasks);
  return (
    <div id="main-task-list">

      {tasks ? <TaskList tasks={tasks} /> : "No tasks"}
    </div>
  );
};

export default MainTaskList;
