import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../redux/actions';
import { TextField, Button, Box } from '@mui/material';

const AddTodo = () => {
  const [newTodo, setNewTodo] = useState('');
  const dispatch = useDispatch();

  const handleAddTodo = () => {
    if (newTodo.trim() === '') {
      return; 
    }

    const todo = {
      id: Math.floor(Math.random() * 1000),
      todo: newTodo,
      completed: false,
      userId: 1, // Assuming userId is 1 for simplicity
    };

    dispatch(addTodo(todo));
    setNewTodo(''); // Clear the input field after adding the todo
  };

  return (
    <Box
      component="form"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '10px',
        margin: '20px auto',
        maxWidth: '500px',
      }}
    >
      <TextField
        label="New Todo"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        sx={{ flexGrow: 1 }}
      />
      <Button style={{height:'50px'}} variant="contained" color="primary" onClick={handleAddTodo}>
        Add Todo
      </Button>
    </Box>
  );
};

export default AddTodo;
