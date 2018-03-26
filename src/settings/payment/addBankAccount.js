import React, { Component } from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import "../.././styles/global.css"
import API from "../.././services/api"

class AddBankAccount extends Component {
  constructor(props) {
    super(props)
    this.state = {
      accountName: "",
      bankName: "",
      bankBSB: "",
      bankAccount: "",
      isBankLoading: true
    }
  }

  onAddAccount = () => {
    var accountDetails = {
      account_name: this.state.accountName,
      bank_name: this.state.bankName,
      routing_number: this.state.bankBSB,
      account_number: this.state.bankAccount
    }

    API.post("add-bank", accountDetails).then(res => {
      if (res.status) {
        this.props.getAllBanks()
      } else {
        alert("Invalid Input")
      }
    })
  }

  onChangeInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return (
      <div className="form-container">
        <div className="form-group">
          <p>Account Name</p>
          <input
            type="text"
            className="a-input"
            name="accountName"
            placeholder="John Snow"
            onChange={this.onChangeInput}
          />
        </div>
        <div className="form-group">
          <p>Bank Name</p>
          <input
            type="text"
            className="a-input"
            name="bankName"
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
                name="bankBSB"
                placeholder="123456"
                onChange={this.onChangeInput}
              />
            </div>
            <div className="col-sm-12 col-md-6">
              <p>Account Number</p>
              <input
                type="text"
                className="a-input"
                name="bankAccount"
                placeholder="001234567"
                onChange={this.onChangeInput}
              />
            </div>
          </div>
        </div>
        <div className="form-group">
          <button
            className="pull-right a-btn btn-round btn-dark"
            onClick={() => this.onAddAccount()}
          >
            Add Account
          </button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(AddBankAccount)
