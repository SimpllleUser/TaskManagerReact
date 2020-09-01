import React, { useState, useEffect } from "react";
import moment from "moment";
import { Redirect, NavLink, useParams } from "react-router-dom";
import { deleteTask } from "../redux/actions";
import { Edit2, Trash2 } from "react-feather";
import SelectorElement from "../components/SelectorElement";
import axios from "axios";
import { connect } from "react-redux";
import ModalWorkLog from "../components/ModalWorkLog";

const TaskDetail = (props) => {
  // componentDidMount() {
    let [task, setTask] = useState({})
    useEffect(
      () => {
        axios
        .get("http://localhost:8080/api/tasks/" + id)
        .then((response) => {
          let task = response.data;
          setTask(task);
        });
      }
    )

    // Нативный способ запроса на получение задания
    //   fetch('http://localhost:8080/api/tasks/' + this.props.match.params.id)
    //   .then((response) => {
    //     return response.json();
    //   })
    //   .then((data) => {
    //     console.log('data',data);
    //     this.setState({ task: data });
    //   });
  // }

  const changeWorkLog = (data) => {
    if (task.workLog != data) {
      // this.setState({task['workLog']: data})
      this.setState((prev) => ({
        ...prev,
        task: { ...prev.task, workLog: data },
      })); // Пример обновления свойства внутри state
    }
  };
  let { id } = useParams()


    const size = 20;
    if (task === undefined) {
      return <Redirect to="/" />;
    }
    return (
      <div className="jumbotron" id="task-detail">
        <div className="task-body">
          <h3 className="title display-4"> {task.title} </h3>
          <hr />
          {console.log(id)}
          <p className="description my-4"> {task.description} </p>
          <ModalWorkLog
            changeWorkLog={changeWorkLog}
            id={task.id}
            workLog={task.workLog}
          />
        </div>
        <div className="task-elements">
        <div className="options">
            <SelectorElement name={task.priority} type="priority" />
            <SelectorElement name={task.status} type="status" />
            <SelectorElement name={task.type} type="type" />
          </div>
          <div className="task-work">
          <div>estimate: {task.estimate}ч</div>
          <div>workLog: {task.workLog}ч</div>
          <button
            type="button"
            className="btn btn-primary"
            data-toggle="modal"
            data-target={"#" + task.id}
          >
            Add work-log
          </button>
          </div>

          <div className="actions">
            <NavLink
              className="edit-detail"
              to={`/edit-task/${task.id}`}
            >
              <Edit2 className="text-secondary" size={size} />
            </NavLink>
            <div
              className="text-secondary trash-detail"
              onClick={() => {
                deleteTask(task.id);
              }}
            >
              <Trash2 size={size} />
            </div>
          </div>
                 <small className="date-created">
         
          {moment(task.createdAt).format("DD-MMMM-YYYY")}
        </small>
        </div>

 
      </div>
    );
}

const mapDispatchToProps = {
  deleteTask,
};

export default connect(null, mapDispatchToProps)(TaskDetail);