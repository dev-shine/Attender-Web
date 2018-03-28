import React, { Component } from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import "../.././styles/global.css"

const AddBankAccountPresentation = ({
  onChangeInput,
  onClick,
  onOptionalClick
}) => (
  <div className="form-container">
    <div className="form-group">
      <p>Account Name</p>
      <input
        type="text"
        className="a-input"
        name="accountName"
        placeholder="John Snow"
        onChange={onChangeInput}
      />
    </div>
    <div className="form-group">
      <p>Bank Name</p>
      <input
        type="text"
        className="a-input"
        name="bankName"
        placeholder="Bank of Australia"
        onChange={onChangeInput}
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
            onChange={onChangeInput}
          />
        </div>
        <div className="col-sm-12 col-md-6">
          <p>Account Number</p>
          <input
            type="text"
            className="a-input"
            name="bankAccount"
            placeholder="001234567"
            onChange={onChangeInput}
          />
        </div>
      </div>
    </div>
    <div className="form-group">
      <button className="pull-right a-btn btn-round btn-dark" onClick={onClick}>
        Add Account
      </button>
      <button
        className="pull-left a-btn btn-round btn-dark"
        onClick={onOptionalClick}
      >
        Direct Transfer
      </button>
    </div>
  </div>
)

class AddBankAccountContainer extends Component {
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

  getAccountDetails = () => {
    return {
      account_name: this.state.accountName,
      bank_name: this.state.bankName,
      routing_number: this.state.bankBSB,
      account_number: this.state.bankAccount
    }
  }

  onChangeInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return (
      <AddBankAccountPresentation
        onClick={this.props.onClick.bind(this, this.getAccountDetails())}
        onOptionalClick={this.props.onOptionalClick}
        onChangeInput={this.onChangeInput}
      />
    )
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(
  AddBankAccountContainer
)
