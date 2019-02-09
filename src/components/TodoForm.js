/**
 * @author Cristian Moreno <khriztianmoreno@gmail.com>
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateCurrent, saveTodo } from '../store/actions'

class TodoForm extends Component {
  handleInputChange = (evt) => {
    const val = evt.target.value
    this.props.updateCurrent(val)
  }

  handleSubmit = (evt) => {
    evt.preventDefault()
    this.props.saveTodo(this.props.currentTodo)
  }

  render() {
    const { currentTodo } = this.props
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text"
          onChange={this.handleInputChange}
          value={currentTodo}/>
      </form>
    )
  }
}

/**
 * @description simple object, which will be combined in the props of the component
 * @param {*} state The store state.
 */
const mapStateToProps = state => ({
  currentTodo: state.currentTodo,
})

const mapDispatchToProps = {
  updateCurrent,
  saveTodo
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoForm)
