import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { saveEditablePost } from "../redux/actions";

class EditPost extends React.Component {
  constructor(props) {
    super(props);
    this.titleInput = React.createRef();
    this.descriptionInput = React.createRef();

    this.state = {
      post: {},
      title: "",
      description: "",
      prioritySelect: {},
      statusSelect: {},
      redirect: false,
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

  componentWillMount() {
    let post = this.props.posts.find(
      (p) => p.id === this.props.match.params.id
    );
    this.setState({
      post,
      title: post.title,
      description: post.description,
      prioritySelect: post.priority.value,
      statusSelect: post.status.value,
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

  saveEditPost = () => {
    const {
      title,
      description,
      statuses,
      statusSelect,
      prioritySelect,
      priorities,
    } = this.state;
    const selectedPost = {
      id: this.state.post.id,
      title,
      description,
      status: statuses.find((status) => status.value == statusSelect),
      priority: priorities.find((priority) => priority.value == prioritySelect),
    };
    this.props.saveEditablePost(selectedPost);
    this.setState({ redirect: true });
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

    if (this.state.redirect) {
      return <Redirect to="/" />;
    }

    return (
      <div>
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
        <div className="selectors-options">
          <label className="my-1 mr-2" htmlFor="priority">
            Priority
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
            Status
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
        <button className="btn btn-success" onClick={this.saveEditPost}>
          Save
        </button>
      </div>
    );
  }
}
// export default EditPost;
const mapStateToProps = (state) => {
  return {
    posts: state.posts.posts,
  };
};

const mapDispatchToProps = {
  saveEditablePost,
};
// mapStateToProps => GET STATE FROM STORE // mapDispatchToProps IINCLUDE methods REDUX
export default connect(mapStateToProps, mapDispatchToProps)(EditPost);
