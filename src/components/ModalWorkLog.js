import React from "react";
import axios from "axios";

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
    this.setState((prev) => ({
      ...prev,
      ...{
        [event.target.name]: event.target.value,
      },
    }));
  };

  setWorkLof = (oldWorkLog, newWorkLog) => {
    return +oldWorkLog + +newWorkLog;
  };

  submitHandler = (event) => {
    event.preventDefault();
    const { workLog } = this.state;
    if (!workLog || workLog < 1) {
      return;
    }
    axios
      .put("http://localhost:8080/api/tasks/work-log/" + this.props.id, {
        workLog: +this.props.workLog + +workLog,
      })
      .then((response) => {
        console.log(response);
      });
  };

  render() {
    return (
      <div
      className="modal fade modal-worklLog"
        id={this.props.id}
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Work log</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="modal-workLog">
                <form className="task-form" onSubmit={this.submitHandler}>
                  <input
                    type="text"
                    className="form-control"
                    id="workLog"
                    name="workLog"
                    ref={this.workLogInput}
                    value={this.workLog}
                    onChange={this.changeInputHandler}
                  />
                  <button
                    className="btn btn-success send-task"
                    data-dismiss="modal"
                    type="submit"
                  >
                    Сохранить
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ModalWorkLog;
