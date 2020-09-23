import axios from "axios"
import {
    CREATE_CALENDAR_EVENT,
    GET_ALLEVENTS,
    DELETE_EVENT,
    EDIT_EVENT
} from "./types";

const URL_API = 'http://localhost:8080/api'

export const getAllEvents = () => async(dispatch) => {
    const response = await axios.get(URL_API + '/calendar-event')
    dispatch({ type: GET_ALLEVENTS, events: response.data })
}

export const createEvent = (event) => async(dispatch) => {
    const response = await axios.post(URL_API + '/calendar-event', {
        event
    })
    dispatch({ type: CREATE_CALENDAR_EVENT, event: response.data })

}

export const deleteEvent = (id) => async(dispatch) => {
    await axios.delete(URL_API + '/calendar-event/' + id)
    dispatch({ type: DELETE_EVENT, id })
}

export const saveEditableEvent = (event) => async(dispatch) => {
    axios.put(URL_API + '/calendar-event/' + event.id, {
        event
    })
    dispatch({ type: EDIT_EVENT, event })
}