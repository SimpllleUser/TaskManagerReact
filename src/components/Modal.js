import React from "react";
import CalendarEvent from "./CalendarEvent";
const Modal = (props) => (
  <div
      className="modal fade bd-example-modal-lg row"
    id="date-"
    tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true"
  >
    <div className="modal-dialog modal-lg modal-content">
      <div className="modal-content event-block">
        <div className="events-list">
        <h1>Title event</h1>
        <p>Description event</p>
        </div>
          <CalendarEvent date={props.date} />
          </div>
    </div>
  </div>
);
export default Modal;
