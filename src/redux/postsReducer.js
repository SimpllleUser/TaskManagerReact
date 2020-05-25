import { CREATE_POST, FECTH_POSTS } from './types'

const initialState = {
    posts: [],
    fetchedPosts: []
}

export const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_POST:
            return {
                ...state,
                posts: state.posts.concat([action.payload])
            }
        case FECTH_POSTS:
            return {...state, fetchedPosts: action.payload }

        default:
            return state
    }
}