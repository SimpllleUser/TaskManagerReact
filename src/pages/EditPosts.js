import React from "react";
import {connect} from 'react-redux'
class EditPost extends React.Component{
  render(){
    return<div>
    <h2>Edit post  </h2>
    <p>Id: {console.log(this.props.match.params)}</p>
  </div>
  }
}
// export default EditPost;
const mapStateToProps = state =>{
    return {
        selectEditablePost: state.posts
}
}
 export default connect(mapStateToProps, null)(EditPost)
