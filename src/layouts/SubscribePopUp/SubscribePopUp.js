import React from "react"
import "./SubscribePopUp.css"
import { Button } from "react-bootstrap"
import API from "./../../services/api"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { setSubscribePopUp } from "./../../actions/myProfile-actions"

class SubscribePopUp extends React.Component {
  constructor(props) {
    super(props)
    this.Close = this.Close.bind(this)
    this.Subscribe = this.Subscribe.bind(this)
  }
  Subscribe() {
    const data = {
      subscriptionType: "ACCOUNT_PREMIUM"
    }
    API.post("subscription/subscribe", data).then(res => {
      console.log(res)
    })
    this.props.onSetSubscribePopUp(false)
  }
  Close() {
    this.props.close()
  }
  render() {
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

const mapStateToProps = state => {
  return state
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      onSetSubscribePopUp: setSubscribePopUp
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(SubscribePopUp)
