import React from "react";
import { Redirect, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import { deleteTask } from "../redux/actions";
import { Edit2, X } from "react-feather";

const TaskDetail = (props) => {
  const dispatch = useDispatch();

  const task = props.tasks.find((p) => p.id === props.match.params.id);
  if (task === undefined) {
    return <Redirect to="/" />;
  }
  const size = 20

  return (
    <div className="jumbotron" id="task-detail">
      <div>
        <div className="id lead">
          <span className="label">ID: </span>
          {task.id}
        </div>
        <h3 className="title display-4">{task.title}</h3>
        <p className="description my-4">{task.description}</p>
        <div className="options">
          <div className={"status border border-" + task.status.class}>
            {task.status.name}
          </div>
          <div className={"priority border border-" + task.priority.class}>
            {task.priority.name}
          </div>
        </div>
        <div className="actions">
          <NavLink className="edit-detail" to={`/edit-task/${task.id}`}>
            <Edit2 size={size}/>
          </NavLink>
          <div className="trash-detail"
            onClick={() => {
              dispatch(deleteTask(task.id));
            }}
          >
            <X size={size}/>
          </div>
        </div>
        <small>{task.date}</small>
      </div>
    </div>
  );
};

// export default EditTask;
const mapStateToProps = (state) => {
  return {
    tasks: state.tasks.tasks,
  };
};
export default connect(mapStateToProps, null)(TaskDetail);
