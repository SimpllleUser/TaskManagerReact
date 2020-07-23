import React from "react";
import { useDispatch } from "react-redux";
import { Trash2 } from "react-feather";
import { deleteEvent } from "../redux/actions";


const EventCard = (props) =>{

  const dispatch = useDispatch();

    return (
        <div id="event-card" className="event card">
        <h3 className="evet-title card-header"> {props.event.title} </h3>
        <p className="evet-description card-text"> {props.event.description} </p>
        <div className="actions">
          <div className="delete_task">
            
            <Trash2
              className="text-secondary"
              onClick={() => {
                dispatch(deleteEvent(props.event.id));
              }}
            />
          </div>

          <div className="edit_task">
            
          </div>
        </div>
      </div>
    )
}

export default EventCard