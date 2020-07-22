import React from "react";
import moment from "moment"
import { Redirect, NavLink } from "react-router-dom";
// import { connect } from "react-redux";
import { deleteTask } from "../redux/actions";
import { Edit2, Trash2 } from "react-feather";
import SelectorElement from "../components/SelectorElement";
import axios from "axios"

class TaskDetail extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      task:{}
    }
  }

  componentWillMount(){
    let r = this
    let task = axios.get('http://localhost:8080/api/tasks/'+this.props.match.params.id).then(
      response => {
        let task = response.data
        this.setState({task})
      }
    )
    
    
  }



  render(){
  const size = 20;
  if (this.state.task === undefined) {
    return <Redirect to="/" />;
  }
  return (
    <div className="jumbotron" id="task-detail">
      {console.log('11111',this.state.task)}
      <div className="task-body">
        <h3 className="title display-4"> {this.state.task.title} </h3>
        <hr/>
        <p className="description my-4"> {this.state.task.description} </p>
        <div className="options">
          {/* <SelectorElement data={this.state.task.priority} type="priority" />
          <SelectorElement data={this.state.task.status} type="status" /> */}
        </div>
        </div>

        <div className="actions">
          <NavLink className="edit-detail" to={`/edit-task/${this.state.task.id}`}>
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
        <small className="date-created"> {moment(this.state.task.createdAt).format("DD-MMMM-YYYY")} </small>
    </div>
  );
}
}

// export default EditTask;
// const mapStateToProps = (state) => {
//   return {
//     tasks: state.tasks.tasks,
//   };
// };
export default TaskDetail;
