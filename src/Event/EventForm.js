import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createEvent } from "../store/events/actions";
import { getAllTasks } from "../store/tasks/actions";

const CalendarEvent = (props) => {
  const dispatch = useDispatch();
  const [eventForm, setEventFrom] = useState({
    title: "",
    description: "",
    date: "",
  });

  useEffect(() => {
    dispatch(getAllTasks());
  }, []);

  const changeInputHandler = (event) => {
    event.persist();
    setEventFrom({ ...eventForm, [event.target.name]: event.target.value });
  };

  const saveForm = () => {
    const { title, description } = eventForm;
    if (!title.trim() || !description.trim()) {
      return;
    }
    const newEvent = {
      id: Date.now().toString(),
      title,
      description,
      date: props.date,
    };
    dispatch(createEvent(newEvent));
    setEventFrom({});
  };
  return (
    <div>
      <h3> Форма события </h3>
      <form className="eventForm">
        <label htmlFor="title"> Название </label>
        <input
          type="text"
          className="form-control"
          id="title"
          name="title"
          onChange={changeInputHandler}
        />
        <label htmlFor="description pt-2"> Описание </label>
        <textarea
          className="form-control"
          onChange={changeInputHandler}
          name="description"
          id="description"
          cols="30"
          rows="10"
        ></textarea>

        <button
          className="btn btn-success send-task mt-1"
          onClick={() => saveForm()}
        >
          <div data-dismiss="modal" aria-label="Close">
            Сохранить
          </div>
        </button>
        <button type="button" class="btn btn-secondary mt-1 ml-1" data-dismiss="modal">Close</button>

      </form>
    </div>
  );
};
export default CalendarEvent;
