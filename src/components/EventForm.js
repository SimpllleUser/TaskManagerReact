import React from "react";
import { connect } from "react-redux";
import { createEvent } from "../redux/actions";
import { getAllTasks } from "../redux/actions";


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
  componentDidMount() {
    this.props.getAllTasks();
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

  saveForm = () => {
    // INIT STATES
    const { title, description } = this.state;
    // VALIDATE INPUTS
    if (!title || !description) {
      return;
    }
    // CREATE POST
    const newEvent = {
      id: Date.now().toString(),
      title,
      description,
      date: this.props.date
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
        <h3> Форма события </h3>{console.log(this.props.events)}
        <form className="eventForm" onSubmit={this.submitHandler}>
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
          ></textarea>

          <button className="btn btn-success send-task mt-1"  onClick={this.saveForm}>
          <div data-dismiss="modal" aria-label="Close" >
            Сохранить
            </div>
          </button>
        </form>
      </div>
    );
  }
}
const mapDispatchToProps = {
  createEvent,
  getAllTasks
};

const mapStateToProps = (state) => {
  return {
    events: [state.calendar.events, ...state.tasks.tasks],
    tasks: state.tasks.tasks

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CalendarEvent);
