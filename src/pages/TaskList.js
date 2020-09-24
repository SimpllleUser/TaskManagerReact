import React, {useEffect } from "react";
// import { getAllTasks } from "../store/tasks/actions";
import {useDispatch, useSelector } from "react-redux";
import Modal from "../Modals/Modal";
import TaskCard from "../Task/TaskCard";

const TaskList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
  }, [dispatch]);

  const tasks = useSelector((state) => state.tasks.tasks);

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
  const sortedTaskList = rowsByStatus().map((el, index) => (
    <div className={"block-" + el.name} key={index}>
      <h3 className={"el-name-" + el.name}> {el.name} </h3>
      <div className={"list-" + el.name}>
        {el.tasks.map((task, index) => (
          <TaskCard task={task} key={index} />
        ))}
      </div>
    </div>
  ))
    ? tasks.map((task, index) => <TaskCard task={task} key={index} />)
    : "";
  return (
    <div id="task-dashboard">
      <Modal forElement="test" component={<h2> Список заданий </h2>}>
      </Modal>
      <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#test">
  Test
</button>
      <div className="row">
        <div className="col-12 tasks-list">
          {sortedTaskList}
          <div> </div>
        </div>
      </div>
    </div>
  );
};

export default TaskList;
