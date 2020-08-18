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

  setWorkLog = () => {
    const { workLog } = this.state;
    if (!workLog || workLog < 1) {
      return;
    }
    const newWorkLog = +this.props.workLog + +workLog
    this.props.changeWorkLog(newWorkLog)
    axios
      .put("http://localhost:8080/api/tasks/work-log/" + this.props.id, {
        workLog: newWorkLog,
      })
      .then((response) => {
        // console.log(response);
      });
      this.workLogInput.current.value = "";
      this.setState({workLog: 0})
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
                    onClick={() => {this.setWorkLog()}}
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
