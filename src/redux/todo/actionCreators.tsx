import { Dispatch } from "react";
import { actionTypes } from "./actionTypes";

export const addTodo = (data: IPayload[] = []) => {
  return (dispatch: Dispatch<IActionType>) => {
    dispatch({
      type: actionTypes.TODOS_ADD,
      payload: data,
    });
  };
};

export const removeTodo = (id: string) => {
  return (dispatch: Dispatch<IActionType>) => {
    dispatch({
      type: actionTypes.TODOS_REMOVE,
      payload: id,
    });
  };
};
