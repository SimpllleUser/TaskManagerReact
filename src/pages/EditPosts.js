import React from "react";
import { connect } from "react-redux";
class EditPost extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      post:{}
    };
  }

  componentWillMount(){
    let posts = this.props.posts.find(p => p.id === this.props.match.params.id)
    this.setState({post:posts})

} 

  render() {
    return (
      <div>
        <h2>Edit post {console.log("!!!!!!!!",this.state.post)} </h2>
        <p>Id: {this.props.match.params.id}</p>
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
export default connect(mapStateToProps, null)(EditPost);
