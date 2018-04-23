import React, { Component } from "react"
import NavBar from "../layouts/NavBar"
import { push } from "react-router-redux"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import API from ".././services/api"
import "./earnings.css"

class Earnings extends Component {
  constructor(props) {
    super(props)
    this.state = {
      totalAvailBalance: 0,
      bankArray: [],
      withdrawToId: "",
      withdrawTo: "",
      accountNumber: "",
      bankIndex: 0
    }
  }

  // #region Non Render Methods
  getEarnings = () => {
    API.get("earnings").then(res => {
      console.log("the earnings", res)
      return false
      this.setState(
        {
          totalAvailBalance: res.wallet.label,
          bankArray: res.banks,
          withdrawToId: res.banks.promiseId,
          withdrawTo: res.banks[this.state.bankIndex].bankMeta.bank_name,
          accountNumber: res.banks[this.state.bankIndex].bankMeta.account_number
        },
        () => {
          console.log("the state", this.state)
        }
      )
    })
  }
  // #endregion

  // #region Lifecycle Methods
  componentDidMount = () => {
    this.getEarnings()
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
        <div>$1,600.20</div>
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
        <div>$11,750/20</div>
      </div>
    )
  }

  renderTotalWithdrawnText = () => {
    return (
      <div>
        <div>Total Withdrawn</div>
        <div>$3,750,20</div>
      </div>
    )
  }

  renderTransactionHistoryList = () => {
    return <div>{this.renderTransactionHistoryListItem()}</div>
  }

  renderTransactionHistoryListItem = () => {
    return (
      <div>
        <div>Transfer from Jayson Dale</div>
        <div>Completed 30 June 2018</div>
        <div>$300.20</div>
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
