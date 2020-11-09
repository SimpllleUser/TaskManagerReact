import { CREATE_TASK, FECTH_TASKS, DELETE_TASK, EDIT_TASK, GET_ALLTASKS, SET_WORKLOG, SET_COMMENT, SET_TASK } from "./types";

const initialState = {
    task: [],
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
                tasks: state.tasks.filter(task => task.id != action.id)
            };
        case EDIT_TASK:
            let task = action.task
            return {
                ...state,
                tasks: state.tasks.map(p => p.id === task.id ? task : p)
            };
        case SET_ALLTASKS:
            return {
                ...state,
                allTasks: action.tasks
            }
            // case SET_WORKLOG:
            //     {
            //         const { task_id, workLog } = action.data

            //         return {
            //             ...state,
            //             tasks: state.tasks.map(task => task.id === task_id ? {...task, workLog: workLog } : task)
            //         }

            //     }
        // case SET_WORKLOG:
        //     {
        //         const { task, workLog } = action.data
        //         console.log('SET_WORKLOG', workLog)
        //
        //         return {
        //             ...state,
        //             task: action.data.task
        //         }
        //
        //     }
        case SET_COMMENT:
            {
                const { task_id, comment } = action
                console.log('SET_COMMENT', comment)

                return {
                    ...state,
                    task: {...state.task.comments, comment }
                }
            }
            // case SET_COMMENT:
            //     {
            //         console.log(state)
            //         const { task_id, comment } = action.data

            //         return {
            //             ...state,
            //             tasks: state.tasks.forEach(task => task.id == task_id ? task.comments.push(comment) : task)
            //         }
            //     }
        case SET_TASK:
            {
                const { task } = action
                return {
                    ...state,
                    task: task
                }

            }
        default:
            return state;
    }
};