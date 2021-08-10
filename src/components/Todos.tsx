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
const Wrapper = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

const StyledTextField = styled(TextField)`
  width: 85%;
  background: #fff;
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

function Todos(): JSX.Element {
  const [value, setValue] = useState<TodoStateType>({
    inputValue: "",
    condition: false,
  });
  const { todoList } = useSelector((state: RState) => state.todo);
  const dispatch = useDispatch();
  const { addTodo, removeTodo } = bindActionCreators(actionCreators, dispatch);

  // const todoListContainer = () => {
  //   const lists = localStorage.getItem('lists')
  //   if(lists) {
  //     addTodo(lists)
  //   }
  //   else {
  //     addTodo()
  //   }
  // }

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTodo(value.inputValue);
    setValue({
      inputValue: "",
      condition: true,
    });
  };

  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(todoList));
  });
  return (
    <React.Fragment>
      <Wrapper>
        <StyledForm autoComplete="off" onSubmit={onSubmitHandler}>
          <StyledTextField
            id="outlined-helperText"
            label="Task"
            variant="outlined"
            placeholder="Your Task "
            value={value.inputValue}
            onChange={(e) => setValue({ ...value, inputValue: e.target.value })}
          />
          <StyledButton
            variant="contained"
            color="secondary"
            startIcon={<Add />}
            type="submit"
          >
            Add
          </StyledButton>
        </StyledForm>
        <Container>
          {value.condition && (
            <List
              style={{
                backgroundColor: "#FEFFE2",
                borderRadius: 5,
                padding: 10,
                margin: 5,
              }}
            >
              {todoList?.map((list: IPayload): JSX.Element => {
                return (
                  <ListItem key={list.id} style={{ margin: 5 }}>
                    <ListItemAvatar>
                      <Avatar style={{ backgroundColor: "#DAD5AB" }}>
                        <AssignmentIndIcon
                          style={{ backgroundColor: "#082032" }}
                        />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      style={{ fontSize: "1.2rem" }}
                      primary={list.body}
                    />
                    <ListItemSecondaryAction>
                      <Button
                        onClick={() => {
                          removeTodo(list.id as string);
                        }}
                      >
                        <DeleteIcon />
                      </Button>
                    </ListItemSecondaryAction>
                  </ListItem>
                );
              })}
            </List>
          )}
        </Container>
      </Wrapper>
    </React.Fragment>
  );
}

export default Todos;
