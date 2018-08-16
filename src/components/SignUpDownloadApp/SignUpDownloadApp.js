import React from "react"
import NavBar from "./../layouts/NavBar"

import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { push } from "react-router-redux"

class SignUpDownloadApp extends React.Component {
  constructor(props) {
    super(props)
  }
  state = {
    venueData: this.props.venueData
  }
  render() {
    const current_domain = window.location.href
    return (
      <div className="bg-default SignUpDownloadApp">
        <NavBar />
        <div className="container xem">
          <div className="content-header">
            <h1>PROFILE SET UP</h1>
            <p className="help-text">
              We need just a few details to get you started
            </p>
          </div>
          <div className="content">
            <h2>Download the app</h2>
            <p>
              Thanks for signing up to Attender. We look forward to providing
              you with a platform to find hospitality work.
            </p>
            <p>
              Your experience will continue on our mobile app. Please click one
              of the links below to download and finish registering your
              Attender profile.
            </p>

            <div className="buttons clearfix">
              <a href="https://itunes.apple.com/us/app/attender-find-work-or-staff/id1268565437?ls=1&mt=8">
                <img src="https://uploads-ssl.webflow.com/592c6987318fb11080a289aa/5b10ac35f2733bb2fbe54cc0_download-iOS-h104.png" />
              </a>
              <a href="https://play.google.com/store/apps/details?id=com.attender">
                <img src="https://uploads-ssl.webflow.com/592c6987318fb11080a289aa/5b10ac358810830f168096f1_download-Play-store-h104.png" />
              </a>
            </div>
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
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpDownloadApp)
