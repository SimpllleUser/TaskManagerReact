import { CREATE_TASK, FECTH_TASKS, DELETE_TASK, EDIT_TASK, SET_ALLTASKS, SET_TASKS, SET_COMMENT, SET_TASK } from "./types";

const initialState = {
    task: [],
    tasks: [],
    allTasks:[],
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
                tasks: state.tasks.filter(task => task.id != action.id)
            };
        case EDIT_TASK:
            let task = action.task
            return {
                ...state,
                tasks: state.tasks.map(p => p.id === task.id ? task : p)
            };

        case SET_COMMENT:
            {
                const { comment } = action
                console.log('SET_COMMENT', comment)

                return {
                    ...state,
                    task: {...state.task.comments, comment }
                }
            }

        case SET_ALLTASKS:
            return {
                ...state,
                allTasks: action.tasks
            }
        case SET_TASKS:

            return {
                ...state,
                tasks:action.tasks
            }
        case SET_TASK:
            {
                return {
                    ...state,
                    task:action.task
                }

            }
        default:
            return state;
    }
};