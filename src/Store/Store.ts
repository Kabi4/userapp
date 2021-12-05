import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from "redux-logger";
import { authReducer } from "./Reducers/Reducer";
import {usersReducer} from './Reducers/UserReducer';
const rootReducer = combineReducers({
    authReducer,
    usersReducer
})
const logger = createLogger();

let store = createStore(rootReducer, applyMiddleware(thunk, logger));

export default store;