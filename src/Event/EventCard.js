import React from "react";
import { useDispatch } from "react-redux";
import { X, Edit2 } from "react-feather";
import { deleteEvent } from "../store/events/actions";
import EventEdit from './EventEdit'

const EventCard = (props) => {
  const dispatch = useDispatch();

  const id = props.event.id

  return (
    <div id="event-card" className="event card">
      <h3 className="evet-title card-header"> {props.event.title} </h3>
      {props.event.description ? (
        <p className="evet-description card-text">
          {props.event.description}
        </p>
      ) : (
        ""
      )}
      <div className="actions">
        <div className="edit_task">
          <EventEdit id={id} />
          <Edit2 className="text-primary"  data-toggle="modal" data-target={`.${id}`}/>
        </div>
        <div className="delete_event">
          <X
            className="text-danger border border-danger rounded"
            onClick={() => {
              dispatch(deleteEvent(props.event.id));
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default EventCard;
