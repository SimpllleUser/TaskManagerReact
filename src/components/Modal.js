import React from "react";
import CalendarEvent from "./CalendarEvent";
const Modal = (props) => (
  <div
    class="modal fade bd-example-modal-lg row"
    id={"date-" + props.day}
    role="dialog"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg modal-content">
      <div class="modal-content event-block">
        <div className="events-list">
        <h1>Title event</h1>
        <p>Description event</p>
        </div>
          <CalendarEvent />
          </div>
    </div>
  </div>
);
export default Modal;
