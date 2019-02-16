/**
 * @author Cristian Moreno <khriztianmoreno@gmail.com>
 */
import { handleAction } from 'redux-actions'
import reduceReducers from 'reduce-reducers'

import {
  UPDATE_CURRENT,
  LOAD_TODOS,
  ADD_TODO,
  REPLACE_TODO,
  REMOVE_TODO,
  SHOW_LOADER,
  HIDE_LOADER,
} from '../types'

const initState = {
  todos: [],
  currentTodo: '',
  isLoading: true,
  message: '',
}

const addTodoReducer = handleAction(
  [ADD_TODO],
  (state, action) => (
    {
      ...state,
      currentTodo: '',
      todos: state.todos.concat(action.payload),
    }
  ),
  initState,
)

const loadTodosReducer = handleAction(
  [LOAD_TODOS],
  (state, action) => ({ ...state, todos: action.payload }),
  initState,
)

const updateCurrentReducer = handleAction(
  [UPDATE_CURRENT],
  (state, action) => ({ ...state, currentTodo: action.payload }),
  initState,
)

const replaceTodoReducer = handleAction(
  [REPLACE_TODO],
  (state, action) => (
    {
      ...state,
      todos: state.todos.map(t => (t.id === action.payload.id ? action.payload : t)),
    }
  ),
  initState,
)

const removeTodoReducer = handleAction(
  [REMOVE_TODO],
  (state, action) => (
    {
      ...state,
      todos: state.todos.filter(t => t.id !== action.payload),
    }
  ),
  initState,
)

const showLoaderReducer = handleAction(
  [SHOW_LOADER],
  (state, action) => ({ ...state, isLoading: action.payload }),
  initState,
)

const hideLoaderReducer = handleAction(
  [HIDE_LOADER],
  (state, action) => ({ ...state, isLoading: action.payload }),
  initState,
)

export default reduceReducers(
  addTodoReducer,
  loadTodosReducer,
  updateCurrentReducer,
  replaceTodoReducer,
  removeTodoReducer,
  showLoaderReducer,
  hideLoaderReducer,
)
