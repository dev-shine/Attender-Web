import React, { Component } from "react"
import { Link } from "react-router-dom"
import { push } from "react-router-redux"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import API from "./../../services/api"
import QuickLinks from "./QuickLinks/QuickLinks"
import Notification from "./Notification/Notification"
import _ from "lodash"
import "./NavBar.css"

class NavBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sideNavOpen: true,
      profile: {},
      showQuickLinks: false,
      showNotification: false
    }
    this.closeQuickLinks = this.closeQuickLinks.bind(this)
    this.openQuickLinks = this.openQuickLinks.bind(this)
    this.closeNotification = this.closeNotification.bind(this)
    this.openNotification = this.openNotification.bind(this)
    this.QLtimer
    this.NotiTimer
  }
  componentWillMount() {
    API.initRequest()
  }
  async componentDidMount() {
    let profile = await API.getProfile()
    console.log(profile)
    this.setState({ profile })
  }
  onLogout = () => {
    API.logout()
    this.props.goMain()
  }

  openSideNav = () => {
    if (this.state.profile.hasProfile) {
      this.setState(prevState => ({ sideNavOpen: !prevState.sideNavOpen }))
    }
  }

  closeQuickLinks() {
    this.QLtimer = setTimeout(() => {
      this.setState({ showQuickLinks: false })
    }, 1000)
  }
  openQuickLinks() {
    clearTimeout(this.QLtimer)
    this.setState({ showQuickLinks: true })
  }

  closeNotification() {
    this.NotiTimer = setTimeout(() => {
      this.setState({ showNotification: false })
    }, 1000)
  }
  openNotification() {
    clearTimeout(this.NotiTimer)
    this.setState({ showNotification: true })
  }
  renderNotification() {
    return (
      <span>
        <span
          className="toggleQuickLinks fa fa-exclamation-circle"
          onMouseOver={this.openNotification}
          onMouseOut={this.closeNotification}
        />
        {this.state.showNotification ? (
          <Notification
            onMouseOver={this.openNotification}
            onMouseOut={this.closeNotification}
            profile={this.state.profile}
          />
        ) : null}
      </span>
    )
  }

  renderSideMenu = () => {
    return (
      <div
        className="sidemenu"
        style={{ marginLeft: this.state.sideNavOpen ? "0" : "-8em" }}
      >
        <ul className="sidemenu-items list-inline">
          <li>
            <Link to="/messages">
              <div>
                <img
                  alt=""
                  src={require("./../../assets/icons/nav/envelope.png")}
                />
              </div>
              <span>Messages</span>
            </Link>
          </li>
          {this.state.profile &&
            this.state.profile.isStaff && (
              <li>
                <Link to="/search-venues">
                  <div>
                    <img
                      alt=""
                      src={require("./../../assets/icons/nav/venuesEvents.png")}
                    />
                  </div>
                  <span>Venues / Events</span>
                </Link>
              </li>
            )}
          {this.state.profile &&
            this.state.profile.isStaff && (
              <li>
                <Link to="/earnings">
                  <div>
                    <img
                      alt=""
                      src={require("./../../assets/icons/nav/venuesEvents.png")}
                    />
                  </div>
                  <span>Earnings</span>
                </Link>
              </li>
            )}
          {this.state.profile &&
            !this.state.profile.isStaff && (
              <li>
                <Link to="/staffs">
                  <div>
                    <img
                      alt=""
                      src={require("./../../assets/icons/nav/staff.png")}
                    />
                  </div>
                  <span>Staff</span>
                </Link>
              </li>
            )}
          {this.state.profile &&
            !this.state.profile.isStaff && (
              <li>
                <Link to="/staff-schedule">
                  <div>
                    <img
                      alt=""
                      src={require("./../../assets/icons/nav/calendar.png")}
                    />
                  </div>
                  <span>Schedules</span>
                </Link>
              </li>
            )}
          {this.state.profile &&
            !this.state.profile.isStaff && (
              <li>
                <Link to="/find-staff">
                  <div>
                    <img
                      alt=""
                      src={require("./../../assets/icons/nav/browse-jobseeker.png")}
                    />
                  </div>
                  <span>Browse Jobseekers</span>
                </Link>
              </li>
            )}
          <li>
            <Link to="/calendar">
              <div>
                <img
                  alt=""
                  src={require("./../../assets/icons/nav/calendar.png")}
                />
              </div>
              <span>Calendar</span>
            </Link>
          </li>
          <li>
            <Link to="/settings">
              <div>
                <img
                  alt=""
                  src={require("./../../assets/icons/nav/settings.png")}
                />
              </div>
              <span>Settings</span>
            </Link>
          </li>
        </ul>
      </div>
    )
  }

  renderNavBar = () => {
    if (_.isEmpty(this.state.profile)) {
      return false
    }
    let img = "http://via.placeholder.com/150x150"

    let name = this.state.profile.fullname || "Attender User"
    console.log(this.state.profile.employer)
    if (this.props.myProfile.isEmployer) {
      img = this.state.profile.employer.image || img
      name = this.state.profile.employer.name || name
    } else if (this.state.profile.isStaff) {
      const { avatar } = this.state.profile
      img = avatar.includes("undefined") ? img : avatar
      name = this.state.profile.fullname || name
    }
    return (
      <div className="nav nav-default">
        <div className="nav-header">
          <a
            href="javascript:void(0)"
            className="nav-brand"
            onClick={() => this.openSideNav()}
          >
            <img alt="" src={require("./../../assets/logo.png")} />
            &nbsp;&nbsp;Attender
          </a>
          <ul className="nav-menu list-inline">
            <li>
              <a>
                Hello, <strong>{name}!</strong>
              </a>
            </li>
            <li>
              <img alt="" className="profile-thumb" src={img} />
              <span
                className="toggleQuickLinks fa fa-caret-down"
                onMouseOver={this.openQuickLinks}
                onMouseOut={this.closeQuickLinks}
              />
              {this.state.showQuickLinks ? (
                <QuickLinks
                  onMouseOver={this.openQuickLinks}
                  onMouseOut={this.closeQuickLinks}
                  profile={this.state.profile && this.state.profile}
                />
              ) : null}
              {this.renderNotification()}
            </li>
            <li>
              <a>
                Log out&nbsp;&nbsp;&nbsp;
                <img
                  alt=""
                  onClick={() => this.onLogout()}
                  src={require("./../../assets/icons/nav/logout.png")}
                />
              </a>
            </li>
          </ul>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div>
        {this.renderNavBar()}
        {this.renderSideMenu()}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return state
}
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      goMain: () => push("/")
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar)
