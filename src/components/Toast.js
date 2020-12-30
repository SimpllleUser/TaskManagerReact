import React from "react";
import { Button, toaster } from "evergreen-ui";
import { useSelector, useDispatch } from "react-redux";

const Toast = () => {
  const dispatch = useDispatch();
  const err = useSelector((state) => state.err.err);
  if (!err.title) {
    return "";
  }
  return (
  <>
  {toaster.success(
      "" + err.title,
      {
        description:"" + err.body,
        duration: 3
      }
    )} 

  </>
  );
};
export default Toast;
