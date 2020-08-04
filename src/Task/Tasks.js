import React from "react";
import axios from "axios"
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import Task from "./Task";
import { getAllTasks } from "../redux/actions";

class Tasks extends React.Component {

    constructor(props){
    super(props)
    this.state ={ tasks: []}
  }
  componentWillMount() {
    axios
    .get("http://localhost:8080/api/tasks")
    .then((response) => {
      this.setState({ tasks: response.data });
    });
  }

  render() {
    if (this.state.tasks === undefined) {
      return (
        <div className="jumbotron">
          <h1 className="display-4"> Заданий нет </h1> <hr className="my-4" />
          <p> Для создания можете перейти ниже по ссылке. </p>
          <NavLink to="/create-task" className="btn btn-primary btn-lg">
            Создать задание
          </NavLink>
        </div>
      );
    }

    return this.state.tasks.map((task) => (
      <Task task={task} key={task.id} />
    ));
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
