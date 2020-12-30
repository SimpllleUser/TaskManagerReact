import React from "react";
import TaskCard from "./TaskCard";

const TaskList = ({projectID,global_taskId,tasks}) => {

  const rowsByStatus = () => {
    var elements = [
      { name: "Open", tasks: [] },
      { name: "Inprogress", tasks: [] },
      { name: "Done", tasks: [] },
    ];

    elements.forEach(
      (el) => (el.tasks = tasks?.filter((task) => task.status === el.name))
    );
    return elements;
  };
  const sortedTaskList = rowsByStatus()?.map((el, index) => (
    <div className={"block " + el.name} key={index}>
      <h3 className={"border rounded el-name " + el.name}> <span> {el.name}</span> <span className="badge badge-light mr-0 ml-auto">{el.tasks.length}</span></h3>
      <div className={"list " + el.name}>
        {el.tasks?.map((task, index) => (
          <TaskCard task={task} projectID={projectID} global_taskId ={global_taskId}key={index} />
        ))}
      </div>
    </div>
  ))
  return (
    <div id="task-dashboard">
      <div className="row">
        <div className="tasks-list">
          {sortedTaskList}
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default TaskList;
