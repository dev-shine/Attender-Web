import React, { Component } from "react"
import { push } from "react-router-redux"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import "../.././styles/global.css"
import "../.././styles/style.css"

class employerSetup extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  onHome = () => {
    this.props.goHome()
  }

  onVenueSetup = () => {
    this.props.goVenueSetup()
  }

  onOrganiserSetup = () => {
    this.props.goOrganiserSetup()
  }

  render() {
    return (
      <div className="bg bg-employer-setup">
        <div className="container">
          <div className="emp-menu">
            <a onClick={this.onHome} className="a-dlink casted">
              Home
            </a>
            <a className="a-dlink casted">Sign Up</a>
          </div>
          <div className="emp-content">
            <h1>GREAT,</h1>
            <h4>YOU ARE LOOKING TO HIRE STAFF!</h4>
            <p className="xdm">
              To give you the right profile we need to know if you are setting
              up as a venue/establishment or you are organising a one off event
              e.g. a festival, wedding, or birthday.
            </p>
          </div>
          <div className="emp-action">
            <button
              onClick={this.onVenueSetup}
              className="pull-left a-btn btn-round btn-active sm casted"
            >
              Venue / Establishment
            </button>
            <button
              onClick={this.onOrganiserSetup}
              className="pull-right a-btn btn-round btn-outline sm"
            >
              Event Organiser
            </button>
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      goOrganiserSetup: () => push("/organiser-setup"),
      goVenueSetup: () => push("/venue-setup"),
      goHome: () => push("/looking-for")
    },
    dispatch
  )

export default connect(null, mapDispatchToProps)(employerSetup)
