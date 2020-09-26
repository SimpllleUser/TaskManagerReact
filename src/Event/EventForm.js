import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createEvent } from "../store/events/actions";
import {editEvent} from "../store/events/actions"
const CalendarEvent = ({event}) => {
  const dispatch = useDispatch();
  const [eventForm, setEventFrom] = useState({
    id: event.id ||  "",
    title: event.title ||  "",
    description: event.description ||"",
    date: event.date ||"",
  });

  const changeInputHandler = (event) => {
    setEventFrom({ ...eventForm, [event.target.name]: event.target.value });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const { id,title, description,date } = eventForm;
    if (!title.trim() || !description.trim()) {
      return;
    }
    const Event = {
      id,
      title,
      description,
      date,
    };

    eventForm.id ? dispatch(editEvent(Event)) : dispatch(createEvent(Event));
    setEventFrom({});
  };
  return (
    <div>
      {eventForm.id}
      <form className="eventForm" onSubmit={submitHandler}>
        <label htmlFor="title"> Название </label>
        <input
          type="text"
          className="form-control"
          id="title"
          name="title"
          value={eventForm.title}
          onChange={changeInputHandler}
        />
        <label htmlFor="description pt-2"> Описание </label>
        <textarea
          className="form-control"
          value={eventForm.description}
          onChange={changeInputHandler}
          name="description"
          id="description"
          cols="30"
          rows="10"
        ></textarea>

        <button className="btn btn-success send-task mt-1">
          <div>
          {eventForm.id ? 'Сохранить' : 'Создать' }
          </div>
        </button>
        <button
          type="button"
          className="btn btn-secondary mt-1 ml-1"
        >
          Close
        </button>
      </form>
    </div>
  );
};
export default CalendarEvent;
