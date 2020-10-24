import React, { useState } from "react";
import Comment from "./Comment";
import { useDispatch } from "react-redux";
import { setCommentToTask } from "../store/tasks/actions";

const CommnetList = ({ task_id, comments }) => {
  const dispatch = useDispatch();
  const [commentInput, setCommentInput] = useState("");
  const comnetsList = comments
    ? comments.map((comment, index) => (
        <li
          class="list-group-item ml-2 mt-3 border border-secondary rounded"
          key={index}
        >
          <Comment
            author={comment.author}
            text={comment.text}
            date={comment.date}
          />
        </li>
      ))
    : "Comments none";
  const changeInputHandler = (event) => {
    setCommentInput(event.target.value);
  };
  const setCommnet = () => {
    dispatch(setCommentToTask({ task_id, comment: commentInput }));
    setCommentInput("");
  };
  return (
    <div className="comment-block">
      <h3>Commebt</h3>
      <div class="form-group d-flex flex-wrap">
        <label for="comment-form">Comment</label>
        <textarea
          class="form-control"
          id="comment-form"
          value={commentInput}
          onChange={changeInputHandler}
          name="commentInput"
          rows="3"
        ></textarea>
        <button
          className={`btn btn-success ${
            !commentInput.length && "disabled"
          } mt-3 ml-auto `}
          onClick={() => {
            setCommnet();
          }}
        >
          Add
        </button>
      </div>
      <ul class="list-group">{comnetsList || ""}</ul>
    </div>
  );
};

export default CommnetList;
