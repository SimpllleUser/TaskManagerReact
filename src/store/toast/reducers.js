import {
    SHOW_ERR,
    HIDE_ERR
} from "./types.js"


const initialState = {
    err: { title: "", body: "" }
}

export const errorReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_ERR:
            return {
                ...state,
                err: action.error
            }
        case HIDE_ERR:
            return {
                ...state,
                err: { title: "", body: "" }
            }
        default:
            return state
    }
}