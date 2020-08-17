import React , { useState, useEffect}  from "react";
import Task from "../Task/Task";
import axios from "axios"

// componentWillMount() {
//   axios
//   .get("http://localhost:8080/api/tasks")
//   .then((response) => {
//     this.setState({ tasks: response.data });
//   });
// }



const TaskList = () => {
  let [tasks, setTasks] = useState([]);
  useEffect(() => {
    axios
    .get("http://localhost:8080/api/tasks")
    .then((response) => {
      setTasks(tasks = response.data)
    });
    }, [])

    const listTask = tasks ? tasks.map((task, index) => <Task task={task} key={index}/>) : ''
    //.map((task, index) => <Task task={task} key={index}/>)

  return (<div>
    <h2> Список заданий </h2>
    <div className="row">
      <div className="col-12 tasks-list">
        {listTask}
      </div>
    </div>
  </div>)
};

export default TaskList;
