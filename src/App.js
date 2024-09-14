import React from "react";
import AddTodo from "./components/AddTodo";
import { Provider } from "react-redux";
import store from "./redux/store";
import Todo from "./components/todo";

const App = () => {
  return (
    <Provider store={store}>
      <h1 style={{ textAlign: "center" }}>TODO LIST</h1>
      <AddTodo />
      <Todo />
    </Provider>
  );
};

export default App;
