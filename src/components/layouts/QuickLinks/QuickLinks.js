import React from "react"
import { Link } from "react-router-dom"
import "./QuickLinks.css"

export default class QuickLinks extends React.Component {
  constructor(props) {
    super(props)
    this.Stay = this.Stay.bind(this)
    this.Out = this.Out.bind(this)
  }
  Stay() {
    this.props.onMouseOver()
  }
  Out() {
    this.props.onMouseOut()
  }
  render() {
    return (
      <div
        className="component nav-dropdown QuickLinks"
        onMouseOver={this.Stay}
        onMouseOut={this.Out}
      >
        <Link to="/">Weekly Schedule</Link>
        <Link to="/subscription-settings">Subscription</Link>
        <Link to="/">Settings</Link>
      </div>
    )
  }
}
