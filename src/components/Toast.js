import React from "react";
import {hideErr} from "../store/error/actions"
import { useSelector,useDispatch } from "react-redux";

const Toast = () => {
    const dispatch = useDispatch()
  const err = useSelector((state) => state.err.err);
  if(!err.title){
      return ""
  }
  return (
    <div
      class="alert alert-primary alert-dismissible fade show"
      id="err_block"
      role="alert"
    >{console.log("ERR",err)}
      <strong>{err.title}</strong>
      <br />
      {err.body}
      <button
        type="button"
        class="close"
        data-dismiss="alert"
        aria-label="Close"
        onClick={()=>{dispatch(hideErr())}}
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );
};
export default Toast;
