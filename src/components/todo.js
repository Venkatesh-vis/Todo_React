import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  fetchTodos,
  deleteTodo,
  toggleTodo,
  updateTodo,
} from "../redux/actions";
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Checkbox,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./todo.css"; // Import your CSS file for animations

const Todo = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todoState.todos);

  const [editMode, setEditMode] = useState(null);
  const [editText, setEditText] = useState("");

  // State for dialog confirmation
  const [open, setOpen] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("https://dummyjson.com/todos");
      const data = res.data.todos;
      dispatch(fetchTodos(data));
    };

    fetchData();
  }, [dispatch]);

  const handleDeleteDialogOpen = (id) => {
    setTodoToDelete(id);
    setOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setOpen(false);
    setTodoToDelete(null);
  };

  const confirmDelete = () => {
    if (todoToDelete !== null) {
      dispatch(deleteTodo(todoToDelete));
      handleDeleteDialogClose();
    }
  };

  const handleToggle = (id) => {
    dispatch(toggleTodo(id));
  };

  const handleEdit = (todo) => {
    setEditMode(todo.id);
    setEditText(todo.todo); // Set current todo text into the input field
  };

  const handleSave = (id) => {
    dispatch(updateTodo(id, editText)); // Dispatch the updated todo
    setEditMode(null); // Exit edit mode after saving
    setEditText(""); // Clear the input field
  };

  // Calculate the counts
  const totalTasks = todos.length;
  const completedTasks = todos.filter(todo => todo.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  return (
    <div
      style={{
        height: "550px",
        overflow: "scroll",
        scrollbarWidth: "none",
        "-ms-overflow-style": "none",
      }}
    >
      {/* Display task counts */}
      <Typography variant="h6" align="center" style={{ marginBottom: "20px" }}>
        Total Tasks: {totalTasks} | Completed: {completedTasks} | Pending: {pendingTasks}
      </Typography>

      <List style={{ maxWidth: "700px", margin: "0 auto" }}>
        <TransitionGroup>
          {todos.map((todo) => (
            <CSSTransition key={todo.id} timeout={500} classNames="fade">
              <ListItem
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                  boxShadow: "0.2px 0.2px 3px grey",
                  borderRadius: "10px",
                }}
              >
                {editMode === todo.id ? (
                  <>
                    <TextField
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      size="small"
                      style={{ flexGrow: 1 }}
                    />
                    <IconButton onClick={() => handleSave(todo.id)}>
                      <SaveIcon />
                    </IconButton>
                  </>
                ) : (
                  <>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Checkbox
                        checked={todo.completed}
                        onClick={() => handleToggle(todo.id)}
                      />
                      <ListItemText
                        primary={todo.todo}
                        secondary={
                          todo.completed ? "Completed" : "Not Completed"
                        }
                      />
                    </div>
                    <div style={{ display: "flex" }}>
                      <IconButton onClick={() => handleEdit(todo)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => handleDeleteDialogOpen(todo.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  </>
                )}
              </ListItem>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </List>

      {/* Confirmation Dialog */}
      <Dialog open={open} onClose={handleDeleteDialogClose}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this todo?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose} color="warning">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Todo;
