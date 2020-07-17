import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import Task from "./Task";
import { getAllTasks } from "../redux/actions";

class Tasks extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getAllTasks();
  }

  render() {
    if (this.props.syncTasks === undefined) {
      return (
        <div className="jumbotron">
          <h1 className="display-4">Заданий нет </h1>
          <hr className="my-4" />
          <p>Для создания можете перейти ниже по ссылке.</p>
          <NavLink to="/create-task" className="btn btn-primary btn-lg">
            Создать задание
          </NavLink>
        </div>
      );
    }

    return this.props.syncTasks.map((task) => <Task task={task} key={task.id} />);
  }
}

const mapStateToProps = (state) => {
  return {
    syncTasks: state.tasks.tasks,
  };
};
const mapDispatchToProps = {
  getAllTasks,
};
export default connect(mapStateToProps, mapDispatchToProps)(Tasks);
