import React from "react";
import { connect } from "react-redux";
class EditPost extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    return (
      <div>
        <h2>Edit post {console.log(this.props)} </h2>
        <p>Id: {this.props.match.params.id}</p>
      </div>
    );
  }
}
// export default EditPost;
const mapStateToProps = (state) => {
  return {
    selectEditablePost: state.posts.posts,
  };
};
export default connect(mapStateToProps, null)(EditPost);
