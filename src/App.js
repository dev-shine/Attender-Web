import React, { Component } from "react"
import { Route, Switch, Redirect } from "react-router-dom"
import Navigator from "./navigator"
import SignSuccess from "./auth/signSuccess"
import Login from "./auth/login"
import AccountConfirmed from "./auth/accountConfirmed"
import LookingFor from "./lookingFor/lookingFor"
import StaffProfileSetup from "./staff/profileSetup"
import SearchVenues from "./staff/searchVenues"
import Earnings from "./staff/earnings"
import VenueSetup from "./venue/venueSetup"
import employerSetup from "./lookingFor/employerSetup"
import OrganiserSetup from "./organiser/organiserSetup"
import EmployerMessage from "./messages/employer"
import FindStaff from "./venue/findStaff"
import MyStaff from "./venue/myStaff"
import Schedule from "./venue/schedule"
import Calendar from "./venue/calendar"
import Registration from "./auth/registration"
// import Settings from "./settings-old/index"
import Settings from "./settings/Settings"
import SubscriptionSettings from "./SubscriptionSettings/SubscriptionSettings"
import SubscriptionOffer from "./SubscriptionOffer/SubscriptionOffer"
import NotFound from "./NotFound/NotFound"
import { loadState } from "./localStorage"
import TermsAndCondition from "./TermsAndCondition/TermsAndCondition"
import VenueProfile from "./VenueProfile/VenueProfile"

class App extends Component {
  constructor(props) {
    super(props)
  }
  componentWillUpdate() {}
  renderSubscriptionSettingsPage() {
    const profile = loadState("com.attender.pty.ltd.profile")
    if (profile !== undefined) {
      if (profile.isSubscribed) {
        return (
          <Route
            exact
            path="/subscription-settings"
            component={SubscriptionSettings}
          />
        )
      } else {
        return (
          <Route
            exact
            path="/subscription-settings"
            component={SubscriptionOffer}
          />
        )
      }
    }
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
          <Route exact path="/earnings" component={Earnings} />
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
          {this.renderSubscriptionSettingsPage()}
          <Route
            exact
            path="/terms-and-condition"
            component={TermsAndCondition}
          />
          <Route
            exact
            path="/venue/profile/:venue_id"
            component={VenueProfile}
          />
        </main>
      </div>
    )
  }
}

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1)
}
export default App
