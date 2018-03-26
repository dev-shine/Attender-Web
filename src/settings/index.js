import React, { Component } from "react"
import NavBar from "../layouts/NavBar"
import VenueEdit from "./profile/venueEdit"
import StaffEdit from "./profile/staffEdit"
import OrganiserEdit from "./profile/organiserEdit"
import ".././styles/global.css"
import ".././styles/style.css"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import API from "./../services/api"
import "./settings.css"

class Settings extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isChangingEmail: false,
      isChangingPassword: false,
      isDeletingAccount: false,
      emailChangeMessage: "",
      passwordChangeMessage: "",
      deleteAccountMessage: "",
      oldEmail: "",
      newEmail: "",
      newPassword: "",
      newPasswordConfirm: "",
      passwordVerification: ""
    }
  }

  componentDidMount = async () => {
    API.initRequest()
    let profile = await API.getProfile()
    this.setState({ profile }, () => {
      console.log("profilepassed", this.state.profile)
    })
  }

  onChangeInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSelectOption = (key, obj) => {
    let _obj = this.state[obj]
    _obj[key].on = !_obj[key].on
    this.setState(prevState => ({ [obj]: _obj }))
  }

  onSaveEmailChange = event => {
    event.preventDefault()

    const body = {
      oldEmail: this.state.oldEmail,
      newEmail: this.state.newEmail
    }

    // Should validate if it is a valid email and not empty
    console.log("the body", body)

    API.post("user/profile/change-email", body).then(res => {
      if (!res.status) {
        this.setState({ emailChangeMessage: res.message })
      }

      if (res.status) {
        this.setState({ emailChangeMessage: res.message })
      }
    })
  }

  onSavePasswordChange = event => {
    event.preventDefault()

    const body = {
      newPassword: this.state.newPassword,
      newPasswordConfirm: this.state.newPasswordConfirm
    }

    console.log("the body", body)

    API.post("user/profile/change-password", body).then(res => {
      if (!res.status) {
        this.setState({ passwordChangeMessage: res.message })
      }

      if (res.status) {
        this.setState({ passwordChangeMessage: res.message })
      }
    })
  }

  onDeleteAccount = event => {
    event.preventDefault()

    const body = {
      password: this.state.passwordVerification
    }

    API.post("user/profile/deactivate-user", body).then(res => {
      this.setState({ deleteAccountMessage: res.message })
    })
  }

  handleChangeEmailClick = () => {
    this.setState({ isChangingEmail: !this.state.isChangingEmail })
  }

  handleChangePasswordClick = () => {
    this.setState({ isChangingPassword: !this.state.isChangingPassword })
  }

  handleDeleteAccount = () => {
    this.setState({ isDeletingAccount: !this.state.isDeletingAccount })
  }

  renderGeneral = () => {
    return (
      <div className="settings-container">
        <div className="setting-head">General Settings</div>
        <div className="setting-menu">
          <div className="setting-menu-item">
            <div className="row">
              <div className="col-sm-3">Change Email</div>
              {!this.state.isChangingEmail && (
                <div className="col-sm-9">
                  <button onClick={this.handleChangeEmailClick.bind(this)}>
                    Edit
                  </button>
                </div>
              )}
              <div
                className={`col-sm-9 accordion ${this.state.isChangingEmail &&
                  "open"}`}
              >
                <form onSubmit={this.onSaveEmailChange}>
                  <label className="label-style control-label">Old Email</label>
                  <input
                    onChange={this.onChangeInput}
                    type="email"
                    name="oldEmail"
                    className="form-control"
                  />
                  <label className="label-style control-label">New Email</label>
                  <input
                    onChange={this.onChangeInput}
                    type="email"
                    name="newEmail"
                    className="form-control"
                  />
                  <p>{this.state.emailChangeMessage}</p>
                  <button type="submit" onClick={this.onSaveEmailChange}>
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={this.handleChangeEmailClick.bind(this)}
                  >
                    Cancel
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="setting-menu-item">
            <div className="row">
              <div className="col-sm-3">Change Password</div>
              {!this.state.isChangingPassword && (
                <div className="col-sm-9">
                  <button onClick={this.handleChangePasswordClick.bind(this)}>
                    Edit
                  </button>
                </div>
              )}
              <div
                className={`col-sm-9 accordion ${this.state
                  .isChangingPassword && "open"}`}
              >
                <form onSubmit={this.onSavePasswordChange}>
                  <label className="label-style control-label">
                    New Password
                  </label>
                  <input
                    onChange={this.onChangeInput}
                    type="password"
                    name="newPassword"
                    className="form-control"
                  />
                  <label className="label-style control-label">
                    Confirm New Password
                  </label>
                  <input
                    onChange={this.onChangeInput}
                    type="password"
                    name="newPasswordConfirm"
                    className="form-control"
                  />
                  <p>{this.state.passwordChangeMessage}</p>
                  <button type="submit" onClick={this.onSavePasswordChange}>
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={this.handleChangePasswordClick.bind(this)}
                  >
                    Cancel
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderPayment = () => {
    return (
      <div className="settings-container xem">
        <div className="setting-head">Payment Settings</div>
        <div className="setting-menu">
          <div className="setting-menu-item">
            <div className="row">
              <div className="col-sm-3">Add Bank Accounts</div>
              <div className="col-sm-9">
                You can add multiple bank by clicking add bank account.
              </div>
            </div>
          </div>
          <div className="setting-menu-item">
            <div className="row">
              <div className="col-sm-3">Payment Method</div>
              <div className="col-sm-9">
                You can select which primary bank account will be used when
                paying staff.
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderAccount = () => {
    return (
      <div className="settings-container xxem">
        <div className="setting-head">Account Settings</div>
        <div className="setting-menu">
          <div className="setting-menu-item">
            <span onClick={this.handleDeleteAccount}>Delete Account</span>
          </div>
          <div className="row">
            <div
              className={`col-sm-12 accordion ${this.state.isDeletingAccount &&
                "open"}`}
            >
              <form onSubmit={this.onDeleteAccount}>
                <label className="label-style control-label">Password</label>
                <input
                  onChange={this.onChangeInput}
                  type="password"
                  name="passwordVerification"
                  className="form-control"
                />
                <p>{this.state.deleteAccountMessage}</p>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderPrivacyTaC = () => {
    return (
      <div className="settings-footer">
        <p>Privacy Policy | Terms and Agreement</p>
        <p>Attender @ {new Date().getFullYear()}</p>
      </div>
    )
  }

  render() {
    return (
      <div>
        <NavBar />
        <div className="container xem">
          <p className="settings-title">SETTINGS</p>
          {this.renderGeneral()}
          {this.state.profile &&
            this.state.profile.isStaff && (
              <StaffEdit profile={this.state.profile.staffId} />
            )}
          {this.state.profile &&
            this.state.profile.isVenue && (
              <VenueEdit profile={this.state.profile.employer} />
            )}
          {this.state.profile &&
            this.state.profile.isOrganizer && (
              <OrganiserEdit profile={this.state.profile.employer} />
            )}
          {this.renderPayment()}
          {this.renderAccount()}
          {this.renderPrivacyTaC()}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
