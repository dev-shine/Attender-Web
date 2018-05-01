import React from "react"
import { Link } from "react-router-dom"
import "./Notification.css"

export default class Notification extends React.Component {
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
        className="component nav-dropdown Notification"
        onMouseOver={this.Stay}
        onMouseOut={this.Out}
      >
        <ul>
          <li>Notification 1</li>
          <li>Notification 2</li>
          <li>Notification 3</li>
          <li>Notification 4</li>
        </ul>
      </div>
    )
  }
}
