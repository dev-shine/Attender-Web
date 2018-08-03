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
            <h1>PROFILE SETUP</h1>
            <p className="help-text">
              To continue signing up as staff, please download our BETA App.
            </p>
          </div>
          <div className="content">
            <div class="phones-top">
              <div id="phones-top-wrap">
                <img src="https://uploads-ssl.webflow.com/592c6987318fb11080a289aa/592c810777d1db4322b676c2_hero-phones.png" />
              </div>
            </div>
            <div className="buttons">
              <p>
                We have just launched our beta <br /> apps and are now available
                to download. <br />
                <br />Get the Attender app now.
              </p>
              <br />
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
export default connect(mapStateToProps, mapDispatchToProps)(SignUpDownloadApp)
