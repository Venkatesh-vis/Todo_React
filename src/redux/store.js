import { combineReducers, legacy_createStore } from 'redux';
import todoReducer from './todoreducer';

const rootReducer = combineReducers({
  todoState: todoReducer,
});

const store = legacy_createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
