import React from "react";

const Modal = (props) => (

<div class="modal fade" id={"date-"+props.day} tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
        {/* <h3 className="modal-title">{props.event.title}</h3> */}
          <div class="modal-body">
              {props.event}
                {/* {props.event.description} */}
          </div>
        </div>
      </div>
    </div> 
)
export default Modal