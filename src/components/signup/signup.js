import React, { Component } from "react"
// import './signup.css';
import "./../.././styles/style.css"
import {
  Button,
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock,
  Checkbox,
  Row,
  Col
} from "react-bootstrap"
import { Link } from "react-router-dom"

const FieldGroup = ({ id, label, help, ...props }) => {
  return (
    <FormGroup controlId={id}>
      <ControlLabel className="label-style">{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  )
}

class Signup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "",
      email: "",
      mobile: "",
      password: ""
    }
  }

  onLogin = () => {
    console.log("email", this.state.email)
    console.log("password", this.state.password)
  }

  onChangeInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return (
      <div>
        <Row className="row-container">
          <Col sm={4} className="col-container-left">
            <img
              src={require("./../../assets/half-background image.png")}
              className="background-image"
            />
            <div>
              <img
                src={require("./../../assets/logo&Text.png")}
                className="logo"
              />
            </div>
          </Col>
          <Col sm={6} className="col-container-right">
            <div className="">
              <header className="app-header">
                <Row>
                  <Col sm={1} className="align-center" />
                  <Col>
                    <h1 className="app-title pull-left">Back to Options</h1>
                  </Col>
                  <Col smOffset={4}>
                    <h1 className="menu-home-style">Home</h1>
                  </Col>
                </Row>
              </header>

              <Row>
                <Col smOffset={5} sm={8}>
                  <div className="header-style">
                    <h5>
                      {`Already have an account? `}
                      <a href="#">Click here to login.</a>
                    </h5>
                  </div>
                  <div className="login-button-container">
                    <Button className="facebook-button" onClick={this.onLogin}>
                      Login with Facebook
                    </Button>
                    <Button
                      className="google-button pull-right"
                      onClick={this.onLogin}
                    >
                      Sign in with Google+
                    </Button>
                  </div>
                </Col>
                <Col smOffset={5} sm={8} className="col-inner-container-left">
                  <div>
                    <form>
                      <FieldGroup
                        id="formControlsEmail"
                        type="text"
                        name="name"
                        label="Name"
                        placeholder=""
                        value={this.state.name}
                        onChange={this.onChangeInput}
                      />
                      <FieldGroup
                        id="formControlsEmail"
                        type="email"
                        name="email"
                        label="Email"
                        placeholder=""
                        value={this.state.email}
                        onChange={this.onChangeInput}
                      />
                      <FieldGroup
                        id="formControlsEmail"
                        type="email"
                        name="mobile"
                        label="Mobile"
                        placeholder=""
                        value={this.state.mobile}
                        onChange={this.onChangeInput}
                      />
                      <FieldGroup
                        id="formControlsEmail"
                        type="password"
                        name="password"
                        label="Password"
                        placeholder=""
                        value={this.state.password}
                        onChange={this.onChangeInput}
                      />
                      <div align="center">
                        <Checkbox className="cb-style" />
                        <h5 className="termscondition-top-style">
                          By confirming your account you agree to our
                        </h5>
                        <h5 className="termscondition-bottom-style">
                          <Link target="_blank" to="/terms-and-condition">
                            Terms and Conditions.
                          </Link>
                        </h5>
                        <Button onClick={this.onLogin}>Confirm</Button>
                      </div>
                    </form>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Signup
