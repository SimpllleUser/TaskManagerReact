import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { createPost } from "../redux/actions";

class TaskForm extends React.Component {
  constructor(props) {
    super(props);
    this.titleInput = React.createRef();
    this.descriptionInput = React.createRef();

    this.state = {
      redirect: false,
      title: "",
      description: "",
      prioritySelect: "1",
      statusSelect: "1",
      priorities: [
        { name: "Low", value: 1, class: "badge-success" },
        { name: "Normal", value: 2, class: "badge-warning" },
        { name: "Highly", value: 3, class: "badge-danger" },
      ],
      statuses: [
        { name: "Open", value: 1, class: "badge-primary" },
        { name: "Inprogress", value: 2, class: "badge-warning" },
        { name: "Done", value: 3, class: "badge-info" },
      ],
    };
  }

  submitHandler = (event) => {
    event.preventDefault();
    // INIT STATES
    const {
      title,
      description,
      statuses,
      statusSelect,
      prioritySelect,
      priorities,
    } = this.state;
    // VALIDATE INPUTS
    if (!title && !description) {
      return;
    }
    // CREATE POST
    const newPost = {
      id: Date.now().toString(),
      title,
      description,
      status: statuses.find((status) => status.value == statusSelect),
      priority: priorities.find((priority) => priority.value == prioritySelect),
    };
    // SEND DATA ON REDUX
    this.props.createPost(newPost);
    // CLEAN INPUTS
    this.titleInput.current.value = "";
    this.descriptionInput.current.value = "";
    this.setState({ title: "", description: "", redirect: true });
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
  prioritySelectorHandler = (event) => {
    this.setState({ prioritySelect: event.target.value });
  };
  statusSelectorHandler = (event) => {
    this.setState({ statusSelect: event.target.value });
  };

  render() {
    const PrioritySelector = this.state.priorities.map((priority) => (
      <option key={priority.value} value={priority.value}>
        
        {priority.name}
      </option>
    ));
    const StatusSelector = this.state.statuses.map((status) => (
      <option key={status.value} value={status.value}>
        
        {status.name}
      </option>
    ));
    //REDIRECT ROUTE IF CREATE POST
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }

    return (
      <form className="post-form" onSubmit={this.submitHandler}>
        <div className="inputs-text">
          <div className="form-group">
            <label htmlFor="title"> Название </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              ref={this.titleInput}
              value={this.title}
              onChange={this.changeInputHandler}
            />
            <label htmlFor="description pt-2"> Описание </label>
            <textarea
              className="form-control"
              onChange={this.changeInputHandler}
              ref={this.descriptionInput}
              name="description"
              id="description"
              cols="30"
              rows="10"
            >
              
            </textarea>
          </div>
        </div>
        <div className="selectors-options">
          <label className="my-1 mr-2" htmlFor="priority">
            
            Приоритет
          </label>
          <select
            className="custom-select my-1 mr-sm-2"
            id="priority"
            value={this.state.prioritySelect}
            onChange={this.prioritySelectorHandler}
          >
            
            {PrioritySelector}
          </select>
          <label className="my-1 mr-2" htmlFor="status">
            
            Статус
          </label>
          <select
            className="custom-select my-1 mr-sm-2"
            id="status"
            value={this.state.statusSelect}
            onChange={this.statusSelectorHandler}
          >
            
            {StatusSelector}
          </select>
        </div>
        <button className="btn btn-success send-post" type="submit">
          Создать
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = {
  createPost,
};

export default connect(null, mapDispatchToProps)(TaskForm);