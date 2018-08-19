import React, { Component } from "react"
import { push } from "react-router-redux"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { Button } from "react-bootstrap"
import "./settings.css"
import API from "./../../services/api"
import NavBar from "./../layouts/NavBar"
import MaskedInput from "react-text-mask"
import VenueEdit from "./profile/venueEdit"
import OrganiserEdit from "./profile/organiserEdit"
import StaffEdit from "./profile/staffEdit"

const cardIconStyle = {
  width: 50,
  height: 45
}

const checkIconStyle = {
  width: 15,
  height: 15,
  float: "left"
}
class SelectCardPresentation extends Component {
  constructor(props) {
    super(props)
  }
  onSelectCard(name) {
    const cardTypes = this.state.cardTypes.map(
      c => (c.name === name ? { ...c, on: true } : { ...c, on: false })
    )
    this.setState({ cardTypes })
  }
  state = {
    selectedCard: "visa",
    cardTypes: [
      { name: "visa", image: "visa.png", on: true },
      { name: "master", image: "master.png", on: false },
      { name: "american_express", image: "express.png", on: false }
    ]
  }
  render() {
    return (
      <div className="row">
        {this.state.cardTypes.length > 0 &&
          this.state.cardTypes.map((c, index) => (
            <div
              key={index}
              className="col-sm-4"
              onClick={this.onSelectCard.bind(this, c.name)}
            >
              <img
                src={require(`../../assets/cardIcons/${c.image}`)}
                style={cardIconStyle}
              />
              {c.on && (
                <img
                  src={require(`../../assets/checkIcon.png`)}
                  style={checkIconStyle}
                />
              )}
            </div>
          ))}
      </div>
    )
  }
}

class Settings extends Component {
  constructor(props) {
    super(props)
    this.closeModal = this.closeModal.bind(this)
    this.handleFileUpload = this.handleFileUpload.bind(this)
    this.onChangeInput = this.onChangeInput.bind(this)
  }
  state = {
    openModal: false,
    modalContent: "Under construction",
    customModalStyle: {},

    info: "",

    oldEmail: "",
    newEmail: "",
    newEmail2: "",

    newPassword: "",
    newPasswordConfirm: "",

    passwordVerification: "",

    cardName: "",
    cardNumber: "",
    cardDate: "",
    cardCV: "",
    isBankLoading: true,

    cardArray: [],
    bankArray: [],

    accountName: "",
    bankName: "",
    bankBSB: "",
    bankAccount: "",

    avatar_temp: "",
    avatar_temp_preview_url: "",
    avatar_DOM: "",

    persist_modal: "",

    myStaffs: [],
    // For Transfer Funds
    amount: "",
    transfer_to: "",
    bank: "",
    bsb: "",
    account_id: ""
  }
  getAllBanks = () => {
    API.get("banks").then(res => {
      if (res.status) {
        this.setState({
          bankArray: res.banks,
          accountName: "",
          bankName: "",
          bankBSB: "",
          bankAccount: "",
          isBankLoading: false,
          account_id: res.banks[0].promiseId
        })
      } else {
        alert("Something went wrong")
        this.setState({ isBankLoading: false })
      }
    })
  }
  getAllCards = () => {
    API.get("cards").then(res => {
      if (res.status) {
        this.setState({
          cardArray: res.cards,
          cardName: "",
          cardNumber: "",
          cardDate: "",
          cardCV: "",
          isBankLoading: false
        })
      } else {
        alert("Something went wrong")
        this.setState({ isBankLoading: false })
      }
    })
  }
  componentWillMount = async () => {
    API.initRequest()
    if (!this.props.myProfile.isStaff) {
      this.getMyStaffs()
    }
    let avatar_DOM = <img src={this.props.myProfile.avatar} />
    if (this.props.myProfile && this.props.myProfile.isEmployer) {
      avatar_DOM = <img src={this.props.myProfile.employer.image} />
    }

    this.setState(
      {
        avatar_DOM,
        info:
          this.props.myProfile &&
          this.props.myProfile.employer &&
          this.props.myProfile.employer.info
            ? this.props.myProfile.employer.info
            : null
      },
      () => {
        if (this.props.myProfile.isVenue) {
          this.getAllBanks()
          this.getAllCards()
        }
      }
    )
  }

  componentDidMount = async () => {
    let profile = await API.getProfile()
    this.setState({ profile })
  }

  componentDidUpdate = async () => {
    if (this.state.persist_modal !== "") {
      this.openModal(this.state.persist_modal)
      this.setState({ persist_modal: "" })
    }
  }
  onChangeInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleFileUpload(e) {
    // const file = files[0];
    e.preventDefault()

    let reader = new FileReader()
    let file = e.target.files[0]

    reader.onloadend = () => {
      let avatar_DOM = <img src={reader.result} />
      this.setState({
        avatar_temp: file,
        avatar_temp_preview_url: reader.result,
        avatar_DOM: avatar_DOM,
        persist_modal: "EDIT_PROFILE"
      })
    }
    reader.readAsDataURL(file)
    this.closeModal()
  }
  getMyStaffs = () => {
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
        this.setState({
          myStaffs: allStaff,
          transfer_to: allStaff[0].staff.user
        })
        // this.selectStaff()
      }
    })
  }
  triggerInputFile = () => this.fileInput.click()

  closeModal() {
    this.setState({ openModal: false })
  }
  // Handle modal actions
  saveModal(type) {
    let api_url = "",
      confirm_modal_name = ""
    let body = {}
    switch (type) {
      case "EDIT_PROFILE":
        body = {
          image: this.state.avatar_temp_preview_url,
          info: this.state.info,
          location: this.props.myProfile.location
        }
        api_url = "user/profile/venue"
        confirm_modal_name = "EDIT_PROFILE_CONFIRM"
        break
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
      case "ADD_BANK_CARD":
        const cardResult = this.state.cardDate.split("/")
        body = {
          account_name: this.state.cardName,
          account_number: this.state.cardNumber,
          expiry_month: cardResult[0],
          expiry_year: 20 + cardResult[1],
          cvv: this.state.cardCV
        }
        api_url = "add-card"
        confirm_modal_name = "ADD_BANK_CARD_CONFIRM"
        break
      case "ADD_BANK_ACCOUNT":
        body = {
          account_name: this.state.accountName,
          bank_name: this.state.bankName,
          routing_number: this.state.bankBSB,
          account_number: this.state.bankAccount
        }
        api_url = "add-bank"
        confirm_modal_name = "ADD_BANK_ACCOUNT_CONFIRM"
        break
      case "TRANSFER_MONEY":
        body = {
          account_id: this.state.account_id,
          amount: this.state.amount,
          to_user: this.state.transfer_to,
          from: "bank"
        }
        api_url = "transfer"
        confirm_modal_name = "TRANSFER_MONEY_CONFIRM"
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
        alert(JSON.stringify(res))
      }
      if (res.status) {
        this.openModal(confirm_modal_name)
      }
    })
  }

  // end Handle modal actions

  renderEditProfile = () => {
    if (this.state.profile && this.state.profile.isVenue) {
      return <VenueEdit profile={this.state.profile.employer} />
    }

    if (this.state.profile && this.state.profile.isOrganizer) {
      return <OrganiserEdit profile={this.state.profile.employer} />
    }

    if (this.state.profile && this.state.profile.isStaff) {
      return (
        <StaffEdit
          profile={this.state.profile.staffId}
          close={this.closeModal}
        />
      )
    }
  }

  openModal(type) {
    let content = "",
      customModalStyle = {}
    switch (type) {
      case "EDIT_PROFILE":
        content = (
          <div className="edit-profile have-header form-content">
            <h5>Edit Profile</h5>
            {this.renderEditProfile()}
          </div>
        )
        break
      case "EDIT_PROFILE_CONFIRM":
        content = (
          <div className="change-email-confirm">
            <img src={require("./img/confirm-icon.png")} />
            <h5>Data Updated!</h5>
            <p>You have successfully changed your personal data.</p>

            <Button className="btn-primary" onClick={this.closeModal}>
              Ok
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
              Which payment type <br />
              would you like to add?
            </h5>
            <p onClick={this.openModal.bind(this, "ADD_BANK_CARD")}>
              <img src={require("./img/credit-card.png")} />
              <span>Credit/Debit Card</span>
            </p>
            <p onClick={this.openModal.bind(this, "ADD_BANK_ACCOUNT")}>
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
              <input
                type="text"
                onChange={this.onChangeInput}
                name="accountName"
              />
            </p>
            <p>
              <label>Bank Name</label>
              <input
                type="text"
                onChange={this.onChangeInput}
                name="bankName"
              />
            </p>
            <div className="row no-padding-bottom">
              <p className="col-md-6">
                <label>BSB</label>
                <input
                  type="text"
                  onChange={this.onChangeInput}
                  name="bankBSB"
                />
              </p>
              <p className="col-md-6">
                <label>Account Number</label>
                <input
                  type="text"
                  onChange={this.onChangeInput}
                  name="bankAccount"
                />
              </p>
            </div>
            <Button
              className="btn-primary"
              onClick={this.saveModal.bind(this, "ADD_BANK_ACCOUNT")}
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
          <div className="bank-card have-header">
            <h5>Add Credit/Debit Card</h5>

            {/*<p>This connection is secure</p><SelectCardPresentation />*/}
            <p className="text-left">
              <label>Name on the Card</label>
              <input
                type="text"
                name="cardName"
                onChange={this.onChangeInput}
              />
            </p>
            <p className="text-left">
              <label>Credit/Debit Card number</label>
              <input
                type="text"
                name="cardNumber"
                onChange={this.onChangeInput}
              />
            </p>
            <div className="row no-padding-bottom">
              <p className="col-md-6 text-left">
                <label>Month/Year</label>
                <MaskedInput
                  mask={[/[0-1]/, /[1-9]/, "/", /[0-3]/, /[0-9]/]}
                  name="cardDate"
                  className="a-input"
                  guide={false}
                  onChange={this.onChangeInput}
                />
              </p>
              <p className="col-md-6 text-left">
                <label>CVV</label>
                <input
                  type="text"
                  className="a-input"
                  name="cardCV"
                  onChange={this.onChangeInput}
                />
              </p>
            </div>
            <Button
              className="btn-primary"
              onClick={this.saveModal.bind(this, "ADD_BANK_CARD")}
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
        customModalStyle = {}
        content = (
          <div className="payment-method have-header">
            <h5>Payment Method</h5>
            <div className="group">
              <p>Credit Card</p>
              {this.state.cardArray.map(card => (
                <div className="row">
                  <span className="col-md-2">
                    <img
                      src={require(`./img/${card.cardMeta.type}-logo.png`)}
                    />
                  </span>
                  <span className="col-md-6">
                    <span>{card.cardMeta.number}</span>
                  </span>
                  <small className="primary col-md-2">&nbsp;</small>
                  <span className="col-md-1 btn-delete">
                    <i className="fa fa-minus-circle" />
                  </span>
                </div>
              ))}
            </div>
            <div className="group">
              <p>Bank Account</p>
              {this.state.bankArray.map(bank => (
                <div className="row">
                  <span className="col-md-5">{bank.bankMeta.bank_name}</span>
                  <span className="col-md-5">
                    {bank.bankMeta.account_number}
                  </span>
                  <span className="col-md-1 btn-delete">
                    <i className="fa fa-minus-circle" />
                  </span>
                </div>
              ))}
            </div>
            <Button className="btn-primary" onClick={this.closeModal}>
              Save
            </Button>
          </div>
        )
        break
      case "TRANSFER_MONEY":
        customModalStyle = { width: "800px", maxWidth: "none" }
        content = (
          <div className="transfer-money">
            <h5>Transfer Money</h5>
            <p>Bank Transfer</p>
            <p>For every Transaction 16.5% will go to Attender get.</p>

            <div className="row">
              <div className="col-md-6">
                <p>
                  <label>Amount</label>
                  <input
                    onChange={this.onChangeInput}
                    type="text"
                    name="amount"
                  />
                </p>
                <p>
                  <label>Transfer to</label>
                  <select
                    name="transfer_to"
                    defaultValue={this.state.transfer_to}
                    onChange={this.onChangeInput}
                  >
                    {this.state.myStaffs.map(staff => (
                      <option value={staff.staff.user}>
                        {staff.staff.fullname}
                      </option>
                    ))}
                  </select>
                </p>
                <p>
                  <label>Bank</label>
                  <select
                    name="bank"
                    defaultValue={this.state.bank}
                    onChange={this.onChangeInput}
                  >
                    {this.state.bankArray.map(bank => (
                      <option value={bank.bank_name}>
                        {bank.bankMeta.bank_name}
                      </option>
                    ))}
                  </select>
                </p>
                <div className="row">
                  <div className="col-md-6">
                    <label>BSB</label>
                    <select name="bsb" onChange={this.onChangeInput}>
                      <option />
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label>Account Number</label>
                    <select
                      name="account_id"
                      defaultValue={this.state.account_id}
                      onChange={this.onChangeInput}
                    >
                      {this.state.bankArray.map(bank => (
                        <option value={bank.promiseId}>
                          {bank.bankMeta.account_number}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <h3>Summary</h3>
                <div className="row">
                  <label className="col-md-6 text-left">
                    Amount to Transfer
                  </label>
                  <span className="col-md-6 text-right">-</span>
                </div>
                <div className="row">
                  <span className="col-md-6 text-left">
                    16.5% Attender fee
                    <br />
                    on top of your Transfer
                  </span>
                  <span className="col-md-6 text-right">-</span>
                </div>
                <hr />
                <div className="row">
                  <h2 className="col-md-6 text-left">Total</h2>
                  <span className="col-md-6 text-right">-</span>
                </div>
                <Button className="btn-info" onClick={this.closeModal}>
                  Cancel
                </Button>
                <Button
                  className="btn-primary"
                  onClick={this.saveModal.bind(this, "TRANSFER_MONEY")}
                >
                  Transfer
                </Button>
              </div>
            </div>
          </div>
        )
        break
      case "TRANSFER_MONEY_CONFIRM":
        content = (
          <div className="transfer-money-confirm">
            <img src={require("./img/confirm-icon.png")} />
            <h5>Money Transfered Successfully!</h5>
            <p>You have successfully transfered the money to your staff.</p>
            <Button className="btn-primary" onClick={this.closeModal}>
              Ok
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
        <div className="a-modal-content" style={{ maxWidth: "850px" }}>
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
              </li>
              <li>
                <label
                  className="col-sm-3"
                  onClick={this.openModal.bind(this, "CHANGE_PASSWORD")}
                >
                  Change Password
                </label>
                <span className="col-sm-9">Change your login password.</span>
              </li>
            </ul>
          </div>
          <div className="settings-group">
            <h4>Payment Settings</h4>
            <ul>
              <li onClick={this.openModal.bind(this, "ADD_BANK_CHOICES")}>
                <label className="col-sm-3">Add Bank Accounts</label>
                <span className="col-sm-9">
                  You can add multiple bank account by clicking add bank
                  account.
                </span>
              </li>
              {this.props.myProfile.isVenue ? (
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
                </li>
              ) : null}
            </ul>
          </div>
          <div className="settings-group">
            <h4>Account Settings </h4>
            <ul>
              {!this.props.myProfile.isStaff ? (
                <li onClick={this.openModal.bind(this, "TRANSFER_MONEY")}>
                  <label className="col-sm-3">
                    <span>Transfer Money</span>
                  </label>
                  <span className="col-sm-9">Transfer money to your staff</span>
                </li>
              ) : null}
              <li onClick={this.openModal.bind(this, "DEACTIVATE_ACCOUNT")}>
                <label className="col-sm-3">
                  <span className="redText">Deactivate Account</span>
                </label>
                <span className="col-sm-9">&nbsp;</span>
              </li>
              {this.props.myProfile.isStaff ? (
                <li>Deactivating your account will disable your profile.</li>
              ) : (
                <li>
                  Deactivating your account will disable your profile and remove
                  your listed events and hired staff.
                </li>
              )}
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings)
