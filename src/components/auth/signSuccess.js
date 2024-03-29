import React, { Component } from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import API from "./../../services/api"
import { Button } from "react-bootstrap"

class SignSuccess extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false
    }
  }

  onResend = async () => {
    API.initRequest()
    let response = await API.post("auth/resend", {
      email: this.props.match.params.email,
      mobile: this.props.match.params.mobile
    })
    alert(
      "We have re-sent the confirmation link to your email. Please check your inbox (or spam) and click the link to confirm your account."
    )
  }

  render() {
    return (
      <div className="bg bg-ss">
        <div className="container">
          <div className="ss-content">
            <img alt="" src={require("./../../assets/logo3.png")} />
            <p className="ss-title">SIGN UP SUCCESS</p>
            <p className="ss-body">
              We have sent the confirmation link to your email. Please check
              your inbox (or spam) and click the link to confirm your account.
            </p>
            <p className="ss-foot">
              Couldn't find your confirmation email in your inbox or spam/junk?
              Click below to resend.
            </p>
            <Button
              onClick={() => this.onResend()}
              className="a-btn btn-round btn-active wide-xm"
            >
              Resend Confirmation
            </Button>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return state
}

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(SignSuccess)
