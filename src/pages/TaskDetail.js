import React from "react";
import moment from "moment";
import { Redirect, NavLink } from "react-router-dom";
import { deleteTask } from "../redux/actions";
import { Edit2, Trash2 } from "react-feather";
import SelectorElement from "../components/SelectorElement";
import axios from "axios";
import { connect } from "react-redux";
import ModalWorkLog from "../components/ModalWorkLog"


class TaskDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      task: {},
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:8080/api/tasks/" + this.props.match.params.id)
      .then((response) => {
        let task = response.data;
        this.setState({ task });
      });
  // Нативный способ запроса на получение задания
  //   fetch('http://localhost:8080/api/tasks/' + this.props.match.params.id)
  //   .then((response) => {
  //     return response.json();
  //   })
  //   .then((data) => {
  //     console.log('data',data);
  //     this.setState({ task: data });
  //   });  
  }

  changeWorkLog = (data) => {
    if(this.state.task.workLog != data){
      // this.setState({task['workLog']: data})
      this.setState(prev => ({ ...prev, task: { ...prev.task, workLog: data } })) // Пример обновления свойства внутри state
    }
    
  }

  render() {
    const size = 20;
    if (this.state.task === undefined) {
      return <Redirect to="/" />;
    }
    return (
      <div className="jumbotron" id="task-detail">
        <div className="task-body">
          <h3 className="title display-4"> {this.state.task.title} </h3>
          <div>estimate: {this.state.task.estimate}ч</div>
          <div>workLog: {this.state.task.workLog}ч</div>
          <hr />
          <p className="description my-4"> {this.state.task.description} </p>
          <ModalWorkLog changeWorkLog={this.changeWorkLog} id={this.state.task.id} workLog={this.state.task.workLog} />

          <button type="button" className="btn btn-primary" data-toggle="modal" data-target={'#' + this.state.task.id}>
            Add work-log
          </button>


          <div className="options">
            <SelectorElement name={this.state.task.priority} type="priority" />
            <SelectorElement name={this.state.task.status} type="status" />
            <SelectorElement name={this.state.task.type} type="type" />
          </div>
        </div>

        <div className="actions">
          <NavLink
            className="edit-detail"
            to={`/edit-task/${this.state.task.id}`}
          >
            <Edit2 className="text-secondary" size={size} />
          </NavLink>
          <div
            className="text-secondary trash-detail"
            onClick={() => {
              deleteTask(this.state.task.id);
            }}
          >
            <Trash2 size={size} />
          </div>
        </div>
        <small className="date-created">
         
          {moment(this.state.task.createdAt).format("DD-MMMM-YYYY")}{" "}
        </small>
      </div>
    );
  }
}

const mapDispatchToProps = {
  deleteTask,
};

export default connect(null, mapDispatchToProps)(TaskDetail);
