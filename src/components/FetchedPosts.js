import React from "react";
import Task from "./Task";
import { useDispatch, useSelector } from "react-redux";
import { fetchedTasks } from "../redux/actions";
import {Loader} from "./Loader"

export default () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.fetchedTasks);
  const loading = useSelector((state) => state.app.loading);

  if (loading) {
    return <Loader/>
  }

  if (!tasks.length) {
    return (
      <button
        className="btn btn-primary"
        onClick={() => dispatch(fetchedTasks())}
      >
        Загрузить
      </button>
    );
  }
  return tasks.map((task) => <Task task={task} key={task.id} />);
};
