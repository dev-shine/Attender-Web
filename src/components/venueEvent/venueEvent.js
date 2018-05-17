import React, { Component } from "react"
import "./venueEvent.css"
import "./../.././styles/style.css"
import {
  Button,
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock,
  Checkbox,
  Radio,
  Grid,
  Row,
  Col,
  Image,
  Form
} from "react-bootstrap"

class venueEvent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: ""
    }
  }

  onLogin = () => {
    console.log("email", this.state.email)
    console.log("password", this.state.password)
  }

  render() {
    return (
      <div>
        <Row className="row-container">
          <Col sm={6} className="col-container-left">
            <div>
              <img
                src={require("./../../assets/background-2.png")}
                className="background-image"
              />
            </div>
            <div>
              <h1 className="menu-home-style">Home</h1>
              <h1 className="menu-signup-style">Sign Up</h1>
            </div>
            <div>
              <div className="text-container" align="center">
                <h1 className="title-style-large">GREAT,</h1>
                <div className="subtext-container">
                  <h4 className="title-style">{`YOU'RE LOOKING TO HIRE STAFF!`}</h4>
                  <div className="content-style">
                    <h4 className="title-style">
                      To give you the right profile we need to know if
                    </h4>
                    <h4 className="title-style">{`you're setting up as a venue/establishment or if`}</h4>
                    <h4 className="title-style">{`you're organising a one off event e.g. a festival,`}</h4>
                    <h4 className="title-style">{`wedding or birthday.`}</h4>
                  </div>
                </div>
                <div className="btn-container">
                  <Button className="pull-left" onClick={this.onLogin}>
                    Venue/Establishment
                  </Button>
                  <Button className="pull-right" onClick={this.onLogin}>
                    Event Organiser
                  </Button>
                </div>
              </div>
            </div>
          </Col>
          <Col sm={6} className="col-container-right">
            <div align="center">
              <img
                src={require("./../../assets/logo&Text.png")}
                className="logo"
              />
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

export default venueEvent
