import { CREATE_CALENDAR_EVENT, GET_ALLEVENTS } from "./types";

const initialState = {
    events: []
}

export const calendarReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_CALENDAR_EVENT:
            return {
                ...state,
                events: state.events.concat([action.event])
            }
        case GET_ALLEVENTS:
            return {
                ...state,
                events: state.events = action.events
            }

        default:
            return state
    }
}