import { CREATE_PROJECT, GET_PROJECTS, DELETE_PROJECT, EDIT_PROJECT } from "./types";


const initialState = {
    projects: []
}

export const projectsReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_PROJECT:
            console.log('CREATE_PROJECT', state, action.project)
            return {
                ...state,
                projects: state.projects.concat([action.project])
            }
        case GET_PROJECTS:
            console.log('GET_PROJECT', state, action.projects)
            return {
                ...state,
                projects: state.projects = action.projects
            }
        case DELETE_PROJECT:
            console.log('DELETE_PROJECT', state, action.id)
            return {
                ...state,
                projects: state.projects.filter(project => project.id !== action.id)
            };
        case EDIT_PROJECT:
            console.log("EDIT_PROJECT", state)
            const project = action.project
            return {
                ...state,
                projects: state.projects.map(p => p.id === project.id ? project : p)
            };
        default:
            return state
    }
}