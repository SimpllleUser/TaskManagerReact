import React from "react";
import EventForm from "../Event/EventForm";
const Modal = (props) => (
  <div
      className={`modal fade ${props.forElement} row`}
    id="date-"
    tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true"
  >
    <div className="modal-dialog modal-lg modal-content p-5">
          <EventForm date={props.date} />
    </div>
  </div>
);
export default Modal;
