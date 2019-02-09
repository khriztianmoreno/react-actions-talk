/**
 * @author Cristian Moreno <khriztianmoreno@gmail.com>
 */

import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => (
  <div>
    <Link to="/">All</Link>
    <Link to="/active">Active</Link>
    <Link to="/completed">Completed</Link>
  </div>
)

export default Footer
