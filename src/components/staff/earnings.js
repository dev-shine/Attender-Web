import React, { Component } from "react"
import NavBar from "./../layouts/NavBar"
import { push } from "react-router-redux"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import moment from "moment"
import API from "./../../services/api"
import "./earnings.css"
import { Button } from "react-bootstrap"

class Earnings extends Component {
  constructor(props) {
    super(props)
    this.state = {
      totalAvailBalanceLabel: 0,
      totalAvailBalance: 0,
      totalEarnings: 0,
      bankArray: [],
      accountName: "",
      bankName: "",
      bankBSB: "",
      bankAccount: "",
      isBankLoading: false,
      withdrawToId: "",
      withdrawTo: "",
      accountNumber: "",
      bankIndex: 0,
      withdrawAmount: 0,
      transactions: [],

      openModal: false,
      modalContent: "Under construction",
      customModalStyle: {},

      bank_accounts: []
    }
    this.closeModal = this.closeModal.bind(this)
  }
  chooseBank(_id) {
    const bankArray = this.state.bankArray
    bankArray.forEach(b => {
      b.selected = false
    })
    bankArray.find(b => b._id == _id).selected = true
    this.setState({ bankArray })
    this.openModal("WIDTHRAW_CHOICES")
  }
  openModal(type) {
    let content = "",
      customModalStyle = {}
    switch (type) {
      case "WIDTHRAW_CHOICES":
        let selected_DOM = (
          <span className="col-md-1">
            <i className="fa fa-check-circle" />
          </span>
        )
        var listBanks = Object.values(this.state.bankArray).map((item, key) => {
          return (
            <div className="row" onClick={this.chooseBank.bind(this, item._id)}>
              <span className="col-md-5">{item.bankMeta.bank_name}</span>
              <span className="col-md-5">
                <span>{item.bankMeta.account_number}</span>
                <span>{item.number}</span>
              </span>
              {item.selected ? selected_DOM : null}
            </div>
          )
        })
        content = (
          <div className="group">
            <p>Choose which Bank Account to use</p>
            {listBanks}
            <div className="a-modal-footer">
              <Button
                className="btn-primary"
                onClick={this.openModal.bind(this, "WIDTHRAW_CONFIRM")}
              >
                Next
              </Button>
            </div>
          </div>
        )

        break
      case "WIDTHRAW_CONFIRM":
        content = (
          <div className="withdraw-confirm">
            <h5>Continue?</h5>
            <p>Are you sure you want to widthraw your money?</p>
            <div className="a-modal-footer">
              <Button className="btn-default" onClick={this.closeModal}>
                Cancel
              </Button>
              <Button
                className="btn btn-primary"
                onClick={this.confirmWithdraw}
              >
                Yes
              </Button>
            </div>
          </div>
        )
        break
      case "WIDTHRAW_SUCCESS":
        content = (
          <div className="withdraw-confirm">
            <img src={require("./../settings/img/confirm-icon.png")} />
            <h5>Confirmed!</h5>
            <p>You have successfully made the transaction.</p>
            <div className="a-modal-footer">
              <Button className="btn-primary" onClick={this.closeModal}>
                Ok
              </Button>
            </div>
          </div>
        )
        break
    }
    this.setState({ modalContent: content, openModal: true, customModalStyle })
  }
  closeModal() {
    this.setState({ openModal: false })
  }
  modal() {
    return (
      <div className="a-modal show subscribe-settings-modal earnings-modal">
        <div className="a-modal-content" style={this.state.customModalStyle}>
          <span className="a-close" onClick={this.closeModal}>
            &times;
          </span>
          {this.state.modalContent}
        </div>
      </div>
    )
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

  // #region Non Render Methods
  getEarnings = () => {
    API.get("earnings").then(res => {
      if (res.status) {
        this.setState({
          totalAvailBalanceLabel: res.wallet.label,
          totalAvailBalance: res.wallet.balance,
          bankArray: res.banks,
          withdrawToId: res.banks.promiseId,
          withdrawTo: res.banks[this.state.bankIndex].bankMeta.bank_name,
          accountNumber: res.banks[this.state.bankIndex].bankMeta.account_number
        })
      }
    })
  }

  getAllTransactions = () => {
    API.get("transactions").then(res => {
      if (res.status) {
        var total = 0
        res.transactions.items.map(res => {
          if (res.state == "completed") {
            total += res.amount / 100
          }
        })
        this.setState({
          transactions: res.transactions.items,
          totalEarnings: total.toFixed(2)
        })
      }
    })
  }
  // #endregion

  confirmWithdraw = () => {
    let bank = this.state.bankArray[this.state.bankIndex]
    API.post("withdraw", {
      account_id: bank.promiseId,
      amount: this.state.withdrawAmount
    }).then(res => {
      if (res.status) {
        this.setState(
          {
            withdrawMultiple: false,
            isShowConfirmWithdraw: false,
            isShowSuccessWithdraw: true
          },
          () => {
            this.getEarnings()
            this.getAllTransactions()
            this.openModal.bind(this, "WIDTHRAW_SUCCESS")
          }
        )
      } else {
        alert("Something went wrong!", res)
      }
    })
  }

  // #region Lifecycle Methods
  componentDidMount = () => {
    this.getEarnings()
    this.getAllTransactions()
    this.getAllBanks()
  }
  // #endregion

  renderWithdrawFundButton = () => {
    return (
      <div>
        <Button
          className="btn-primary"
          onClick={this.openModal.bind(this, "WIDTHRAW_CHOICES")}
        >
          Withdraw Funds
        </Button>
      </div>
    )
  }

  renderTotalEarningsText = () => {
    return (
      <div className="clearfix">
        <strong className="pull-left">Total Earnings</strong>
        <span className="pull-right">
          {`$${this.state.totalEarnings
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
        </span>
      </div>
    )
  }

  renderTotalWithdrawnText = () => {
    return (
      <div className="clearfix">
        <strong className="pull-left">Total Withdrawn</strong>
        <span className="pull-right">{`$${(
          (this.state.totalEarnings - this.state.totalAvailBalance) /
          100
        )
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</span>
      </div>
    )
  }

  renderTransactionHistoryList = () => {
    return (
      <div className="transaction-history">
        {this.state.transactions.map(t => (
          <div>{this.renderTransactionHistoryListItem(t)}</div>
        ))}
      </div>
    )
  }

  renderTransactionHistoryListItem = transaction => {
    return (
      <div className="clearfix">
        <div className="pull-left">
          <p>
            {transaction.description} <strong>{transaction.buyer_name}</strong>
          </p>
          <small>{`Completed ${moment().format("DD MMMM YYYY")}`}</small>
        </div>
        <div className="pull-right">
          {`$${(transaction.amount / 100)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
        </div>
      </div>
    )
  }

  renderPrivacyTaC = () => {
    return (
      <div className="Earnings__footer">
        <p>Privacy Policy | Terms and Agreement</p>
        <p>Attender @ {new Date().getFullYear()}</p>
      </div>
    )
  }
  // #endregion

  // #region Main render method
  render() {
    return (
      <div className="component earnings-page">
        {this.state.openModal ? this.modal() : null}
        <NavBar />
        <div className="Earnings__content container xem">
          <h3 className="page-title">Earnings</h3>
          <div className="earning-summary">
            <div className="clearfix">
              <strong className="pull-left">Total Available Balance:</strong>
              <span className="pull-right">
                {`$${this.state.totalAvailBalanceLabel}`}
                {this.renderWithdrawFundButton()}
              </span>
            </div>
          </div>
          <div className="earning-details">
            {this.renderTotalWithdrawnText()}
            {this.renderTotalEarningsText()}
            {this.renderTransactionHistoryList()}
          </div>
        </div>
        {this.renderPrivacyTaC()}
      </div>
    )
  }
  // #endregion
}

const mapStateToProps = state => {
  return state
}

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Earnings)
