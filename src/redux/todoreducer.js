import {
  FETCH_TODOS,
  ADD_TODO,
  DELETE_TODO,
  TOGGLE_TODO,
  UPDATE_TODO,
} from "./actions";

const initialState = {
  todos: [],
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TODOS:
      return { ...state, todos: action.payload };
    case ADD_TODO:
      return {
        ...state,
        todos: [action.payload, ...state.todos], 
      };
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    case TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };
    case UPDATE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, todo: action.payload.updatedTodo }
            : todo
        ),
      };
    default:
      return state;
  }
};

export default todoReducer;
