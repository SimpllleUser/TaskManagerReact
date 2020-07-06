import { CREATE_CALENDAR_EVENT } from "./types";

const initialState = {
    events: []
}

export const calendarReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_CALENDAR_EVENT:
            console.log(action)
            return {
                ...state,
                events: state.events.push(action.event)
            }

        default:
            return state
    }
}