import React from "react";
import { Redirect, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import { deleteTask } from "../redux/actions";
import { Edit2, Trash2 } from "react-feather";
import SelectorElement from "../components/SelectorElement";

const TaskDetail = (props) => {
  const dispatch = useDispatch();

  const task = props.tasks.find((p) => p.id === props.match.params.id);
  if (task === undefined) {
    return <Redirect to="/" />;
  }
  const size = 20;

  return (
    <div className="jumbotron" id="task-detail">
      <div className="task-body">
        <h3 className="title display-4"> {task.title} </h3>
        <p className="description my-4"> {task.description} </p>
        <div className="options">
          <SelectorElement data={task.priority} type="priority" />
          <SelectorElement data={task.status} type="status" />
        </div>
        </div>

        <div className="actions">
          <NavLink className="edit-detail" to={`/edit-task/${task.id}`}>
            <Edit2 className="text-secondary" size={size} />
          </NavLink>
          <div
            className="text-secondary trash-detail"
            onClick={() => {
              dispatch(deleteTask(task.id));
            }}
          >
            <Trash2 size={size} />
          </div>
        </div>
        <small> {task.date} </small>
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
