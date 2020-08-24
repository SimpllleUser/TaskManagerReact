import React, { useState, useEffect } from "react";
import axios from "axios";
import { getAllTasks } from "../redux/actions";
import { connect } from "react-redux";
import Task from "../Task/Task";
import { getElementError } from "@testing-library/react";

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
    axios.get("http://localhost:8080/api/tasks").then((response) => {
      setTasks((tasks = response.data));
      props.getAllTasks(response.data);
    });
  }, []);

  //getAllTasks
  const rowsByStatus = () => {
    var elements = [
      { name: "Open", tasks: [] },
      { name: "Done", tasks: [] },
      { name: "Inprogress", tasks: [] },
    ];

    elements.forEach(
      (el) => (el.tasks = props.tasks.filter((task) => task.status == el.name))
    );
    return elements;
  };
  // const taskList = props.tasks
  //   ? props.tasks.map((task, index) => <Task task={task} key={index} />)
  //   : "";
  return (
    <div id="task-dashboard">
      <h2> Список заданий </h2>
      <div className="row">
        <div className="col-12 tasks-list">
          {rowsByStatus().map((el, index) => (
            <div className={'block-' + el.name} key={index}>
              <h3 className={"el-name-" + el.name}>{el.name}</h3>
              {console.log(el.name)}
              <div className={"list-" + el.name}>
                {el.tasks.map((task, index) => (
                  <Task task={task} key={index} />
                ))}
              </div>
            </div>
          ))}
          <div></div>
        </div>
      </div>
    </div>
  );
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
