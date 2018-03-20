import React, { Component } from "react"
import NavBar from "../layouts/NavBar"
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
      step: 1,
      isLoading: false,
      isChangingEmail: false,
      emailChangeMessage: "",
      oldEmail: "",
      newEmail: ""
    }
  }

  componentWillMount = async () => {
    API.initRequest()
  }

  onChangeInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
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

  handleChangeEmailClick = () => {
    this.setState({ isChangingEmail: !this.state.isChangingEmail })
  }

  renderGeneral = () => {
    return (
      <div className="settings-container">
        <div className="setting-head">General Settings</div>
        <div className="setting-menu">
          <div className="setting-menu-item">
            <div className="row">
              <div className="col-sm-3">Edit Profile</div>
              <div className="col-sm-9">Edit Profile Information</div>
            </div>
          </div>
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
                You can change your email address to new one
                <form onSubmit={this.onSaveEmailChange}>
                  <label className="label-style control-label">Old Email</label>
                  <input
                    onChange={this.onChangeInput}
                    type="oldEmail"
                    name="oldEmail"
                    className="form-control"
                  />
                  <label className="label-style control-label">New Email</label>
                  <input
                    onChange={this.onChangeInput}
                    type="newEmail"
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
              <div className="col-sm-9">Change your login password</div>
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
            <span>Delete Account</span>
          </div>
          <div className="row">
            <div className="col-sm-12">
              Delete your account will disable your profile and remove your
              listed events and hired staff
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
