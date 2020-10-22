import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { tasksReducer } from "./tasks/reducers";
import { eventsReducer } from "./events/reducers";
import { global_taskReducer } from "./global_task/reducers";
import { projectsReducer } from "./project/reducers";
import { loaderReducer } from "./loader/reducers";
import { errorReducer } from "./error/reducers"
import { usersReducer } from "./users/reducers"

const rootReducer = combineReducers({
    tasks: tasksReducer,
    events: eventsReducer,
    global_tasks: global_taskReducer,
    projects: projectsReducer,
    loader: loaderReducer,
    err: errorReducer,
    usesr: usersReducer
});

export default function configureStore() {
    const middlewares = [thunkMiddleware];
    const middleWareEnhancer = applyMiddleware(...middlewares);

    const store = createStore(
        rootReducer,
        composeWithDevTools(middleWareEnhancer)
    );

    return store;
}