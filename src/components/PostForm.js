import React from "react";

export default class PostForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
    };
  }

  submitHandler = (event) => {
    event.preventDefault();
    console.log(this.state.title)
  };

  changeInputHandler = event => {
    event.persist()
    this.setState(prev => ({
      ...prev,
      ...{[event.target.name]: event.target.value}
    }));
  };

  render() {
    return (
      <form onSubmit={this.submitHandler}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            placeholder="title"
            name="title"
            value={this.title}
            onChange={this.changeInputHandler}
          />
        </div>
        <button className="btn btn-success" type="submit">
          {" "}
          Создать{" "}
        </button>
      </form>
    );
  }
}
