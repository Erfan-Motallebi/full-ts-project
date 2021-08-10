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
    modal: {
        content: string,
        state: boolean
    },
    open: boolean
  }

  interface IContext {
      handleClick: () => void
  }