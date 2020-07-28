import React from "react";
import Tasks from "../Task/Tasks";
const TaskList = () => (
  <div>
    <h2> Список заданий </h2>
    <div className="row">
      <div className="col-12 tasks-list">
        <Tasks />
      </div>
    </div>
  </div>
);

export default TaskList;
