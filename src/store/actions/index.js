/**
 * @author Cristian Moreno <khriztianmoreno@gmail.com>
 */
import { createActions } from 'redux-actions'

import {
  getTodos,
  createTodo,
  updateTodo,
  destroyTodo,
} from '../../lib/todoServices'

import {
  UPDATE_CURRENT,
  LOAD_TODOS,
  ADD_TODO,
  REPLACE_TODO,
  REMOVE_TODO,
  SHOW_LOADER,
  HIDE_LOADER,
} from '../types'

const fixCase = str => `${str.slice(0, 1).toUpperCase()}${str.slice(1).toLowerCase()}`

export const {
  updateCurrent,
  loadTodos,
  addTodo,
  replaceTodo,
  removeTodo,
  showLoader,
  hideLoader,
} = createActions(
  {
    [UPDATE_CURRENT]: fixCase,
    [SHOW_LOADER]: () => true,
    [HIDE_LOADER]: () => false,
  },
  [LOAD_TODOS].toString(),
  [ADD_TODO].toString(),
  [REPLACE_TODO].toString(),
  [REMOVE_TODO].toString(),
)

export const fetchTodos = () => (dispatch) => {
  dispatch(showLoader())

  getTodos().then((todos) => {
    dispatch(loadTodos(todos))
    dispatch(hideLoader())
  })
}

export const saveTodo = name => (dispatch) => {
  dispatch(showLoader())

  createTodo(name).then((res) => {
    dispatch(addTodo(res))
    dispatch(hideLoader())
  })
}

export const toggleTodo = id => (dispatch, getState) => {
  dispatch(showLoader())
  const { todos } = getState()
  const todo = todos.find(t => t.id === id)
  const toggled = { ...todo, isComplete: !todo.isComplete }

  updateTodo(toggled).then((res) => {
    dispatch(replaceTodo(res))
    dispatch(hideLoader())
  })
}

export const deleteTodo = id => (dispatch) => {
  dispatch(showLoader())

  destroyTodo(id).then(() => {
    dispatch(removeTodo(id))
    dispatch(hideLoader())
  })
}

export const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'active':
      return todos.filter(t => !t.isComplete)
    case 'completed':
      return todos.filter(t => t.isComplete)
    default:
      return todos
  }
}
