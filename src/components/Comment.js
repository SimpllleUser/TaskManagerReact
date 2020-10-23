import React from "react";

const Comment = ({ author, text, date }) => (
  <div class="media">
    <div class="media-body">
      <h5 class="badge badge-danger">
          {author.name}
      </h5>
      <p>{text}</p>
    </div>
    <span class="badge badge-secondary">{date}</span>
  </div>
);

export default Comment;
