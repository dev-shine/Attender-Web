import React from "react"
import { Link } from "react-router-dom"
import "./QuickLinks.css"

export default class QuickLinks extends React.Component {
  constructor(props) {
    super(props)
    this.Stay = this.Stay.bind(this)
    this.Out = this.Out.bind(this)
    this.profile = this.props.profile
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
        <Link to="/staff-schedule">Weekly Schedule</Link>
        {this.profile &&
          (this.profile.isVenue || this.profile.isEmployer) && (
            <Link to="/subscription-settings">Subscription</Link>
          )}
        <Link to="/settings">Settings</Link>
      </div>
    )
  }
}
