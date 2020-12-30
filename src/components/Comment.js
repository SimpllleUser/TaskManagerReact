import React from "react";

const Comment = ({ author='', text='', date='' }) => (
  <div className="media">
    <div className="media-body">
      <h5 className="badge badge-danger">
          {author.name}
      </h5>
      <p>{text}</p>
    </div>
    <span className="badge badge-secondary">{date}</span>
  </div>
);

export default Comment;
