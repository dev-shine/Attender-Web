import React, { Component } from "react"
import { push } from "react-router-redux"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { Button } from "react-bootstrap"
import "./settings.css"
import NavBar from "../layouts/NavBar"

class Settings extends Component {
  constructor(props) {
    super(props)
    this.closeModal = this.closeModal.bind(this)
  }
  openModal(type) {
    let content = ""
    switch (type) {
      case "DEACTIVATE_ACCOUNT":
        content = (
          <div>
            <p>Are you sure you want to delete your account?</p>
          </div>
        )
        break
    }

    this.setState({ modalContent: content, openModal: true })
  }
  state = {
    openModal: false,
    modalContent: "Hello World"
  }
  closeModal() {
    this.setState({ openModal: false })
  }
  modal() {
    return (
      <div className="a-modal show">
        <div className="a-modal-content">
          <span className="a-close" onClick={this.closeModal}>
            &times;
          </span>
          {this.state.modalContent}
          <div className="a-modal-footer">
            <Button className="btn-primary" onClick={this.unsubscribe}>
              Cancel Subscription
            </Button>
          </div>
        </div>
      </div>
    )
  }
  render() {
    return (
      <div>
        {this.state.openModal ? this.modal() : null}
        <NavBar />
        <div className="container xem">
          <h3>Settings</h3>
          <div className="settings-group">
            <h4>General Settings</h4>
            <ul>
              <li>
                <label className="col-sm-3">Edit Profile</label>
                <span className="col-sm-9">Edit your Profile Information.</span>
                {
                  //<div className="col-sm-9 accordion">Form goes here</div>
                }
              </li>
              <li>
                <label className="col-sm-3">Change Email</label>
                <span className="col-sm-9">
                  You can change your email address to a new one.
                </span>
                {
                  //<div className="col-sm-9 accordion">Form goes here</div>
                }
              </li>
              <li>
                <label className="col-sm-3">Change Password</label>
                <span className="col-sm-9">Change your login password.</span>
                {
                  //<div className="col-sm-9 accordion">Form goes here</div>
                }
              </li>
            </ul>
          </div>
          <div className="settings-group">
            <h4>Payment Settings</h4>
            <ul>
              <li>
                <label className="col-sm-3">Add Bank Accounts</label>
                <span className="col-sm-9">
                  You can add multiple bank account by clicking add bank
                  account.
                </span>
                {
                  //<div className="col-sm-9 accordion">Form goes here</div>
                }
              </li>
              <li>
                <label className="col-sm-3">Payment Method</label>
                <span className="col-sm-9">
                  You can select which primary bank account will be used when
                  paying staff.
                </span>
                {
                  //<div className="col-sm-9 accordion">Form goes here</div>
                }
              </li>
            </ul>
          </div>
          <div className="settings-group">
            <h4>Account Settings </h4>
            <ul>
              <li>
                <label className="col-sm-3">
                  <span
                    className="redText"
                    onClick={this.openModal.bind(this, "DEACTIVATE_ACCOUNT")}
                  >
                    Deactivate Account
                  </span>
                </label>
                <span className="col-sm-9">&nbsp;</span>
              </li>
              <li>
                <span className="col-sm-12">
                  Deactivating your account will disable your profile and remove
                  your listed events and hired staff.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return state
}

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
