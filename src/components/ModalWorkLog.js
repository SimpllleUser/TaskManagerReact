import React from "react";
import axios from "axios"

class ModalWorkLog extends React.Component {
  constructor(props) {
    super(props);

    this.workLogInput = React.createRef();

    this.state = {
      workLog: "",
    };
  }

  changeInputHandler = (event) => {
    event.persist();
    console.log("event.target.value", event.target.value)
    this.setState((prev) => ({
      ...prev,
      ...{
        [event.target.name]: event.target.value,
      },
    }));
  };

  setWorkLof = (oldWorkLog, newWorkLog) =>{
    return +oldWorkLog + +newWorkLog
  }

  submitHandler = (event) => {
    event.preventDefault();
    const {workLog} = this.state
    if(!workLog) {return}
    axios.put('http://localhost:8080/api/tasks/work-log/' + this.props.id,{
        workLog: +this.props.workLog + +workLog
    }).then( response => {
        console.log(response)
    }
    )
  }

  render() {
    return (
      <div className="modal-workLog">
        <form className="task-form" onSubmit={this.submitHandler}>
            <label htmlFor="workLog">Work log</label>
            <input
              type="text"
              className="form-control"
              id="workLog"
              name="workLog"
              ref={this.workLogInput}
              value={this.workLog}
              onChange={this.changeInputHandler}
            />
        <button className="btn btn-success send-task" type="submit">
            Сохранить
        </button>
        </form>
      </div>
    );
  }
}

export default ModalWorkLog;
