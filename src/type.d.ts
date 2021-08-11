interface IPayload {
  id: string;
  body?: string;
}

interface IActionType {
  type: string;
  payload?: IPayload[] | string;
}

interface IState {
  todoList: IPayload[];
}

type DispatchType = (args: IActionType) => IActionType;

type TodoStateType = {
  inputValue: string;
  condition: boolean;
  modalContent: string;
  open: boolean;
  id: string;
  label: string;
};

interface IContext {
  handleClick: () => void;
}
