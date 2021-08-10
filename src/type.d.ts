interface IPayload {
    id: string,
    body: string | undefined
}

interface IActionType {
    type: string,
    payload?: string
}

interface IState {
    todoList: IPayload[]
}

type DispatchType = (args: IActionType) => IActionType

type TodoStateType = {
    inputValue: string;
    condition: boolean;
    // todoLists: IPayload[]
  }