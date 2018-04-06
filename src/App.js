import React, { Component } from "react"
import { Route } from "react-router-dom"
import Navigator from "./navigator"
import SignSuccess from "./auth/signSuccess"
import Login from "./auth/login"
import AccountConfirmed from "./auth/accountConfirmed"
import LookingFor from "./lookingFor/lookingFor"
import StaffProfileSetup from "./staff/profileSetup"
import SearchVenues from "./staff/searchVenues"
import VenueSetup from "./venue/venueSetup"
import employerSetup from "./lookingFor/employerSetup"
import OrganiserSetup from "./organiser/organiserSetup"
import EmployerMessage from "./messages/employer"
import FindStaff from "./venue/findStaff"
import MyStaff from "./venue/myStaff"
import Schedule from "./venue/schedule"
import Calendar from "./venue/calendar"
import Registration from "./auth/registration"
import Settings from "./settings/index"
import SubscribePopUp from "./layouts/SubscribePopUp/SubscribePopUp"

import store from "./store"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"

import { setSubscribePopUp } from "./actions/myProfile-actions"

class App extends Component {
  constructor(props) {
    super(props)
    this.props.onSetSubscribePopUp(true)
    this.closeSubscribePopup = this.closeSubscribePopup.bind(this)
  }
  closeSubscribePopup() {
    this.props.onSetSubscribePopUp(false)
  }
  render() {
    return (
      <div>
        <main>
          <Route exact path="/" component={Navigator} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Registration} />
          <Route exact path="/looking-for" component={LookingFor} />
          <Route exact path="/profile-setup" component={StaffProfileSetup} />
          <Route exact path="/search-venues" component={SearchVenues} />
          <Route exact path="/venue-setup" component={VenueSetup} />
          <Route exact path="/employer" component={employerSetup} />
          <Route exact path="/organiser-setup" component={OrganiserSetup} />
          <Route exact path="/find-staff" component={FindStaff} />
          <Route exact path="/staffs" component={MyStaff} />
          <Route exact path="/success" component={SignSuccess} />
          <Route
            exact
            path="/confirm/:verification/:token"
            component={AccountConfirmed}
          />
          <Route exact path="/settings" component={Settings} />
          <Route exact path="/schedules" component={Schedule} />
          <Route exact path="/calendar" component={Calendar} />
          <Route exact path="/messages/:staff?" component={EmployerMessage} />
          {this.props.myProfile.showPopup ? (
            <SubscribePopUp close={this.closeSubscribePopup} />
          ) : null}
        </main>
      </div>
    )
  }
}

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1)
}

const mapStateToProps = state => {
  return state
}
const mapActionsToProps = {
  onSetSubscribePopUp: setSubscribePopUp
}

export default connect(mapStateToProps, mapActionsToProps)(App)
