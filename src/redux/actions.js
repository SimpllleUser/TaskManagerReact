import {
    CREATE_POST,
    FECTH_POSTS,
    SHOW_LOADER,
    HIDE_LOADER,
    DELETE_POST,
    EDIT_POST,
    CREATE_CALENDAR_EVENT
} from "./types";

export function createPost(post) {
    return {
        type: CREATE_POST,
        payload: post
    };
}

export function showLoader() {
    return {
        type: SHOW_LOADER
    };
}

export function hideLoader() {
    return {
        type: HIDE_LOADER
    };
}

export function deletePost(id) {
    return { type: DELETE_POST, id };
}

export function saveEditablePost(post) {
    return { type: EDIT_POST, post }
}

export function fetchedPosts() {
    return async dispatch => {
        dispatch(showLoader());
        const response = await fetch(
            "https://jsonplaceholder.typicode.com/posts?_limit=5"
        );
        const json = await response.json();
        setTimeout(() => {
            dispatch({ type: FECTH_POSTS, payload: json });
            dispatch(hideLoader());
        }, 500);
    };
}

export function createEvent(event) {
    return { type: CREATE_CALENDAR_EVENT, event }
}