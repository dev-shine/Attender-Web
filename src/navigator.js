import React, { Component } from "react"

import { push } from "react-router-redux"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import API from "./services/api"
import { setProfileDetails } from "./actions/myProfile-actions"
import { setMyStaffs } from "./actions/myStaffs-actions"
import { loadState } from "./localStorage"

class Navigator extends Component {
  state = {
    profile: {}
  }
  async componentWillMount() {
    let token = localStorage.getItem("com.attender.pty.ltd.token")
    if (token) {
      API.REQUEST_TOKEN = token
      await this.getProfile()
      await this.getStaffs()
    } else {
      this.props.goLogin()
    }
  }

  getStaffs = async () => {
    if (!this.state.profile.data.isStaff) {
      API.get("my-staffs?withTrial=true").then(res => {
        if (res && res.status) {
          const allStaff = []
          let staffMetas = {}
          Object.keys(res.staffs).forEach(position => {
            res.staffs[position].forEach(as => {
              if (
                allStaff.length === 0 ||
                !allStaff.find(asf => asf.staff._id === as.staff._id)
              ) {
                allStaff.push(as)
                staffMetas[`staff-${as._id}`] = as
              }
            })
          })
          this.props.onSetStaffs(allStaff)

          if (this.state.profile.data.isVenue) {
            this.props.goVenueProfile()
          } else {
            this.props.goFindStaff()
          }
        }
      })
    }
  }

  getProfile = async () => {
    let profile = await API.get("auth/current")
    let isSubscribed = false
    this.setState({ profile })

    if (profile) {
      if (profile.status) {
        // if (!profile.data.isStaff) {
        // isSubscribed = await API.get("subscription/check")
        // }
        profile.data = Object.assign({}, profile.data, {
          // isSubscribed: isSubscribed.status
          isSubscribed: false
        })
        this.props.onSetProfileDetails(profile.data)

        if (profile.data.verified) {
          if (profile.data.hasProfile) {
            if (profile.data.isStaff) {
              this.props.goSearchVenues()
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

const persistedState = loadState()
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
      goVenueProfile: () => push("/my-profile"),
      onSetProfileDetails: setProfileDetails,
      onSetStaffs: setMyStaffs
    },
    dispatch,
    persistedState
  )

export default connect(mapStateToProps, mapDispatchToProps)(Navigator)
