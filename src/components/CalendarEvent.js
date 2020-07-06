import React from "react";
import { connect } from "react-redux";
import { createEvent } from "../redux/actions";

class CalendarEvent extends React.Component {
  constructor(props) {
    super(props);
    this.titleInput = React.createRef();
    this.descriptionInput = React.createRef();
    this.state = {
      title: "",
      description: "",
      date: "",
    };
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

  submitHandler = (event) => {
    event.preventDefault();
    // INIT STATES
    const { title, description, date } = this.state;
    // VALIDATE INPUTS
    if (!title && !description) {
      return;
    }
    // CREATE POST
    const newEvent = {
      id: Date.now().toString(),
      title,
      description,
      date,
    };
    // SEND DATA ON REDUX
    this.props.createEvent(newEvent);
    // CLEAN INPUTS
    this.titleInput.current.value = "";
    this.descriptionInput.current.value = "";
    this.setState({ title: "", description: "" });
  };
  render() {
    return (
      <div>
        <h3>Event From</h3>
        <form className="eventForm" onSubmit={this.submitHandler}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            placeholder="title"
            name="title"
            ref={this.titleInput}
            value={this.title}
            onChange={this.changeInputHandler}
          />
          <label htmlFor="description pt-2"> Description </label>
          <textarea
            className="form-control"
            onChange={this.changeInputHandler}
            ref={this.descriptionInput}
            placeholder="Description"
            name="description"
            id="description"
            cols="30"
            rows="10"
          ></textarea>
          <button className="btn btn-success send-post mt-1" type="submit">
            Сохранить
          </button>
        </form>
      </div>
    );
  }
}
const mapDispatchToProps = {
    createEvent,
  };
export default connect(null, mapDispatchToProps)(CalendarEvent)

