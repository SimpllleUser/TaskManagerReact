import { CREATE_POST, FECTH_POSTS, DELETE_POST, EDIT_POST } from "./types";

const initialState = {
    posts: [],
    fetchedPosts: [],
    selectEditablePost: {}
};

export const tasksReducer = (state = initialState, action) => {
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
        case EDIT_POST:
            let post = action.post
            return {
                ...state,
                posts: state.posts.map(p => p.id == post.id ? post : p)
            }

        default:
            return state;
    }
};