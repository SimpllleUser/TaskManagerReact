import React, {useEffect } from "react";
import { getAllTasks } from "../store/tasks/actions";
import {useDispatch, useSelector } from "react-redux";
import Task from "../Task/Task";

const TaskList = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllTasks());
  }, []);

  const tasks = useSelector((state) => state.tasks.tasks);

  //getAllTasks
  const rowsByStatus = () => {
    var elements = [
      { name: "Open", tasks: [] },
      { name: "Inprogress", tasks: [] },
      { name: "Done", tasks: [] },
    ];

    elements.forEach(
      (el) => (el.tasks = tasks.filter((task) => task.status == el.name))
    );
    return elements;
  };
  const taskList = tasks
    ? tasks.map((task, index) => <Task task={task} key={index} />)
    : "";
  return (
    <div id="task-dashboard">
      <h2> Список заданий </h2>
      <div className="row">
        {console.log("tasks", tasks)}
        <div className="col-12 tasks-list">
          {rowsByStatus().map((el, index) => (
            <div className={"block-" + el.name} key={index}>
              <h3 className={"el-name-" + el.name}> {el.name} </h3>
              <div className={"list-" + el.name}>
                {el.tasks.map((task, index) => (
                  <Task task={task} key={index} />
                ))}
              </div>
            </div>
          ))}
          <div> </div>
        </div>
      </div>
    </div>
  );
};

export default TaskList;
