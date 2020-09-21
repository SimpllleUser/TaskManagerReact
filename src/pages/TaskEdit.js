import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import { saveEditableTask } from "../store/tasks/actions";
import SelectorForm from "../components/SelectorForm";

const EditTask = (props) => {
  let { id } = useParams();
  let [task, setTask] = useState({});
  let [redirect, setRedirect] = useState(false);
  useEffect(() => {
    axios.get("http://localhost:8080/api/tasks/" + id).then((response) => {
      let task = response.data;
      setTask(task);
    });
  }, []);

  const changeInputHandler = (event) => {
    setTask({ ...task, [event.target.name]: event.target.value });
  };

  const saveEditTask = () => {
    const { id, title, description } = task;

    const selectedTask = {
      id,
      title,
      description,
      status: task.status,
      priority: task.priority,
      type: task.type,
    };
    props.saveEditableTask(selectedTask);
    setRedirect(true);
  };

  const updateDataStatus = (data) => {
    if (task.status != data) {
      setTask({ ...task, status: data });
    }
  };
  const updateDataType = (data) => {
    if (task.type != data) {
      setTask({ ...task, type: data });
    }
  };
  const updateDataPriority = (data) => {
    if (task.priority != data) {
      setTask({ ...task, priority: data });
    }
  };

  if (redirect) {
    return <Redirect to="/" />;
  }

  return (
    <div className="task-edit">
      <div className="inputs-text">
        <div className="form-group">
          <label htmlFor="title"> Название </label>
          <input
            type="text"
            className="form-control"
            id="title"
            placeholder="название"
            name="title"
            value={task.title}
            onChange={changeInputHandler}
          />
          <label htmlFor="description pt-2"> Описание </label>
          <textarea
            className="form-control"
            onChange={changeInputHandler}
            placeholder="описание"
            name="description"
            id="description"
            cols="30"
            rows="10"
            value={task.description}
          ></textarea>
        </div>
      </div>
      <div className="options">
        <SelectorForm
          updateData={updateDataStatus}
          data={"status"}
          value={task.status}
        />
        <SelectorForm
          updateData={updateDataType}
          data={"type"}
          value={task.type}
        />
        <SelectorForm
          updateData={updateDataPriority}
          data={"priority"}
          value={task.priority}
        />
      </div>
      <button className="btn btn-success" onClick={saveEditTask}>
        Save
      </button>
    </div>
  );
};
// export default EditTask;
const mapStateToProps = (state) => {
  return {
    tasks: state.tasks.tasks,
  };
};

const mapDispatchToProps = {
  saveEditableTask,
};
// mapStateToProps => GET STATE FROM STORE // mapDispatchToProps IINCLUDE methods REDUX
export default connect(mapStateToProps, mapDispatchToProps)(EditTask);
