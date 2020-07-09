import React from "react";
const Modal = (props) => (
 <div class="modal fade" id={"date-"+props.day} role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">

        <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id={"date-"+props.day}>{props.event.title}</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <div class="modal-body">
        <p>props.event.description</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        {/* <button type="button" class="btn btn-primary">Save changes</button> */}
      </div>
    </div>
        </div>
      </div>
    </div>
 
)
export default Modal