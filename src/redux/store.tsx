import { applyMiddleware, createStore } from "redux";
import ThunkMiddleware from "redux-thunk";
import reducers from "./rootReducers";

// const store: Store<IState, IActionType> & { dispatch: DispatchType } =
//   createStore(reducers, applyMiddleware(ThunkMiddleware));

const store = createStore(reducers, applyMiddleware(ThunkMiddleware));

export default store;
