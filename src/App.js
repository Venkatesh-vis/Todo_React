import React from 'react';
import AddTodo from './components/AddTodo';
import { Provider } from 'react-redux';
import store from './redux/store';
import { Container, Typography } from '@mui/material';
import Todo from './components/todo';

const App = () => {
  return (
    <Provider store={store}>
      <Container>
        <Typography variant="h3" align="center" gutterBottom>
          Todo List
        </Typography>
        <AddTodo />
        <Todo />
      </Container>
    </Provider>
  );
};

export default App;
