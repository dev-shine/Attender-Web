import React, { Component } from "react"
import NavBar from "../layouts/NavBar"
import { push } from "react-router-redux"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import moment from "moment"
import API from ".././services/api"
import "./earnings.css"

class Earnings extends Component {
  constructor(props) {
    super(props)
    this.state = {
      totalAvailBalanceLabel: 0,
      totalAvailBalance: 0,
      totalEarnings: 0,
      bankArray: [],
      withdrawToId: "",
      withdrawTo: "",
      accountNumber: "",
      bankIndex: 0,
      transactions: []
    }
  }

  // #region Non Render Methods
  getEarnings = () => {
    API.get("earnings").then(res => {
      console.log("the earnings", res)
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

  // #region Lifecycle Methods
  componentDidMount = () => {
    this.getEarnings()
    this.getAllTransactions()
  }
  // #endregion

  // #region Sub Render methods
  renderTitleHeaderText = () => {
    return (
      <div>
        <h1>Earnings</h1>
      </div>
    )
  }

  renderTotalAvailableBalanceText = () => {
    return (
      <div>
        <div>Total Available Balance:</div>
        <div>{this.state.totalAvailBalanceLabel}</div>
      </div>
    )
  }

  renderWithdrawFundButton = () => {
    return (
      <div>
        <button>Withdraw Funds</button>
      </div>
    )
  }

  renderTotalEarningsText = () => {
    return (
      <div>
        <div>Total Earnings</div>
        <div>{`$${this.state.totalEarnings
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</div>
      </div>
    )
  }

  renderTotalWithdrawnText = () => {
    return (
      <div>
        <div>Total Withdrawn</div>
        <div>{`$${(
          (this.state.totalEarnings - this.state.totalAvailBalance) /
          100
        )
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</div>
      </div>
    )
  }

  renderTransactionHistoryList = () => {
    return (
      <div>
        {this.state.transactions.map(t => (
          <div>{this.renderTransactionHistoryListItem(t)}</div>
        ))}
      </div>
    )
  }

  renderTransactionHistoryListItem = transaction => {
    return (
      <div>
        <div>{`${transaction.description} ${transaction.buyer_name}`}</div>
        <div>{`Completed ${moment().format("DD MMMM YYYY")}`}</div>
        <div>{`$${(transaction.amount / 100)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</div>
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
      <div>
        <NavBar />
        <div className="Earnings__content">
          {this.renderTitleHeaderText()}
          {this.renderTotalAvailableBalanceText()}
          {this.renderWithdrawFundButton()}
          {this.renderTotalWithdrawnText()}
          {this.renderTotalEarningsText()}
          {this.renderTransactionHistoryList()}
        </div>
        {this.renderPrivacyTaC()}
      </div>
    )
  }
  // #endregion
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Earnings)
