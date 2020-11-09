import {
    GET_USERS,
    ADD_USER,
    DELETE_USER,
} from "./types";

const initialState = {
    users: []
};

export const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_USER:
            return {
                ...state,
                users: state.users.concat([action.user])
            };

        case DELETE_USER:
            return {
                ...state,
                users: state.users.filter(user => user.id != action.user_id)
            };

        case GET_USERS:
            return {
                ...state,
                users: state.users = action.users
            }
        default:
            return state;
    }
};