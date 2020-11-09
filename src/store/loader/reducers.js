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
            return {
                ...state,
                loader: true
            }
        case HIDE_LOADER:
            return {
                ...state,
                loader: false
            }
        default:
            return state
    }
}