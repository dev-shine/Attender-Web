import React, { Component } from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import "../.././styles/global.css"
import API from "../.././services/api"
import MaskedInput from "react-text-mask"

class AddCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedCard: "visa",
      isVisa: false,
      isMaster: false,
      isExpress: false,

      cardName: "",
      cardNumber: "",
      cardDate: "",
      cardCV: "",
      isBankLoading: true
    }
  }

  onAddCard = () => {
    const cardResult = this.state.cardDate.split("/")
    const cardDetails = {
      account_name: this.state.cardName,
      account_number: this.state.cardNumber,
      expiry_month: cardResult[0],
      expiry_year: 20 + cardResult[1],
      cvv: this.state.cardCV
    }

    console.log("yr", cardDetails)

    this.setState({ isLoading: true })
    API.post("add-card", cardDetails).then(res => {
      console.log("status", res)
      if (res.status) {
        this.props.getAllCards()
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
          <p>Add Credit Card</p>
          <p>This connection is secure</p>
          <p className="sem">Name of the Card</p>
          <input
            type="text"
            className="a-input"
            name="cardName"
            placeholder="Name on the Card"
            onChange={this.onChangeInput}
          />
        </div>
        <div className="form-group">
          <p>Credit/Debit Card Number</p>
          <input
            type="text"
            className="a-input"
            name="cardNumber"
            placeholder="Credit/Debit Card Number"
            onChange={this.onChangeInput}
          />
        </div>
        <div className="form-group">
          <div className="row">
            <div className="col-sm-12 col-md-6">
              <p>Month/Year</p>
              <MaskedInput
                mask={[/[0-1]/, /[1-9]/, "/", /[0-3]/, /[0-9]/]}
                name="cardDate"
                className="a-input"
                placeholder="03/18"
                guide={false}
                onChange={this.onChangeInput}
              />
            </div>
            <div className="col-sm-12 col-md-6">
              <p>CVV</p>
              <input
                type="text"
                className="a-input"
                name="cardCV"
                placeholder="123"
                onChange={this.onChangeInput}
              />
            </div>
          </div>
        </div>
        <div className="form-group">
          <button
            className="pull-right a-btn btn-round btn-dark"
            onClick={() => this.onAddCard()}
          >
            Add Card
          </button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(AddCard)
