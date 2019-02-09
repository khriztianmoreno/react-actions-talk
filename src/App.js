import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import PropTypes from 'prop-types'

import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'
import Message from './components/Message'
import Footer from './components/Footer'
import Loader from './components/Loader'

import logo from './logo.svg';
import './App.css';

const RenderView = ({ match }) => <TodoList filter={match.params.filter} />

const App = () => (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
    </header>
    <BrowserRouter>
      <div className="Todo-App">
        <Message />
        <Loader />
        <TodoForm />
        <Route path="/:filter?" render={RenderView} />
        <Footer />
      </div>
    </BrowserRouter>
  </div>
)

/**
 * Typechecking props
 */
RenderView.propTypes = {
  match: PropTypes.shape.isRequired,
}

export default App;
