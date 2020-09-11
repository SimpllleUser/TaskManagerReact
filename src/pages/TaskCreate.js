import React from "react";
import moment from "moment";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { createTask } from "../store/tasks/actions";
import SelectorForm from "../components/SelectorForm";

class TaskForm extends React.Component {
  constructor(props) {
    super(props);
    this.titleInput = React.createRef();
    this.descriptionInput = React.createRef();
    this.estimateInput = React.createRef();
    this.state = {
      redirect: false,
      title: "",
      description: "",
      estimate: 0,
      priority: "Low",
      status: "Open",
      type: "Feature",
    };
  }
  updateData = (val) => {
    return val;
  };
  submitHandler = (event) => {
    event.preventDefault();
    // INIT STATES
    const { title, description, estimate } = this.state;
    // VALIDATE INPUTS
    if (!title && !description) {
      return;
    }
    // CREATE POST
    const newTask = {
      id: Date.now().toString(),
      title,
      description,
      estimate,
      status: this.state.status,
      priority: this.state.priority,
      type: this.state.type,
      date: moment().format("DD-MM-YYYY"),
    };
    // SEND DATA ON REDUX
    this.props.createTask(newTask);
    // CLEAN INPUTS
    this.titleInput.current.value = "";
    this.descriptionInput.current.value = "";
    this.estimateInput.current.value = "";
    this.setState({ title: "", description: "", estimate: "", redirect: true });
  };
  changeInputHandler = (event) => {
    event.persist();
    this.setState((prev) => ({
      ...prev,
      ...{
        [event.target.name]: event.target.value,
      },
    }));
  };
  updateDataPriority = (data) => {
    if (this.state.priority != data.value) {
      this.setState({
        [data.name]: data.value,
      });
    }
  };
  updateDataStatus = (data) => {
    if (this.state.status != data.value) {
      this.setState({
        [data.name]: data.value,
      });
    }
  };
  updateDataType = (data) => {
    if (this.state.type != data.value) {
      this.setState({
        [data.name]: data.value,
      });
    }
  };
  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    return (
      <form className="task-form" onSubmit={this.submitHandler}>
        <div className="inputs-text">
          <div className="form-group">
            <label htmlFor="title"> Название </label>{" "}
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              ref={this.titleInput}
              value={this.title}
              onChange={this.changeInputHandler}
            />{" "}
            <label htmlFor="description pt-2"> Описание </label>{" "}
            <textarea
              className="form-control"
              onChange={this.changeInputHandler}
              ref={this.descriptionInput}
              name="description"
              id="description"
              cols="30"
              rows="10"
            ></textarea>{" "}
            <label htmlFor="estimate"> Часов </label>{" "}
            <input
              type="number"
              className="form-control"
              id="estimate"
              name="estimate"
              ref={this.estimateInput}
              value={this.estimate}
              onChange={this.changeInputHandler}
            />{" "}
          </div>{" "}
        </div>{" "}
        <div className="selectors-options">
          {/* <SelectorForm updateData={this.updateDataStatus} data={"status"} /> */}{" "}
          <SelectorForm updateData={this.updateDataType} data={"type"} />{" "}
          <SelectorForm
            updateData={this.updateDataPriority}
            data={"priority"}
          />{" "}
        </div>{" "}
        <button className="btn btn-success send-task" type="submit">
          Создать{" "}
        </button>{" "}
      </form>
    );
  }
}
const mapDispatchToProps = {
  createTask,
};
export default connect(null, mapDispatchToProps)(TaskForm);
