import { combineReducers } from "redux";
import todoReducer from "./todo/todoReducer";

const reducers = combineReducers({
  todo: todoReducer,
});

export default reducers;
export type RState = ReturnType<typeof reducers>;
