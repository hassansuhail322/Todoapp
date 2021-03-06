import React, { useState, useEffect } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
} from "@material-ui/core";
import Todo from "./Todo";
import { db } from "./firebase";
import firebase from "firebase";
import "./index";
import {Slide,Zoom} from 'react-reveal';


function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    db.collection("todos")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setTodos(
          snapshot.docs.map((doc) => ({ id: doc.id, todo: doc.data().todo }))
        );
      });
  }, []);

  const addTodo = (Event) => {
    Event.preventDefault();

    db.collection("todos").add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
  };

  return (
    <div className="App">



      <div className="App-header">
      <Zoom left duration = {2000}>

        <h1>Todo List</h1>
      </Zoom>
      </div>
      <form>
        <FormControl>
          <InputLabel>
            <span role="img" aria-label="emoji">
              {" "}
            </span>{" "}
            Enter Todo
          </InputLabel>
          <Input
            value={input}
            onChange={(Event) => setInput(Event.target.value)}
          />
          <FormHelperText>Enter task you want to do </FormHelperText>
        </FormControl>

        <Button
          disabled={!input}
          type="submit"
          variant="contained"
          color="primary"
          onClick={addTodo}
        >
          Add Todo
        </Button>

      </form>
      <ul>
        {todos.map((todo) => (
          <Todo todo={todo} />
        ))}
      </ul>
    </div>
  );
}

export default App;
