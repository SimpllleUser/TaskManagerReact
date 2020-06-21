import { CREATE_POST, FECTH_POSTS, DELETE_POST, SET_EDIT_POST } from "./types";

const initialState = {
    posts: [],
    fetchedPosts: [],
    selectEditablePost: {}
};

export const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_POST:
            return {
                ...state,
                posts: state.posts.concat([action.payload])
            };
        case FECTH_POSTS:
            return {...state, fetchedPosts: action.payload };
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(p => p.id !== action.id)
            };
        case SET_EDIT_POST:
            console.log("SET_EDIT_POST", action)
            return {
                ...state,
                selectEditablePost: action.post
            }

        default:
            return state;
    }
};