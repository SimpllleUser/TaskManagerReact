import { CREATE_PROJECT, SET_PROJECTS, DELETE_PROJECT, EDIT_PROJECT } from "./types";


const initialState = {
    projects: []
}

export const projectsReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_PROJECT:
            return {
                ...state,
                projects: state.projects.concat([action.project])
            }
        case SET_PROJECTS:
            return {
                ...state,
                projects: state.projects = action.projects
            }
        case DELETE_PROJECT:
            return {
                ...state,
                projects: state.projects.filter(project => project.id !== action.id)
            };
        case EDIT_PROJECT:
            const project = action.project
            return {
                ...state,
                projects: state.projects.map(p => p.id === project.id ? project : p)
            };
        default:
            return state
    }
}