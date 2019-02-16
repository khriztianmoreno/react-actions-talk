/**
 * @author Cristian Moreno <khriztianmoreno@gmail.com>
 */

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

export const updateCurrent = val => ({ type: UPDATE_CURRENT, payload: val })
export const loadTodos = todos => ({ type: LOAD_TODOS, payload: todos })
export const addTodo = todo => ({ type: ADD_TODO, payload: todo })
export const replaceTodo = todo => ({ type: REPLACE_TODO, payload: todo })
export const removeTodo = id => ({ type: REMOVE_TODO, payload: id })
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
