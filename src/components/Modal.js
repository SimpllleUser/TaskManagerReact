import React from "react";
import CalendarEvent from "./CalendarEvent";
const Modal = (props) => (
  <div
      className="modal fade bd-example-modal-lg row"
    id="date-"
    tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true"
  >
    <div className="modal-dialog modal-lg modal-content p-5">
          <CalendarEvent date={props.date} />
    </div>
  </div>
);
export default Modal;
