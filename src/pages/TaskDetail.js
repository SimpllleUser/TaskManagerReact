import React, { useState } from "react";
import { connect } from "react-redux";

// componentWillMount() {
//   let task = this.props.tasks.find(
//     (p) => p.id === this.props.match.params.id
//   );
//   this.setState({
//     task,
//     title: task.title,
//     description: task.description,
//     prioritySelect: task.priority.value,
//     statusSelect: task.status.value,
//   });
// }
// const [task, setTask] = useState(this.props.tasks.find(
//        (p) => p.id === this.props.match.params.id
//      ))
const TaskDetail = (props) => {
  const task = props.tasks.find((p) => p.id === props.match.params.id);

  return(<div className="jumbotron" id="task-detail">
    <div>
      <div className="id lead">
        {console.log(task)}
      {task.id}
      </div>
      <h3 className="title display-4">{task.title}</h3>
      <p className="description my-4">{task.description}</p>
      <div className="options">
  <div className={'status '+task.status.class}>{task.status.name}</div>
  <div className={'priority '+task.priority.class}>{task.priority.name}</div>
  </div>
      <small>{task.date}</small> 
    </div>

    </div>);
};

// export default EditTask;
const mapStateToProps = (state) => {
  return {
    tasks: state.tasks.tasks,
  };
};
export default connect(mapStateToProps, null)(TaskDetail);
