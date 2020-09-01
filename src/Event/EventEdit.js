import React from "react";
import { connect } from "react-redux";
import axios from "axios"
import { saveEditableEvent } from "../redux/actions";



class EditEvent extends React.Component {
  constructor(props) {
    super(props);
    this.titleInput = React.createRef();
    this.descriptionInput = React.createRef();
    this.state = {
        title: '',
        description: ''
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:8080/api/calendar-event/" + this.props.id)
      .then((response) => {
        this.setState({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          date: response.data.date 
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

  saveForm = () => {
    // INIT STATES
    const { id,title, description, date } = this.state;
    // VALIDATE INPUTS
    if (!title || !description) {
      return;
    }
    // CREATE POST
    const event = {
      id,
      title,
      description,
      date
    };
    // SEND DATA ON REDUX
    this.props.saveEditableEvent(event);
    // CLEAN INPUTS

  };
  render() {
    return (
        <div
      className={`modal fade ${this.props.id} row`}
    id="date-"
    tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true"
  ><div className="modal-dialog modal-lg modal-content p-5">
        <h3> Форма реадктирования события </h3>
        <form className="eventForm" onSubmit={this.submitHandler}>
          <label htmlFor="title"> Название </label>
          <input
            type="text"
            className="form-control"
            id="title"
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
            value={this.state.description}
            name="description"
            id="description"
            cols="30"
            rows="10"
          ></textarea>

          <button className="btn btn-success send-task mt-1"  onClick={this.saveEditEvent}>
          <div data-dismiss="modal" aria-label="Close"  onClick={() => {this.saveForm()}}>
            Сохранить
            </div>
          </button>
        </form>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = {
    saveEditableEvent,
};



export default connect(null, mapDispatchToProps)(EditEvent);
