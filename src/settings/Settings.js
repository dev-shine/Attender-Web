import React, { Component } from "react"
import { push } from "react-router-redux"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { Button } from "react-bootstrap"
import "./settings.css"
import API from "./../services/api"
import NavBar from "../layouts/NavBar"

class Settings extends Component {
  constructor(props) {
    super(props)
    this.closeModal = this.closeModal.bind(this)
  }
  state = {
    openModal: false,
    modalContent: "Under construction",
    customModalStyle: {},
    oldEmail: "",
    newEmail: "",
    newEmail2: "",
    newPassword: "",
    newPasswordConfirm: "",
    passwordVerification: ""
  }
  componentDidMount = async () => {
    API.initRequest()
  }
  onChangeInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  closeModal() {
    this.setState({ openModal: false })
  }
  // Handle modal actions
  saveModal(type) {
    let api_url = "",
      confirm_modal_name = ""
    let body = {}
    switch (type) {
      case "CHANGE_EMAIL":
        body = {
          oldEmail: this.state.oldEmail,
          newEmail: this.state.newEmail
        }
        api_url = "user/profile/change-email"
        confirm_modal_name = "CHANGE_EMAIL_CONFIRM"
        if (body.newEmail !== this.state.newEmail2) {
          alert("Email confirmation does not match.")
          return false
        }
        break
      case "CHANGE_PASSWORD":
        body = {
          newPassword: this.state.newPassword,
          newPasswordConfirm: this.state.newPasswordConfirm
        }
        api_url = "user/profile/change-password"
        confirm_modal_name = "CHANGE_PASSWORD_CONFIRM"
        break
      case "DEACTIVATE_ACCOUNT":
        body = {
          password: this.state.passwordVerification
        }
        api_url = "user/profile/deactivate-user"
        confirm_modal_name = "DEACTIVATE_ACCOUNT_CONFIRM"
        break
    }
    API.post(api_url, body).then(res => {
      if (!res.status) {
        alert(res.message)
      }
      if (res.status) {
        this.openModal(confirm_modal_name)
      }
    })
  }

  // end Handle modal actions
  openModal(type) {
    let content = "",
      customModalStyle = {}
    switch (type) {
      case "EDIT_PROFILE":
        content = (
          <div className="edit-profile have-header">
            <h5>Edit Profile</h5>
            <div className="avatar">
              <img src={require("./img/kerr.jpeg")} />
              <span className="overlay" />
            </div>
            <sub>
              Click on the icon to change Profile Picture <br />
              <span className="remove-photo">Remove Photo</span>
            </sub>

            <p>
              <label>Full Name</label>
              <input type="text" placeholder="Andrew Orsen" />
            </p>
            <p>
              <label>Bio</label>
              <textarea>
                Owner of Eivissa Super Clib and running a small restaurant in
                Sydney for more than 5 years
              </textarea>
              <span className="char-counter">24/200</span>
            </p>
            <div className="container">
              <div className="row">
                <div className="col-md-6">
                  <p>
                    <label>Birthdate</label>
                    <select>
                      <option>22 / June/1992</option>
                    </select>
                  </p>
                </div>
                <div className="col-md-6 section-gender">
                  <p>
                    <label>Gender</label>
                    <span>
                      <i>&#9794;</i> Male
                    </span>
                    <span>
                      <i>&#9792;</i> Female
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <Button
              className="btn-primary"
              onClick={this.openModal.bind(this, "CHANGE_EMAIL_CONFIRM")}
            >
              Save
            </Button>
          </div>
        )
        break
      case "CHANGE_EMAIL":
        content = (
          <div className="change-email have-header">
            <h5>Change Email Address</h5>
            <p>
              <label>Old Email Address</label>
              <input
                onChange={this.onChangeInput}
                type="email"
                name="oldEmail"
                required
              />
            </p>
            <p>
              <label>New Email Address</label>
              <input
                onChange={this.onChangeInput}
                type="email"
                name="newEmail"
                required
              />
            </p>
            <p>
              <label>Confirm Email Address</label>
              <input
                onChange={this.onChangeInput}
                type="email"
                name="newEmail2"
                required
              />
            </p>
            <Button
              className="btn-primary"
              onClick={this.saveModal.bind(this, "CHANGE_EMAIL")}
            >
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
              <input
                onChange={this.onChangeInput}
                type="password"
                name="currentPassword"
              />
            </p>
            <p>
              <label>New Password</label>
              <input
                onChange={this.onChangeInput}
                type="password"
                name="newPassword"
              />
            </p>
            <p>
              <label>Confirm Password</label>
              <input
                onChange={this.onChangeInput}
                type="password"
                name="newPasswordConfirm"
              />
            </p>
            <Button
              className="btn-primary"
              onClick={this.saveModal.bind(this, "CHANGE_PASSWORD")}
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
            <p onClick={this.openModal.bind(this, "ADD_BANK_ACCOUNT")}>
              <img src={require("./img/credit-card.png")} />
              <span>Credit/Debit Card</span>
            </p>
            <p onClick={this.openModal.bind(this, "ADD_BANK_CARD")}>
              <img src={require("./img/bank-icon.png")} />
              <span>Bank Account</span>
            </p>
          </div>
        )
        break
      case "ADD_BANK_ACCOUNT":
        content = (
          <div className="change-email have-header">
            <h5>Add Bank Account</h5>
            <p>
              <label>Account Name</label>
              <input type="text" />
            </p>
            <p>
              <label>Bank Name</label>
              <input type="text" />
            </p>
            <div className="row no-padding-bottom">
              <p className="col-md-6">
                <label>BSB</label>
                <input type="text" />
              </p>
              <p className="col-md-6">
                <label>Account Number</label>
                <input type="text" />
              </p>
            </div>
            <Button
              className="btn-primary"
              onClick={this.openModal.bind(this, "ADD_BANK_ACCOUNT_CONFIRM")}
            >
              Save
            </Button>
          </div>
        )
        break
      case "ADD_BANK_ACCOUNT_CONFIRM":
        content = (
          <div className="deactivate-account-confirm">
            <img src={require("./img/confirm-icon.png")} />
            <h5>Bank Account Added!</h5>
            <p>You have successfully added a bank account.</p>
            <Button className="btn-primary" onClick={this.closeModal}>
              Ok
            </Button>
          </div>
        )
        break
      case "ADD_BANK_CARD":
        content = (
          <div className="change-email have-header">
            <h5>Add Credit/Debit Card</h5>
            <p>
              <label>Name on the Card</label>
              <input type="text" />
            </p>
            <p>
              <label>Credit/Debit Card number</label>
              <input type="text" />
            </p>
            <div className="row no-padding-bottom">
              <p className="col-md-6">
                <label>Month/Year</label>
                <input type="text" />
              </p>
              <p className="col-md-6">
                <label>CVV</label>
                <input type="text" />
              </p>
            </div>
            <Button
              className="btn-primary"
              onClick={this.openModal.bind(this, "ADD_BANK_CARD_CONFIRM")}
            >
              Save
            </Button>
          </div>
        )
        break
      case "ADD_BANK_CARD_CONFIRM":
        content = (
          <div className="deactivate-account-confirm">
            <img src={require("./img/confirm-icon.png")} />
            <h5>Credit/Debit Card Added!</h5>
            <p>You have successfully added credit/debit card.</p>
            <Button className="btn-primary" onClick={this.closeModal}>
              Ok
            </Button>
          </div>
        )
        break
      case "PAYMENT_METHOD":
        customModalStyle = { width: "405px" }
        content = (
          <div className="payment-method have-header">
            <h5>Payment Method</h5>
            <div className="group">
              <p>Credit Card</p>
              <div className="row">
                <span className="col-md-2">
                  <img src={require("./img/mastercard-logo.png")} />
                </span>
                <span className="col-md-6">
                  <span>&#9679;&#9679;&#9679;&#9679;</span>
                  <span>&#9679;&#9679;&#9679;&#9679;</span>
                  <span>4375</span>
                </span>
                <small className="primary col-md-2">Primary</small>
                <span className="col-md-1 btn-delete">
                  <i className="fa fa-minus-circle" />
                </span>
              </div>
              <div className="row">
                <span className="col-md-2">
                  <img src={require("./img/visa-logo.png")} />
                </span>
                <span className="col-md-6">
                  <span>&#9679;&#9679;&#9679;&#9679;</span>
                  <span>&#9679;&#9679;&#9679;&#9679;</span>
                  <span>4375</span>
                </span>
                <small className="col-md-2">&nbsp;</small>
                <span className="col-md-1 btn-delete">
                  <i className="fa fa-minus-circle" />
                </span>
              </div>
            </div>
            <div className="group">
              <p>Bank Account</p>
              <div className="row">
                <span className="col-md-5">National Aust</span>
                <span className="col-md-5">
                  <span>XXXX - XXXX</span>
                  <span>4375</span>
                </span>
                <span className="col-md-1 btn-delete">
                  <i className="fa fa-minus-circle" />
                </span>
              </div>
              <div className="row">
                <span className="col-md-5">Herritage Bank</span>
                <span className="col-md-5">
                  <span>XXXX - XXXX</span>
                  <span>4375</span>
                </span>
                <span className="col-md-1 btn-delete">
                  <i className="fa fa-minus-circle" />
                </span>
              </div>
            </div>
            <Button className="btn-primary" onClick={this.closeModal}>
              Save
            </Button>
          </div>
        )
        break
      case "DEACTIVATE_ACCOUNT":
        content = (
          <div className="deactivate-account">
            <img src={require("./img/delete-icon.png")} />
            <h5>Delete Account</h5>
            <p>Are you sure you want to delete your account?</p>
            <p>
              <label>Please enter password to verify</label>
              <input
                onChange={this.onChangeInput}
                type="password"
                name="passwordVerification"
              />
            </p>
            <Button
              className="btn-primary"
              onClick={this.openModal.bind(this, "DEACTIVATE_ACCOUNT_CONFIRM")}
            >
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

    this.setState({ modalContent: content, openModal: true, customModalStyle })
  }
  modal() {
    return (
      <div className="a-modal show">
        <div className="a-modal-content" style={this.state.customModalStyle}>
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
              <li onClick={this.openModal.bind(this, "EDIT_PROFILE")}>
                <label className="col-sm-3">Edit Profile</label>
                <span className="col-sm-9">Edit your Profile Information.</span>
                {
                  //<div className="col-sm-9 accordion">Form goes here</div>
                }
              </li>
              <li onClick={this.openModal.bind(this, "CHANGE_EMAIL")}>
                <label className="col-sm-3">Change Email</label>
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
                <label
                  className="col-sm-3"
                  onClick={this.openModal.bind(this, "PAYMENT_METHOD")}
                >
                  Payment Method
                </label>
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
