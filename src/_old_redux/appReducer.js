import { SHOW_LOADER, HIDE_LOADER } from './types'

const stateInitial = {
    loading: false
}


export const appReducer = (state = stateInitial, action) => {
    switch (action.type) {
        case SHOW_LOADER:
            return {...state, loading: true }
        case HIDE_LOADER:
            return {...state, loading: false }
        default:
            return state
    }

}