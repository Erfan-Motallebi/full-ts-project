import { actionTypes } from "./actionTypes";

const initialState: IState = {
  todoList: [],
};

const todoReducer = (
  state: IState = initialState,
  action: IActionType
): IState => {
  switch (action.type) {
    case actionTypes.TODOS_ADD:
      const todoList: IPayload[] = [
        {
          id: new Date().getTime().toString(),
          body: action.payload,
        },
      ];
      return {
        ...state,
        todoList: state.todoList.concat(todoList),
      };
    case actionTypes.TODOS_REMOVE:
      const newTodoList: IPayload[] = state.todoList.filter(
        (list: IPayload) => list.id !== action.payload
      );
      return {
        todoList: newTodoList,
      };
    default:
      return state;
  }
};

export default todoReducer;
