import React from "react"
import "./SubscribePopUp.css"
import { Button } from "react-bootstrap"
import API from "./../../services/api"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { subscribeMe } from "./../../actions/myProfile-actions"
import { push } from "react-router-redux"

class SubscribePopUp extends React.Component {
  constructor(props) {
    super(props)
    this.Close = this.Close.bind(this)
    this.Subscribe = this.Subscribe.bind(this)
    this.Use_Card = this.Use_Card.bind(this)
    this.Use_Bank = this.Use_Bank.bind(this)
  }
  state = {
    openModal: false,
    modalContent: "Under construction",
    customModalStyle: {},

    use_card: false,
    use_bank: false
  }
  // Subscribe() {
  //   console.log("here")
  //   const data = {
  //     subscriptionType: "ACCOUNT_PREMIUM"
  //   }
  //   API.post("subscription/subscribe", data).then(res => {
  //     console.log(res)
  //     this.props.onSubscribeMe()
  //   })

  //   this.props.close()
  //   this.props.goToSubscribeSettings()
  // }
  Use_Card() {
    this.setState({ use_card: true, use_bank: false })
    this.openModal("STEP_2")
  }
  Use_Bank() {
    this.setState({ use_card: false, use_bank: true })
    this.openModal("STEP_2")
  }
  Subscribe() {
    this.openModal("STEP_1")
  }
  Close() {
    this.props.close()
  }
  openModal(type) {
    let content = "",
      customModalStyle = {}
    switch (type) {
      case "STEP_1":
        content = (
          <div>
            <h4>Your Subscriptions</h4>
            <div className="row">
              <label className="col-md-6 ">Attender Premium</label>
              <div className="col-md-6 text-right">
                <span>$49/mo</span>
                <sub>One month of Service</sub>
              </div>
            </div>
            <div className="row last">
              <small className="col-md-6">Purchased September 9 2017</small>
              <small className="col-md-6 text-right">
                Expires on October 10 2017
              </small>
            </div>
            <hr />
            <p>
              Note : Subscriptions are renewed on a month by month basis until
              cancelled.
            </p>
            <div className="a-modal-footer">
              <Button
                className="btn-primary"
                onClick={this.openModal.bind(this, "STEP_2")}
              >
                Proceed with Payment
              </Button>
            </div>
          </div>
        )
        break
      case "STEP_2":
        content = (
          <div className="step-2 have-header">
            <h5>
              Which payment type <br />would you like to add?
            </h5>
            <div className="row">
              <label className="col-md-6 ">Attender Premium</label>
              <div className="col-md-6 text-right">
                <span>$49/mo</span>
                <sub>One month of Service</sub>
              </div>
            </div>
            <hr />
            <p
              onClick={this.Use_Card}
              className={this.state.use_card ? "selected" : null}
            >
              <img src={require("../../settings/img/credit-card.png")} />
              <span>Credit/Debit Card</span>
            </p>
            <p
              onClick={this.Use_Bank}
              className={this.state.use_bank ? "selected" : null}
            >
              <img src={require("../../settings/img/bank-icon.png")} />
              <span>Bank Account</span>
            </p>
            <div className="a-modal-footer">
              <Button
                className="btn-primary"
                onClick={this.openModal.bind(this, "STEP_3")}
              >
                Next
              </Button>
            </div>
          </div>
        )
        break
      case "STEP_3":
        break
      case "PROCEED_WITH_CARD":
        break
    }
    this.setState({ modalContent: content, openModal: true, customModalStyle })
  }
  closeModal() {
    this.setState({ openModal: false })
  }
  modal() {
    return (
      <div className="a-modal show subscribe-settings-modal">
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
    if (this.state.openModal) {
      return this.modal()
    } else {
      return (
        <div className="component SubscribePopUp">
          <div className="leftside">
            <img src={require("./img/logo.png")} />
            <h2>Attender</h2>
            <span>Hospitality work made very simple.</span>
            <img src={require("./img/preview.png")} />
          </div>
          <div className="rightside">
            <h3>Subscribe To Attender</h3>
            <h4>Sourcing Workers</h4>
            <ul>
              <li>Choose from a pool of ready to work staff when needed</li>
              <li>Set tasks and trial potential staff through the app</li>
              <li>
                View your Venue, Events Calendar and Messages on one platform
              </li>
              <li>$49 per month (excl, GST) no lock in contract</li>
            </ul>
            <Button onClick={this.Subscribe} className="btn-primary">
              Subscribe now
            </Button>
            <Button onClick={this.Close}>No thanks</Button>
          </div>
        </div>
      )
    }
  }
}

const mapStateToProps = state => {
  return state
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      goToSubscribeSettings: () => push(`/subscription-settings/#process-1`),
      onSubscribeMe: subscribeMe
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(SubscribePopUp)
