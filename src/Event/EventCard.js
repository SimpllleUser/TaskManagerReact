import React from "react";
import { useDispatch } from "react-redux";
import { X, Edit2 } from "react-feather";
import { deleteEvent } from "../store/events/actions";
// import EventEdit from './EventEdit'
import Modal from "../Modals/Modal";
import EventForm from "./EventForm";

const EventCard = ({ event }) => {
  const dispatch = useDispatch();

  const id = event.id;

  return (
    <div id="event-card" className="event card">
      <h3 className="evet-title card-header"> {event.title} </h3>
      {event.description && (
        <p className="evet-description card-text">{event.description}</p>
      )}
      <div className="actions">
        <div className="edit_task">
          <Modal
            forElement={"edit-event" + id}
            title="Edit event"
            component={
              <EventForm
                event={{
                  id,
                  title: event.title,
                  description: event.description,
                  date: event.date,
                }}
              />
            }
          />
          <Edit2
            className="text-primary"
            data-toggle="modal"
            data-target={"#edit-event" + id}
          />
        </div>
        <div className="delete_event">
          <X
            className="text-danger border border-danger rounded"
            onClick={() => {
              dispatch(deleteEvent(event.id));
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default EventCard;
