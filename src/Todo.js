import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Button,
  Input,
  FormHelperText,
  Modal,
} from "@material-ui/core";
import "./Todo.css";
import { db } from "./firebase";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from '@material-ui/icons/Edit';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "relative",
    left: 400,
    width: 600,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },

  button: {
    width: 150,
    margin: "10px",
  },
}));

function Todo(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState();

  const handleOpen = () => {
    setOpen(true);
  };

  const updateTodo = () => {
    db.collection("todos").doc(props.todo.id).set(
      {
        todo: input,
      },
      { merge: true }
    );
    setOpen(false);
  };

  return (
    <>
      <Modal open={open} onClose={(e) => setOpen(false)}>
        <div className={classes.paper}>
          <h3>Update the Task</h3>
          <Input
            placeholder={props.todo.todo}
            value={input}
            onChange={(Event) => setInput(Event.target.value)}
          />
          <Button
            variant="outlined"
            color="default"
            type="submit"
            onClick={updateTodo}
            className={classes.button}
            startIcon={<EditIcon/>}
          >

            Upload 
          </Button>
          <FormHelperText>Enter the task you want to do </FormHelperText>

        </div>
      </Modal>


      <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,
          width: 1,
          height: 128,
        },
      }}
    >
      <Paper elevation={6} >


      <List className="todo__list">
        <ListItem>
          <ListItemAvatar></ListItemAvatar>
          <ListItemText primary={props.todo.todo} secondary="Task uploaded"    />
        </ListItem>
        <Button
          variant="outlined"
          color="secondary"
          onClick={(Event) =>
            db.collection("todos").doc(props.todo.id).delete()
          }
          className={classes.button}
          startIcon={<DeleteIcon />}
        >
          Delete
        </Button>

        <Button
          variant="outlined"
          color="primary"
          onClick={(e) => setOpen(true)}
          className={classes.button}
          endIcon={<EditIcon>send</EditIcon>}
        >
          Edit
        </Button>

      </List>




      </Paper>
      
    </Box>

    </>
  );
}

export default Todo;
