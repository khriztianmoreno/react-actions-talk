/**
 * @author Cristian Moreno <khriztianmoreno@gmail.com>
 */

import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const Message = ({ message }) => (
  message
    ? <span className="message">{message}</span>
    : null
)

/**
 * Typechecking props
 */
Message.propTypes = {
  message: PropTypes.string.isRequired,
}

/**
 * @description simple object, which will be combined in the props of the component
 * @param {*} state The store state.
 */
const mapStateToProps = state => ({
  message: state.message,
})

export default connect(mapStateToProps)(Message)
