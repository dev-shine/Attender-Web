import React, { Component } from "react"
import "./lookingFor.css"
import "../.././styles/style.css"
import { Button, Row, Col } from "react-bootstrap"
import ReactCSSTransitionGroup from "react-transition-group/CSSTransitionGroup"
import { push } from "react-router-redux"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import API from ".././services/api"

class lookingFor extends Component {
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
    API.logout()
    this.props.goMain()
  }

  onProfileSetup = () => {
    this.props.goProfileSetup()
  }

  onEmployerSetup = () => {
    this.props.goEmployerSetup()
  }

  onChangeInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return (
      <ReactCSSTransitionGroup
        transitionName="example"
        transitionAppear={true}
        transitionAppearTimeout={500}
        transitionEnter={false}
        transitionLeave={false}
      >
        <div>
          <Row className="row-container">
            <Col sm={4} className="col-container-left">
              <img
                alt=""
                src={require("../../assets/looking-for-bg.png")}
                className="background-image"
              />
            </Col>
            <Col sm={5} className="looking-col-container-right">
              <div className="">
                <header className="app-header">
                  <Row>
                    <Col sm={1} className="align-center" />
                    <Col>
                      <h1
                        className="back-title pull-left"
                        onClick={() => this.onLogin()}
                      >
                        <i className="fa fa-long-arrow-left" />&nbsp;&nbsp;Back
                        to Login
                      </h1>
                    </Col>
                  </Row>
                </header>

                <Row>
                  <Col smOffset={5} sm={8}>
                    <div align="center">
                      <h1 className="title-style">Getting started</h1>
                      <div className="text-container">
                        <h4 className="subtitle-style">
                          Hospitality just got easier.
                        </h4>
                        <h4 className="subtitle-style">
                          Choose your path below to begin.
                        </h4>
                      </div>
                    </div>
                  </Col>
                  <Col smOffset={5} sm={8} className="col-inner-container-left">
                    <div>
                      <div className="btn-margin-top" align="center">
                        <div className="btn-margin">
                          <Button
                            className="btn-looking accent"
                            onClick={this.onProfileSetup}
                          >
                            Looking for work
                          </Button>
                        </div>
                        <div>
                          <Button
                            className="btn-looking"
                            onClick={this.onEmployerSetup}
                          >
                            Looking to hire
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </div>
      </ReactCSSTransitionGroup>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      goProfileSetup: () => push("/profile-setup"),
      goEmployerSetup: () => push("/employer"),
      goMain: () => push("/")
    },
    dispatch
  )

export default connect(null, mapDispatchToProps)(lookingFor)
