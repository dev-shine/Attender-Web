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
    this.delete = this.delete.bind(this)
    this.changeEmail = this.changeEmail.bind(this)
  }
  changeEmail() {
    // update api and redux
    this.openModal("CHANGE_EMAIL_CONFIRM")
  }
  delete() {
    // delete through api
    // update redux
    this.openModal("DEACTIVATE_ACCOUNT_CONFIRM")
  }
  openModal(type) {
    let content = ""
    switch (type) {
      case "CHANGE_EMAIL":
        content = (
          <div className="change-email have-header">
            <h5>Change Email Address</h5>
            <p>
              <label>New Email Address</label>
              <input type="text" />
            </p>
            <p>
              <label>Confirm Email Address</label>
              <input type="text" />
            </p>
            <Button className="btn-primary" onClick={this.changeEmail}>
              Save
            </Button>
          </div>
        )
        break
      case "CHANGE_EMAIL_CONFIRM":
        content = (
          <div className="change-email-confirm">
            <img src={require("./img/confirm-icon.png")} />
            <h5>Confirmation Sent!</h5>
            <p>
              You have successfully changed your email, we have sent the
              confirmation link to your email, check your inbox/spam for the
              confirmation link.
            </p>
            <Button className="btn-primary" onClick={this.closeModal}>
              Ok
            </Button>
          </div>
        )
        break
      case "CHANGE_PASSWORD":
        content = (
          <div className="change-email have-header">
            <h5>Change Password</h5>
            <p>
              <label>Current Password</label>
              <input type="text" />
            </p>
            <p>
              <label>New Password</label>
              <input type="text" />
            </p>
            <p>
              <label>Confirm Password</label>
              <input type="text" />
            </p>
            <Button
              className="btn-primary"
              onClick={this.openModal.bind(this, "CHANGE_PASSWORD_CONFIRM")}
            >
              Save
            </Button>
          </div>
        )
        break
      case "CHANGE_PASSWORD_CONFIRM":
        content = (
          <div className="change-email-confirm">
            <img src={require("./img/confirm-icon.png")} />
            <h5>Password Changed!</h5>
            <p>You have successfully changed your password.</p>
            <Button className="btn-primary" onClick={this.closeModal}>
              Ok
            </Button>
          </div>
        )
        break
      case "ADD_BANK_CHOICES":
        content = (
          <div className="add-bank-choices have-header">
            <h5>
              Which payment type <br />would you like to add?
            </h5>
            <p>
              <img src={require("./img/credit-card.png")} />
              <span>Credit/Debit Card</span>
            </p>
            <p>
              <img src={require("./img/bank-icon.png")} />
              <span>Bank Account</span>
            </p>
          </div>
        )
        break
      case "DEACTIVATE_ACCOUNT":
        content = (
          <div className="deactivate-account">
            <img src={require("./img/delete-icon.png")} />
            <h5>Delete Account</h5>
            <p>Are you sure you want to delete your account?</p>
            <Button className="btn-primary" onClick={this.delete}>
              Delete
            </Button>
          </div>
        )
        break
      case "DEACTIVATE_ACCOUNT_CONFIRM":
        content = (
          <div className="deactivate-account-confirm">
            <img src={require("./img/confirm-icon.png")} />
            <h5>Account Deleted</h5>
            <p>If you wish to join us again, we would love to have you.</p>
            <Button className="btn-primary" onClick={this.closeModal}>
              Ok
            </Button>
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
        </div>
      </div>
    )
  }
  render() {
    return (
      <div className="component settings-page">
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
                <label
                  className="col-sm-3"
                  onClick={this.openModal.bind(this, "CHANGE_EMAIL")}
                >
                  Change Email
                </label>
                <span className="col-sm-9">
                  You can change your email address to a new one.
                </span>
                {
                  //<div className="col-sm-9 accordion">Form goes here</div>
                }
              </li>
              <li>
                <label
                  className="col-sm-3"
                  onClick={this.openModal.bind(this, "CHANGE_PASSWORD")}
                >
                  Change Password
                </label>
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
                <label
                  className="col-sm-3"
                  onClick={this.openModal.bind(this, "ADD_BANK_CHOICES")}
                >
                  Add Bank Accounts
                </label>
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
