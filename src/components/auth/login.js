import React, { Component } from "react"
import "../.././styles/style.css"
import {
  Button,
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock,
  Row,
  Col
} from "react-bootstrap"
import { push } from "react-router-redux"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import OverlayLoader from "react-loading-indicator-overlay/lib/OverlayLoader"

import API from ".././services/api"

const FieldGroup = ({ id, label, help, ...props }) => {
  return (
    <FormGroup controlId={id}>
      <ControlLabel className="label-style">{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  )
}

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: "Attender",
      email: "",
      password: "",
      isLoading: false,
      error: false
    }
  }

  onLogin = async () => {
    this.setState({ isLoading: true })
    let response = await API.post("auth/login", {
      email: this.state.email,
      password: this.state.password
    })
    if (response.status) {
      API.setToken(response.token)
      this.setState({ isLoading: true })
      this.props.goMain()
    } else {
      this.setState({ isLoading: false, error: true, password: "" })
    }
  }

  onChangeInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  renderLoader = () => (
    <div className="loader-position">
      <OverlayLoader
        color={"#47C1DD"} // default is white
        loader="RingLoader" // check below for more loaders
        text=""
        active={this.state.isLoading}
        backgroundColor={"black"} // default is black
        opacity=".9" // default is .9
      />
    </div>
  )

  renderError = () => {
    return (
      <div className={this.state.error ? "error show" : "error"}>
        <span>Invalid Credentials</span>
      </div>
    )
  }

  render() {
    return (
      <div>
        <Row className="row-container">
          <Col sm={6} className="col-container-left">
            <div>
              <header className="app-header">
                <Row>
                  <Col sm={2} className="align-center">
                    <img
                      alt=""
                      src={require("../../assets/logo.png")}
                      className="header-logo"
                    />
                  </Col>
                  <Col>
                    <h1 className="app-title pull-left">{this.state.title}</h1>
                  </Col>
                </Row>
              </header>

              <Row>
                <Col smOffset={2} sm={8} className="col-inner-container-left">
                  <div>
                    <form>
                      {this.renderError()}
                      <FieldGroup
                        id="formControlsEmail"
                        type="email"
                        name="email"
                        label="Username"
                        placeholder=""
                        value={this.state.email}
                        onChange={this.onChangeInput}
                      />
                      <FieldGroup
                        id="formControlsPassword"
                        label="Password"
                        type="password"
                        name="password"
                        placeholder=""
                        value={this.state.password}
                        onChange={this.onChangeInput}
                      />
                      <Button className="pull-right" onClick={this.onLogin}>
                        Login
                      </Button>
                    </form>
                  </div>
                </Col>

                <Col smOffset={2} sm={8} className="social-container">
                  <div>
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
                  <div className="social-container">
                    <h5 className="text-align">
                      <a
                        href="javascript:void(0)"
                        onClick={() => this.props.goRegister()}
                      >
                        Sign up
                      </a>
                      {` here if you don't have an account`}
                    </h5>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
          <Col sm={6} className="col-container-right">
            <div>
              <div className="label-title-style">
                <h1>Attender</h1>
                <h4>Hospitality work made very simple</h4>
              </div>
              <img
                alt=""
                src={require("../../assets/half-logo.png")}
                className="half-logo"
              />

              <div className="social-button-position">
                <img
                  alt=""
                  src={require("../../assets/fb-logo.png")}
                  className="logo-spacer"
                />
                <img
                  alt=""
                  src={require("../../assets/ig-logo.png")}
                  className="logo-spacer"
                />
                <img alt="" src={require("../../assets/twitter.png")} />
                <h5 className="pull-right credit-style">
                  © {new Date().getFullYear()} Attender Pty Ltd. Terms and
                  Conditions | Privacy Policy
                </h5>
              </div>
            </div>
          </Col>
        </Row>
        {this.state.isLoading ? this.renderLoader() : null}
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
      goMain: () => push("/"),
      goRegister: () => push("/register")
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(Login)
