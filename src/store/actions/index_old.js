/**
 * @author Cristian Moreno <khriztianmoreno@gmail.com>
 */
import { createAction } from 'redux-actions'

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

export const updateCurrent = createAction(UPDATE_CURRENT)
export const loadTodos = createAction(LOAD_TODOS)
export const addTodo = createAction(ADD_TODO)
export const replaceTodo = createAction(REPLACE_TODO)
export const removeTodo = createAction(REMOVE_TODO)
export const showLoader = () => ({ type: SHOW_LOADER, payload: true })
export const hideLoader = () => ({ type: HIDE_LOADER, payload: false })

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
