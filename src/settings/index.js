import React, { Component } from 'react'
import NavBar from '../layouts/NavBar'
import '.././styles/global.css'
import '.././styles/style.css'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'


class Settings extends Component {

  constructor (props) {
    super(props)
    this.state = {
      step: 1,
      isLoading: false
    }
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
              <div className="col-sm-9">You can change your email address to new one</div>
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
              <div className="col-sm-9">You can add multiple bank by clicking add bank account.</div>
            </div>
          </div>
          <div className="setting-menu-item">
            <div className="row">
              <div className="col-sm-3">Payment Method</div>
              <div className="col-sm-9">You can select which primary bank account will be used when paying staff.</div>
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
            <div className="col-sm-12">Delete your account will disable your profile and remove your listed events and hired staff</div>
          </div>
        </div>
      </div>
    )
  }

  renderPrivacyTaC = () => {
    return (
      <div className="settings-footer">
        <p>Privacy Policy | Terms and Agreement</p>
        <p>Attender @ {(new Date()).getFullYear()}</p>
      </div>
    )
  }

  render() {
    return (
      <div>
        <NavBar/>
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



const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings)
