import React, { Component } from "react"

import { push } from "react-router-redux"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import API from "./services/api"

import { setProfileDetails } from "./actions/myProfile-actions"

class Navigator extends Component {
  async componentWillMount() {
    let token = localStorage.getItem("com.attender.pty.ltd.token")
    if (token) {
      API.REQUEST_TOKEN = token
      await this.getProfile()
    } else {
      this.props.goLogin()
    }
  }

  getProfile = async () => {
    let profile = await API.get("auth/current")
    if (profile) {
      if (profile.status) {
        localStorage.setItem(
          "com.attender.pty.ltd.profile",
          JSON.stringify(profile.data)
        )
        console.log(profile.data)
        this.props.onSetProfileDetails(profile.data)
        if (profile.data.verified) {
          if (profile.data.hasProfile) {
            if (profile.data.isStaff) {
              this.props.goSearchVenues()
            } else {
              this.props.goFindStaff()
            }
          } else {
            this.props.goLookingFor()
          }
        } else {
          this.props.goSignUpSuccess()
        }
      } else {
        this.props.goLogin()
      }
    } else {
      this.props.goLogin()
    }
  }

  render() {
    return (
      <div className="container xem center navigator">
        <img alt="" src={require("./assets/icons/loading.svg")} />
      </div>
    )
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      goLogin: () => push("/login"),
      goRegister: () => push("/register"),
      goLookingFor: () => push("/looking-for"),
      goEmployerSetup: () => push("/employer"),
      goStaffSetup: () => push("/profile-setup"),
      goVenueSetup: () => push("/venue-setup"),
      goOrganiserSetup: () => push("/organiser-setup"),
      goMessages: () => push("/messages"),
      goSearchVenues: () => push("/search-venues"),
      goFindStaff: () => push("/find-staff"),
      goStaffs: () => push("/staffs"),
      goSignUpSuccess: () => push("/success"),
      goSettings: () => push("/settings"),
      goConfirm: () => push("/confirm/token"),
      goSchedules: () => push("/schedules"),
      goCalendar: () => push("/calendar"),

      onSetProfileDetails: setProfileDetails
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(Navigator)
