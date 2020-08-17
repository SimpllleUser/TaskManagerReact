import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { saveEditableTask } from "../redux/actions";
import SelectorForm from "../components/SelectorForm";

class EditTask extends React.Component {
  constructor(props) {
    super(props);
    this.titleInput = React.createRef();
    this.descriptionInput = React.createRef();

    this.state = {
      task: {},
      title: "",
      description: "",
      redirect: false,
      priority: "",
      status: "",
      type: "",
    };
  }

  componentWillMount() {
    axios
      .get("http://localhost:8080/api/tasks/" + this.props.match.params.id)
      .then((response) => {
        let task = response.data;
        this.setState({
          task,
          title: task.title,
          description: task.description,
          priority: task.priority,
          status: task.status,
          type: task.type,
        });
      });
  }

  changeInputHandler = (event) => {
    event.persist();
    this.setState((prev) => ({
      ...prev,
      ...{
        [event.target.name]: event.target.value,
      },
    }));
  };

  saveEditTask = () => {
    const {
      title,
      description,
    } = this.state;

    const selectedTask = {
      id: this.state.task.id,
      title,
      description,
      status: this.state.status,
      priority: this.state.priority,
      type: this.state.type,
    };
    this.props.saveEditableTask(selectedTask);
    this.setState({ redirect: true });
  };

  updateDataStatus = (data) => {
    if(this.state.status != data) {
      this.setState({ status: data });
    }
  };
  updateDataType = (data) => {
    if (this.state.type != data) {
      this.setState({ type: data });
    }
  };
  updateDataPriority = (data) => {
    if (this.state.updateDataPriority != data) {
      this.setState({ priority: data });
    }
  };
  render() {
    if (this.state.redirect) {
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
              ref={this.titleInput}
              value={this.state.title}
              onChange={this.changeInputHandler}
            />
            <label htmlFor="description pt-2"> Описание </label>
            <textarea
              className="form-control"
              onChange={this.changeInputHandler}
              ref={this.descriptionInput}
              placeholder="описание"
              name="description"
              id="description"
              cols="30"
              rows="10"
              value={this.state.description}
            ></textarea>
          </div>
        </div>
        <div className="options">
          <SelectorForm
            updateData={this.updateDataStatus}
            data={"status"}
            value={this.state.status}
          />
                   <SelectorForm
            updateData={this.updateDataType}
            data={"type"}
            value={this.state.type}
          />
                   <SelectorForm
            updateData={this.updateDataPriority}
            data={"priority"}
            value={this.state.priority}
          />
        </div>
        <button className="btn btn-success" onClick={this.saveEditTask}>
          Save
        </button>
      </div>
    );
  }
}
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
