import { CREATE_TASK, FECTH_TASKS, DELETE_TASK, EDIT_TASK, GET_ALLTASKS } from "./types";

const initialState = {
    tasks: [],
    fetchedTasks: [],
    selectEditableTask: {}
};

export const tasksReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_TASK:
            return {
                ...state,
                tasks: state.tasks.concat([action.task])
            };
        case FECTH_TASKS:
            return {...state, fetchedTasks: action.payload };
        case DELETE_TASK:
            return {
                ...state,
                tasks: state.tasks.filter(p => p.id !== action.id)
            };
        case EDIT_TASK:
            let task = action.task
            console.log(task)
            return {
                ...state,
                tasks: state.tasks.map(p => p.id == task.id ? task : p)
            };
        case GET_ALLTASKS:
            return {
                ...state,
                tasks: state.tasks = action.tasks
            }
        default:
            return state;
    }
};