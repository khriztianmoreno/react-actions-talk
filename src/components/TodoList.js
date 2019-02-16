/**
 * @author Cristian Moreno <khriztianmoreno@gmail.com>
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import {
  fetchTodos,
  toggleTodo,
  deleteTodo,
  getVisibleTodos,
} from '../store/actions'

const TodoItem = ({
  id,
  name,
  isComplete,
  onToggleTodo,
  onDeleteTodo,
}) => (
  <li>
    <span className="delete-item">
      <button type="submit" onClick={() => onDeleteTodo(id)}>
        X
      </button>
    </span>
    <input
      type="checkbox"
      checked={isComplete}
      onChange={() => onToggleTodo(id)} 
    />
    {name}
  </li>
)

class TodoList extends Component {
  componentDidMount() {
    const { getTodos } = this.props
    getTodos()
  }

  render() {
    const { todos = [], onToggleTodo, onDeleteTodo } = this.props
    
    return (
      <div className="Todo-List">
        <ul>
          {
            todos.map(todo => (
              <TodoItem
                key={todo.id}
                onToggleTodo={onToggleTodo}
                onDeleteTodo={onDeleteTodo}
                {...todo}
              />
            ))
          }
        </ul>
      </div>
    )
  }
}

/**
 * Typechecking props
 */
TodoItem.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  isComplete: PropTypes.bool.isRequired,
  onToggleTodo: PropTypes.func.isRequired,
  onDeleteTodo: PropTypes.func.isRequired,
}

TodoList.defaultProps = {
  todos: {},
}

/**
 * Typechecking props
 */
TodoList.propTypes = {
  todos: PropTypes.arrayOf({
    id: PropTypes.number,
    name: PropTypes.string,
    isComplete: PropTypes.bool,
  }),
  getTodos: PropTypes.func.isRequired,
  onToggleTodo: PropTypes.func.isRequired,
  onDeleteTodo: PropTypes.func.isRequired,
}

/**
 * @description simple object, which will be combined in the props of the component
 * @param {*} state The store state.
 */
const mapStateToProps = (state, ownProps) => ({
  todos: getVisibleTodos(state.todos, ownProps.filter),
})

const mapDispatchToProps = {
  getTodos: fetchTodos,
  onToggleTodo: toggleTodo,
  onDeleteTodo: deleteTodo,
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)
