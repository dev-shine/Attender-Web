import React from "react"
import { Link } from "react-router-dom"
import API from "./../../../services/api"
import "./Notification.css"
var moment = require("moment")

export default class Notification extends React.Component {
  constructor(props) {
    super(props)
    this.Stay = this.Stay.bind(this)
    this.Out = this.Out.bind(this)
  }
  state = {
    notifications: {}
  }
  Stay() {
    this.props.onMouseOver()
  }
  Out() {
    this.props.onMouseOut()
  }
  componentDidMount = () => {
    this.fetch()
  }

  fetch() {
    if (this.props.profile.isStaff) {
      // do in the future
      // API.get('staff-notifications').then((res) => {
      //     console.log('staff-notif', res);
      //     this.setState({notifications: res.notifications})
      // })
    } else {
      API.get("venue/notifications").then(res => {
        this.setState({ notifications: res.notifications })
      })
    }
  }
  render() {
    let DOM = ""
    if (this.state.notifications.length > 0) {
      DOM = this.state.notifications.map((res, index) => {
        return (
          <li>
            <strong>{res.staffId.fullname}</strong> is interested in your venue.<br />
            <small>{moment(res.createdAt).fromNow()}</small>
          </li>
        )
      })
    } else {
      DOM = <li>There is no notifications</li>
    }

    return (
      <div
        className="component nav-dropdown Notification"
        onMouseOver={this.Stay}
        onMouseOut={this.Out}
      >
        <ul>{DOM}</ul>
      </div>
    )
  }
}
