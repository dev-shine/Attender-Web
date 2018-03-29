import React, { Component } from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import "../.././styles/global.css"
import API from "../.././services/api"
import MaskedInput from "react-text-mask"

//#region Presentations
const SelectCardPresentation = ({ cardTypes, onSelectCard }) => (
  <div className="row">
    {cardTypes.length > 0 &&
      cardTypes.map(c => (
        <div className="col-sm-4" onClick={onSelectCard.bind(this, c.name)}>
          <img
            src={require(`../.././assets/cardIcons/${c.image}`)}
            style={cardIconStyle}
          />
          {c.on && (
            <img
              src={require(`../.././assets/checkIcon.png`)}
              style={checkIconStyle}
            />
          )}
        </div>
      ))}
  </div>
)

const AddCardPresentation = ({
  onChangeInput,
  onClick,
  cardTypes,
  onSelectCard
}) => (
  <div className="form-container">
    <p>Add Credit Card</p>
    <p>This connection is secure</p>
    <SelectCardPresentation cardTypes={cardTypes} onSelectCard={onSelectCard} />
    <div className="form-group">
      <p className="sem">Name of the Card</p>
      <input
        type="text"
        className="a-input"
        name="cardName"
        placeholder="Name on the Card"
        onChange={onChangeInput}
      />
    </div>
    <div className="form-group">
      <p>Credit/Debit Card Number</p>
      <input
        type="text"
        className="a-input"
        name="cardNumber"
        placeholder="Credit/Debit Card Number"
        onChange={onChangeInput}
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
            onChange={onChangeInput}
          />
        </div>
        <div className="col-sm-12 col-md-6">
          <p>CVV</p>
          <input
            type="text"
            className="a-input"
            name="cardCV"
            placeholder="123"
            onChange={onChangeInput}
          />
        </div>
      </div>
    </div>
    <div className="form-group">
      <button className="pull-right a-btn btn-round btn-dark" onClick={onClick}>
        Add Card
      </button>
    </div>
  </div>
)
//#endregion

//#region Containers
class AddCardContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedCard: "visa",
      cardTypes: [
        { name: "visa", image: "visa.png", on: true },
        { name: "master", image: "master.png", on: false },
        { name: "american_express", image: "express.png", on: false }
      ],

      cardName: "",
      cardNumber: "",
      cardDate: "",
      cardCV: "",
      isBankLoading: true
    }
  }

  onSelectCard = name => {
    const cardTypes = this.state.cardTypes.map(
      c => (c.name === name ? { ...c, on: true } : { ...c, on: false })
    )
    this.setState({ cardTypes })
  }

  getCardDetails = () => {
    const cardResult = this.state.cardDate.split("/")

    return {
      account_name: this.state.cardName,
      account_number: this.state.cardNumber,
      expiry_month: cardResult[0],
      expiry_year: 20 + cardResult[1],
      cvv: this.state.cardCV
    }
  }

  onChangeInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return (
      <AddCardPresentation
        onChangeInput={this.onChangeInput}
        onClick={this.props.onClick.bind(this, this.getCardDetails())}
        cardTypes={this.state.cardTypes}
        onSelectCard={this.onSelectCard}
      />
    )
  }
}
//#endregion

//#region Styles
const cardIconStyle = {
  width: 50,
  height: 45
}

const checkIconStyle = {
  width: 15,
  height: 15,
  float: "left"
}
//#endregion

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(AddCardContainer)
