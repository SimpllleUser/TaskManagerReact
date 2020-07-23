import React from "react";
import { useDispatch } from "react-redux";
import { deleteEvent, editEvent } from "../redux/actions";
import { Edit2, Trash2 } from "react-feather";


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
              <Edit2 onClick={() => {dispatch(editEvent())}} />
          </div>
        </div>
      </div>
    )
}

export default EventCard