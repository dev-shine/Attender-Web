import React from "react"
import NavBar from "../layouts/NavBar"
import API from "./../services/api"
import { Link } from "react-router-dom"
import { Button } from "react-bootstrap"
import "./SubscribeSettings.css"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { unsubscribeMe } from "./../actions/myProfile-actions"
import { push } from "react-router-redux"

class SubscribeSettings extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      myProfile: {
        showSubscriptionSettingPopup: false
      }
    }
    this.closeModal = this.closeModal.bind(this)
    this.openModal = this.openModal.bind(this)
    this.unsubscribe = this.unsubscribe.bind(this)
  }
  unsubscribe() {
    const data = {
      subscriptionType: "ACCOUNT_PREMIUM"
    }
    API.post("subscription/cancel", data).then(res => {
      console.log(res)
    })
    this.props.onUnsubscribeMe()
    this.closeModal()
    this.props.goToStaff()
  }
  closeModal() {
    let myProfile = { ...this.state.myProfile }
    myProfile.showSubscriptionSettingPopup = false
    this.setState({ myProfile })
  }
  openModal() {
    let myProfile = { ...this.state.myProfile }
    myProfile.showSubscriptionSettingPopup = true
    this.setState({ myProfile })
  }
  modal() {
    return (
      <div className="a-modal show subscribe-settings-modal">
        <div className="a-modal-content">
          <span className="a-close" onClick={this.closeModal}>
            &times;
          </span>
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
            <Button className="btn-primary" onClick={this.unsubscribe}>
              Cancel Subscription
            </Button>
          </div>
        </div>
      </div>
    )
  }
  render() {
    return (
      <div>
        {window.location.hash ||
        this.state.myProfile.showSubscriptionSettingPopup
          ? this.modal()
          : null}
        <NavBar />
        <div className="container lem">
          <div className="container subscribe-settings">
            <h4>Your Subscription</h4>
            <ul>
              <li>
                <a onClick={this.openModal}>
                  Attender Premium <i className="fa fa-angle-right" />
                </a>
              </li>
            </ul>
            <h3>Managing Staff</h3>
            <ul>
              <li>
                <Link to="/">
                  Andrew Orsen <i className="fa fa-angle-right" />
                </Link>
              </li>
              <li>
                <Link to="/">
                  Bea Alonzo <i className="fa fa-angle-right" />
                </Link>
              </li>
              <li>
                <Link to="/">
                  Pia Wurztbach <i className="fa fa-angle-right" />
                </Link>
              </li>
              <li>
                <Link to="/">
                  Angel Locsin <i className="fa fa-angle-right" />
                </Link>
              </li>
              <li>
                <Link to="/">
                  Andrew Orsen <i className="fa fa-angle-right" />
                </Link>
              </li>
              <li>
                <Link to="/">
                  Bea Alonzo <i className="fa fa-angle-right" />
                </Link>
              </li>
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

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      goToStaff: staffId => push(`/find-staff`),
      onUnsubscribeMe: unsubscribeMe
    },
    dispatch
  )
export default connect(mapStateToProps, mapDispatchToProps)(SubscribeSettings)
