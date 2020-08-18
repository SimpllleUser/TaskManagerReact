import React , { useState, useEffect}  from "react";
import axios from "axios"
import { getAllTasks } from "../redux/actions";
import { connect } from "react-redux";
import Task from "../Task/Task";


// componentWillMount() {
//   axios
//   .get("http://localhost:8080/api/tasks")
//   .then((response) => {
//     this.setState({ tasks: response.data });
//   });
// }



const TaskList = (props) => {
  let [tasks, setTasks] = useState([]);
  useEffect(() => {
    axios
    .get("http://localhost:8080/api/tasks")
    .then((response) => {
      setTasks(tasks = response.data)
      props.getAllTasks(response.data)
    });
    }, [])

    //getAllTasks

    const taskList = props.tasks ? props.tasks.map((task, index) => <Task task={task} key={index}/>) : ''
    //.map((task, index) => <Task task={task} key={index}/>)

  return (<div>
    <h2> Список заданий </h2>
    <div className="row">
      <div className="col-12 tasks-list">
        {taskList}
      </div>
    </div>
  </div>)
};

const mapDispatchToProps = {
  getAllTasks,
};

const mapStateToProps = (state) => {
  return {
    tasks: state.tasks.tasks,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
