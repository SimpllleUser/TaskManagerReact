import axios from "axios";
import {
  CREATE_CALENDAR_EVENT,
  GET_ALLEVENTS,
  DELETE_EVENT,
  EDIT_EVENT,
} from "./types";
import { showLoader, hideLoader } from "../loader/actions";
import {showError} from "../error/actions"
const URL_API = "http://localhost:8080/api";

export const getAllEvents = () => async (dispatch) => {
  try {
    dispatch(showLoader());
    const response = await axios.get(URL_API + "/calendar-event");
    dispatch({ type: GET_ALLEVENTS, events: response.data });
    dispatch(hideLoader());
  } catch (err) {
    dispatch(hideLoader());
    dispatch(showError(err))
  }
};

export const createEvent = (event) => async (dispatch) => {
  try {
    dispatch(showLoader());
    const response = await axios.post(URL_API + "/calendar-event", {
      event,
    });
    dispatch({ type: CREATE_CALENDAR_EVENT, event: response.data });
  } catch (err) {
    dispatch(hideLoader());
    dispatch(showError(err))
  }
};

export const deleteEvent = (id) => async (dispatch) => {
  try {
    dispatch(showLoader());
    await axios.delete(URL_API + "/calendar-event/" + id);
    dispatch({ type: DELETE_EVENT, id });
    dispatch(hideLoader());
  } catch (err) {
    dispatch(hideLoader());
    dispatch(showError(err))
  }
};

export const editEvent = (event) => async (dispatch) => {
  try {
    dispatch(showLoader());
    axios.put(URL_API + "/calendar-event/" + event.id, {
      event,
    });
    dispatch({ type: EDIT_EVENT, event });
    dispatch(hideLoader());
  } catch (err) {
    dispatch(hideLoader());
    dispatch(showError(err))
  }
};
