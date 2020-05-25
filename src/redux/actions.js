import { CREATE_POST, FECTH_POSTS } from './types'

export function createPost(post) {
    return {
        type: CREATE_POST,
        payload: post
    }
}

export function fetchedPosts() {
    return async dispatch => {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5')
        const json = await response.json()
        dispatch({ type: FECTH_POSTS, payload: json })
    }
}