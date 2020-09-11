import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { saveEditableEvent } from "../store/events/actions";

const EditEvent = (props) => {
  const dispatch = useDispatch();

  const [eventForm, setEventForm] = useState({
    id: "",
    title: "",
    description: "",
  });

  useEffect(() => {
    const getEvent = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/api/calendar-event/" + props.id
        );
        setEventForm(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getEvent();
  }, [props.id]);

  const changeInputHandler = (event) => {
    setEventForm({ ...eventForm, [event.target.name]: event.target.value });
  };

  const saveForm = () => {
    const { id, title, description, date } = eventForm;
    if (!title || !description) {
      return;
    }
    const editedEvent = {
      id,
      title,
      description,
      date,
    };

    dispatch(saveEditableEvent(editedEvent));
  };
  return (
    <div
      className={`modal fade ${props.id} row`}
      id="date-"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="myLargeModalLabel"
      aria-hidden="true"
    >
      {console.log("EVNET", eventForm)}
      <div className="modal-dialog modal-lg modal-content p-5">
        <h3> Форма реадктирования события </h3>
        <form className="eventForm">
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
            onChange={changeInputHandler}
            name="description"
            id="description"
            cols="30"
            rows="10"
            value={eventForm.description}
          ></textarea>

          <button className="btn btn-success send-task mt-1">
            <div
              data-dismiss="modal"
              aria-label="Close"
              onClick={() => {
                saveForm();
              }}
            >
              Сохранить
            </div>
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditEvent;
