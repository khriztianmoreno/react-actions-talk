/**
 * @author Cristian Moreno <khriztianmoreno@gmail.com>
 */

import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import loading from '../loading.gif'

const Loader = ({ isLoading }) => (
  <span className="loader">
    {isLoading ? <img src={loading} alt="loading content" /> : null}
  </span>
)

/**
 * Typechecking props
 */
Loader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
}

/**
 * @description simple object, which will be combined in the props of the component
 * @param {*} state The store state.
 */
const mapStateToProps = state => ({
  isLoading: state.isLoading,
})

export default connect(mapStateToProps)(Loader)
