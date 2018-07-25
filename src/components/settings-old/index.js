import React, { Component } from "react"
import NavBar from "./../layouts/NavBar"
import VenueEdit from "./profile/venueEdit"
import StaffEdit from "./profile/staffEdit"
import OrganiserEdit from "./profile/organiserEdit"
import AddBankAccount from "./payment/addBankAccount"
import AddCard from "./payment/addCard"
import "./../.././styles/global.css"
import "./../.././styles/style.css"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import API from "./../../services/api"
import "./settings.css"

class Settings extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isBankTransferModalOpen: false,
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
      passwordVerification: "",

      cardArray: [],

      // Bank Account
      bankArray: [],
      accountName: "",
      bankName: "",
      bankBSB: "",
      bankAccount: "",
      isBankLoading: true,

      // Bank Account Transfer
      transferTo: "",
      amount: 0,
      bankTransferName: "",
      bankTransferBSB: "",
      bankTransferAccountName: "",
      bankTransferAccountNumbers: ""
    }
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
          isBankLoading: false
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

  componentDidMount = async () => {
    API.initRequest()
    let profile = await API.getProfile()
    this.setState({ profile }, () => {
      this.getAllBanks()
      this.getAllCards()
    })
  }

  onAddAccount = accountDetails => {
    API.post("add-bank", accountDetails).then(res => {
      if (res.status) {
        this.getAllBanks()
      } else {
        alert("Invalid Input")
      }
    })
  }

  onAddCard = cardDetails => {
    API.post("add-card", cardDetails).then(res => {
      if (res.status) {
        this.getAllCards()
      } else {
        alert("Invalid Input")
      }
    })
  }

  handleOpenModal = () => {
    // Might pass variables here from account info.
    // For pre-filling the information they entered on the new modal form.
    this.setState({
      isBankTransferModalOpen: !this.state.isBankTransferModalOpen
    })
  }

  renderBankTransferModal = () => {
    return (
      <div
        className={
          this.state.isBankTransferModalOpen ? "a-modal show" : "a-modal"
        }
      >
        <div className="a-modal-content col-md-6">
          <span onClick={() => this.handleOpenModal()} className="a-close">
            &times;
          </span>
          <div className="row">
            <div className="col-sm-12">
              <div className="form-container">
                <div className="form-group">
                  <p>Amount</p>
                  <input
                    type="text"
                    className="a-input"
                    name="amount"
                    onChange={this.onChangeInput}
                  />
                </div>
                <div className="form-group">
                  <p>Transfer to:</p>
                  <input
                    type="text"
                    className="a-input"
                    name="transferTo"
                    onChange={this.onChangeInput}
                  />
                </div>
                <div className="form-group">
                  <p>Account Name</p>
                  <input
                    type="text"
                    className="a-input"
                    name="bankTransferAccountName"
                    placeholder="John Snow"
                    onChange={this.onChangeInput}
                  />
                </div>
                <div className="form-group">
                  <p>Bank Name</p>
                  <input
                    type="text"
                    className="a-input"
                    name="bankTransferName"
                    placeholder="Bank of Australia"
                    onChange={this.onChangeInput}
                  />
                </div>
                <div className="form-group">
                  <div className="row">
                    <div className="col-sm-12 col-md-6">
                      <p>BSB</p>
                      <input
                        type="text"
                        className="a-input"
                        name="bankTransferBSB"
                        placeholder="123456"
                        onChange={this.onChangeInput}
                      />
                    </div>
                    <div className="col-sm-12 col-md-6">
                      <p>Account Number</p>
                      <input
                        type="text"
                        className="a-input"
                        name="bankTransferAccountNumbers"
                        placeholder="001234567"
                        onChange={this.onChangeInput}
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <button
                    className="pull-right a-btn btn-round btn-dark"
                    onClick={this.onDirectTransfer.bind(this)}
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  onDirectTransfer = () => {
    var accountDetails = {
      account_name: this.state.bankTransferAccountName,
      bank_name: this.state.bankTransferName,
      routing_number: this.state.bankTransferBSB,
      account_number: this.state.bankTransferAccountNumbers
    }

    API.post("add-bank", accountDetails).then(res => {
      if (res.status) {
        API.post("transfer", {
          account_id: res.bank.promiseId,
          amount: this.state.amount,
          to_user: this.state.transferToId,
          from: "bank"
        }).then(resPay => {
          if (resPay.status) {
            this.handleOpenModal()
            this.getAllBanks()
          }
        })
      }
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

  renderBanks = () => {
    return this.state.bankArray.map(bank => (
      <div className="col-sm-12">{`${bank.bankMeta.bank_name} - ${
        bank.bankMeta.account_number
      }`}</div>
    ))
  }

  renderCards = () => {
    return this.state.cardArray.map(card => (
      <div className="col-sm-12">{`${card.cardMeta.type} - ${
        card.cardMeta.number
      }`}</div>
    ))
  }

  renderPayment = () => {
    return (
      <div className="settings-container xem">
        <div className="setting-head">Payment Settings</div>
        <div className="setting-menu">
          <div className="setting-menu-item">
            {this.state.profile &&
              !this.state.profile.isStaff && (
                <div>
                  <div className="setting-menu">Add Card</div>
                  <div className="row">
                    <div className="col-sm-9">
                      <AddCard onClick={this.onAddCard} />
                    </div>
                  </div>
                </div>
              )}
            <div className="setting-menu">Add Bank Account</div>
            <div className="row">
              <div className="col-sm-9">
                <AddBankAccount
                  getAllBanks={this.getAllBanks}
                  onClick={this.onAddAccount}
                  onOptionalClick={this.handleOpenModal}
                />
              </div>
            </div>
            {this.state.profile &&
              !this.state.profile.isStaff && (
                <div>
                  <div className="row">Cards</div>
                  <div className="row">{this.renderCards()}</div>
                </div>
              )}
            <div className="row">Bank Accounts</div>
            <div className="row">{this.renderBanks()}</div>
            {this.renderBankTransferModal()}
          </div>
        </div>
      </div>
    )
  }

  renderAccount = () => {
    return (
      <div className="settings-container xsem">
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

  renderEditProfile = () => {
    if (this.state.profile && this.state.profile.isVenue) {
      return <VenueEdit profile={this.state.profile.employer} />
    }

    if (this.state.profile && this.state.profile.isOrganizer) {
      return <OrganiserEdit profile={this.state.profile.employer} />
    }

    if (this.state.profile && this.state.profile.isStaff) {
      return <StaffEdit profile={this.state.profile.staffId} />
    }
  }

  render() {
    return (
      <div>
        <NavBar />
        <div className="container xem">
          <p className="settings-title">SETTINGS</p>
          {this.renderGeneral()}
          {this.renderEditProfile()}
          {this.renderAccount()}
          {this.renderPrivacyTaC()}
          {this.renderPayment()}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
