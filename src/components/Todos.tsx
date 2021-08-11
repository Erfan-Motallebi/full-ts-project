import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../redux";
import { RState } from "../redux/rootReducers";
import TextField from "@material-ui/core/TextField";
import Add from "@material-ui/icons/Add";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import DeleteIcon from "@material-ui/icons/Delete";
import Modals from "./Modals";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import { TransitionProps } from "@material-ui/core/transitions/transition";
import Slide from "@material-ui/core/Slide";
import Badge from "@material-ui/core/Badge";
import WorkIcon from "@material-ui/icons/Work";
import InputAdornment from "@material-ui/core/InputAdornment";
import Edit from "@material-ui/icons/Edit";

const Wrapper = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

const StyledTextField = styled(TextField)`
  width: 85%;
  background: #fff;
  padding: 25px;
`;

const StyledForm = styled.form`
  margin: 50px;
  text-align: center;
`;

const StyledButton = styled(Button)`
  width: 100px;
  height: 55px;
  border-radius: 0 2px 2px 0;
`;

const StyledBadge = styled(Badge)`
  font-size: 3rem;
  margin-right: 20px;
`;

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Todos(): JSX.Element {
  const [value, setValue] = useState<TodoStateType>({
    inputValue: "",
    condition: false,
    modalContent: "",
    open: false,
    id: "",
    label: "Add",
  });

  const { todoList } = useSelector((state: RState) => state.todo);
  const dispatch = useDispatch();
  const { addTodo, removeTodo } = bindActionCreators(actionCreators, dispatch);

  const agree = () => {
    if (value.label === "Edit") {
      const newTodoList: IPayload[] = todoList.map((todo) => {
        if (todo.id === value.id) {
          todo.body = value.inputValue;
        }
        return todo;
      });
      addTodo(newTodoList);
      setValue({
        ...value,
        open: false,
        modalContent: "Added",
        inputValue: "",
        label: "Add",
        condition: true,
      });
    } else {
      addTodo([
        ...todoList,
        {
          id: new Date().getTime().toLocaleString(),
          body: value.inputValue,
        },
      ]);
      setValue({
        ...value,
        open: false,
        modalContent: "Added",
        inputValue: "",
        condition: true,
      });
    }
  };

  const closeModal = () => {
    setValue({
      ...value,
      open: false,
    });
  };

  const editList = (todoId: string) => {
    const editField: IPayload | undefined = todoList.find(
      (todo: IPayload) => todo.id === todoId
    );
    setValue({
      ...value,
      id: todoId,
      label: "Edit",
      inputValue: editField?.body as string,
    });
  };

  const removeList = (todoId: string) => {
    removeTodo(todoId);
    setValue({
      ...value,
      modalContent: "Removed",
    });
  };

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setValue({
      ...value,
      open: true,
    });
  };

  return (
    <React.Fragment>
      <Wrapper>
        <StyledForm
          autoComplete="off"
          onSubmit={(e: React.MouseEvent<HTMLFormElement>) =>
            onSubmitHandler(e)
          }
        >
          <StyledTextField
            id="outlined-helperText"
            label="Task"
            variant="outlined"
            placeholder="Your Task "
            value={value.inputValue}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <StyledBadge badgeContent={todoList.length} color="secondary">
                    <WorkIcon />
                  </StyledBadge>
                </InputAdornment>
              ),
            }}
            onChange={(e) =>
              setValue({
                ...value,
                inputValue: e.target.value,
              })
            }
          />
          <StyledButton
            variant="contained"
            color="primary"
            startIcon={<Add />}
            type="submit"
          >
            {value.label}
          </StyledButton>
        </StyledForm>
        {todoList.length > 0 ? (
          <Container>
            <List
              style={{
                backgroundColor: "#DAD5AB",
                borderRadius: 5,
                padding: 10,
                margin: 5,
              }}
            >
              {todoList?.map((list: IPayload): JSX.Element => {
                return (
                  <ListItem key={list.id} style={{ margin: 5 }}>
                    <ListItemAvatar>
                      <Avatar style={{ backgroundColor: "#b4a730" }}>
                        <AssignmentIndIcon
                          style={{ backgroundColor: "#082032" }}
                        />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={list.body} />
                    <ListItemSecondaryAction>
                      <Button onClick={() => removeList(list.id as string)}>
                        <DeleteIcon />
                      </Button>
                      <Button onClick={() => editList(list.id as string)}>
                        <Edit />
                      </Button>
                    </ListItemSecondaryAction>
                  </ListItem>
                );
              })}
            </List>
          </Container>
        ) : (
          ""
        )}
      </Wrapper>
      <Dialog
        open={value.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={closeModal}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {"Do you want to accept ?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {value.inputValue}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal} color="primary">
            Disagree
          </Button>
          <Button onClick={agree} color="primary">
            Agree
          </Button>
        </DialogActions>
      </Dialog>

      {todoList.length !== 0 && <Modals modalContent={value.modalContent} />}
    </React.Fragment>
  );
}

export default Todos;
