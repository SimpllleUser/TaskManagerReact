import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { saveEditableTask } from "../redux/actions";

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
      priorities: [
        { name: "Low", class: "success" },
        { name: "Normal", class: "warning" },
        { name: "Highly", class: "danger" },
      ],
      statuses: [
        { name: "Open", class: "primary" },
        { name: "Inprogress", class: "warning" },
        { name: "Done", class: "info" },
      ],
      types: [
        { name: "Feature", value: 1, class: "primary" },
        { name: "Bug", value: 2, class: "warning" },
        { name: "Story", value: 3, class: "info" },
      ],
      prioritySelect: "Normal",
      statusSelect: "Open",
    };
  }

  componentWillMount() {
    let task = this.props.tasks.find(
      (p) => p.id === this.props.match.params.id
    );

    this.setState({
      task,
      title: task.title,
      description: task.description,
      prioritySelect: task.priority,
      typeSelect: task.type,
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
      statuses,
      statusSelect,
      prioritySelect,
      priorities,
      typeSelect,
      types
    } = this.state;

    const selectedTask = {
      id: this.state.task.id,
      title,
      description,
      status: statusSelect,
      priority: prioritySelect
    };
    this.props.saveEditableTask(selectedTask);
    this.setState({ redirect: true });
  };

  setStatusTask = (status) => {
    this.setState({ statusSelect: status });
  };

  setPriorityTask = (priority) => {
    this.setState({ prioritySelect: priority });
  };

  setTypeTask = (type) => {
    this.setState({ typeSelect: type });
  };

  render() {

    const itemsStatuses = this.state.statuses.map((status) => (
      <a
        className="dropdown-item"
        onClick={() => {
          this.setStatusTask(status.name);
        }}
        key={status.name}
      >
        {status.name}
      </a>
    ));

    const itemsPriorities = this.state.priorities.map((priority) => (
      <a
        className="dropdown-item"
        onClick={() => {
          this.setPriorityTask(priority.name);
        }}
        key={priority.name}
      >
        {priority.name}
      </a>
    ));

    const itemsTypes = this.state.priorities.map((type) => (
        <a
            className="dropdown-item"
            onClick={() => {
              this.setTypeTask(type.name);
            }}
            key={type.name}
        >
          {type.name}
        </a>
    ));

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
        <div className="statuses btn-group">
          <button
            className="btn btn-primary dropdown-toggle"
            type="button"
            data-toggle="dropdown"
          >
            {this.state.statusSelect}
          </button>
          <div className="dropdown-menu">{itemsStatuses}</div>
        </div>

        <div className="priorities btn-group">
          <button
            className="btn btn-primary dropdown-toggle"
            type="button"
            data-toggle="dropdown"
          >
            {this.state.prioritySelect}
          </button>
          <div className="dropdown-menu">{itemsPriorities}</div>
        </div>

          <div className="types btn-group">
            <button
                className="btn btn-primary dropdown-toggle"
                type="button"
                data-toggle="dropdown"
            >
              {this.state.typeSelect}
            </button>
            <div className="dropdown-menu">{itemsTypes}</div>
          </div>
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
