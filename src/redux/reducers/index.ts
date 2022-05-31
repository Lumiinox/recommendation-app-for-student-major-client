import { combineReducers } from "redux";
import userDataReducer from "./userDataReducer"

const reducers = combineReducers ({
    userData: userDataReducer
})

export default reducers;

export type State = ReturnType<typeof reducers>