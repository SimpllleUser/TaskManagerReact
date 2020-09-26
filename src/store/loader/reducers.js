import {
    SHOW_LOADER,
    HIDE_LOADER
} from "./types.js"


const initialState = {
    loader: false
}

export const loaderReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_LOADER:
            console.log("STATE SHOW_LOADER", state)
            return {
                ...state,
                loader: true
            }
        case HIDE_LOADER:
            console.log("STATE HIDE_LOADER", state)
            return {
                ...state,
                loader: false
            }
        default:
            return state
    }
}