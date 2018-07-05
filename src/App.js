import React, { Component } from "react"
import { Route, Switch, Redirect } from "react-router-dom"
import Navigator from "./navigator"

import SignSuccess from "./components/auth/signSuccess"
import Login from "./components/auth/login"
import AccountConfirmed from "./components/auth/accountConfirmed"
import LookingFor from "./components/lookingFor/lookingFor"
import StaffProfileSetup from "./components/staff/profileSetup"
import SearchVenues from "./components/staff/searchVenues"
import Earnings from "./components/staff/earnings"
import VenueSetup from "./components/venue/venueSetup"
import employerSetup from "./components/lookingFor/employerSetup"
import OrganiserSetup from "./components/organiser/organiserSetup"

//import EmployerMessage from "./components/messages/employer"
import Messages from "./components/Messages/messages"

import FindStaff from "./components/venue/findStaff"
import MyStaff from "./components/venue/myStaff"
import Schedule from "./components/venue/schedule"
import Calendar from "./components/Calendar/Calendar"
import Registration from "./components/auth/registration"
import SettingsOld from "./components/settings-old/index"
import Settings from "./components/settings/Settings"
import SubscriptionSettings from "./components/SubscriptionSettings/SubscriptionSettings"
import SubscriptionOffer from "./components/SubscriptionOffer/SubscriptionOffer"
import NotFound from "./components/NotFound/NotFound"
import { loadState } from "./localStorage"
import TermsAndCondition from "./components/TermsAndCondition/TermsAndCondition"
import TermsAndConditionAttendants from "./components/TermsAndCondition/TermsAndConditionAttendants"
import TermsAndConditionBusiness from "./components/TermsAndCondition/TermsAndConditionBusiness"
import VenueProfile from "./components/VenueProfile/VenueProfile"
import PrivacyPolicy from "./components/PrivacyPolicy/PrivacyPolicy"
import StaffProfile from "./components/StaffProfile/StaffProfile"

// Venue/Event Organizer Routes
import StaffGroupSchedule from "./components/StaffGroupSchedule/StaffGroupSchedule"

import "./style.min.css"

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
          <Route exact path="/settings-old" component={SettingsOld} />
          <Route exact path="/schedules" component={Schedule} />
          <Route exact path="/calendar" component={Calendar} />
          <Route exact path="/messages/:staff?" component={Messages} />
          {this.renderSubscriptionSettingsPage()}
          <Route
            exact
            path="/terms-and-condition"
            component={TermsAndCondition}
          />
          <Route
            exact
            path="/terms-and-condition-attendants"
            component={TermsAndConditionAttendants}
          />
          <Route
            exact
            path="/terms-and-condition-business"
            component={TermsAndConditionBusiness}
          />
          <Route exact path="/privacy-policy" component={PrivacyPolicy} />
          <Route
            exact
            path="/venue/profile/:venue_id"
            component={VenueProfile}
          />
          <Route
            exact
            path="/staff/profile/:staff_id"
            component={StaffProfile}
          />
          <Route exact path="/staffs-schedule" component={StaffGroupSchedule} />
        </main>
      </div>
    )
  }
}

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1)
}
export default App
