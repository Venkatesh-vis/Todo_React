import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { fetchTodos, deleteTodo, toggleTodo, updateTodo } from '../redux/actions';
import { List, ListItem, ListItemText, IconButton, Checkbox, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

const Todo = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todoState.todos);

  const [editMode, setEditMode] = useState(null);
  const [editText, setEditText] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get('https://dummyjson.com/todos');
      const data = res.data.todos;
      dispatch(fetchTodos(data));
    };

    fetchData();
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
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
    setEditText(''); // Clear the input field
  };

  return (
    <List style={{ maxWidth: '700px', margin: '0 auto' }}>
      {todos.map((todo) => (
        <ListItem key={todo.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom:'10px', boxShadow:'0.5px 0.5px 5px black', borderRadius:'10px' }}>
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
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Checkbox
                  checked={todo.completed}
                  onClick={() => handleToggle(todo.id)}
                />
                <ListItemText
                  primary={todo.todo}
                  secondary={todo.completed ? 'Completed' : 'Not Completed'}
                />
              </div>
              <div style={{display:'flex'}}>
                <IconButton onClick={() => handleEdit(todo)}>
                  <EditIcon />
                </IconButton>
                <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(todo.id)}>
                  <DeleteIcon />
                </IconButton>
              </div>
            </>
          )}
        </ListItem>
      ))}
    </List>
  );
};

export default Todo;
