import axios from "axios"
import {
    CREATE_CALENDAR_EVENT,
    GET_ALLEVENTS,
    DELETE_EVENT,
    EDIT_EVENT
} from "./types";

const URL_API = 'http://localhost:8080/api'


export function getAllEvents() {
    return (dispatch, stateEvent) => {
        axios.get(URL_API + '/calendar-event').then(
            response => dispatch({ type: GET_ALLEVENTS, events: response.data })
        )
    }
}


export function createEvent(event) {
    return (dispatch, stateTask) => {
        axios.post(URL_API + '/calendar-event', {
            title: event.title,
            description: event.description,
            date: event.date
        }).then(
            response => dispatch({ type: CREATE_CALENDAR_EVENT, event: response.data })
        )
    }
}

export function deleteEvent(id) {
    return (dispatch, stateTask) => {
        axios.delete(URL_API + '/calendar-event/' + id)
            .then(
                response => dispatch({ type: DELETE_EVENT, id: id })
            )
    }
}

export function saveEditableEvent(event) {
    return (dispatch, stateTask) => {
        axios.put(URL_API + '/calendar-event/' + event.id, {
                title: event.title,
                description: event.description,
            })
            .then(
                response => {
                    dispatch({ type: EDIT_EVENT, event })
                }
            )
    }
}