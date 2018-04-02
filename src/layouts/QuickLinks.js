import React from "react"
import { Link } from "react-router-dom"

export default class QuickLinks extends React.Component {
  render() {
    return (
      <div className="component QuickLinks">
        <Link to="/">Weekly Schedule</Link>
        <Link to="/">Subscription</Link>
        <Link to="/">Settings</Link>
      </div>
    )
  }
}
