import React, { Component } from "react"
import { push } from "react-router-redux"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import API from ".././services/api"

class Registration extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "",
      email: "",
      mobile: "",
      password: "",
      confirm: false
    }
  }

  onChangeInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onConfirm = () => {
    this.setState(prevState => ({ confirm: !prevState.confirm }))
  }

  onRegister = async () => {
    if (this.state.confirm) {
      let response = await API.post("auth/register", {
        fullname: this.state.name,
        email: this.state.email,
        mobile: this.state.mobile,
        password: this.state.password
      })

      if (response.status) {
        API.setToken(response.token)
        this.props.onSuccess()
      } else {
        alert(response.messageCode)
      }
    } else {
      alert("You need to confirm to Terms and Conditions")
    }
  }

  renderForm = () => {
    return (
      <div className="reg-form">
        <form onSubmit={this.handleFormSubmit}>
          <label class="label-style control-label">Full Name</label>
          <input
            onChange={this.onChangeInput}
            type="text"
            name="name"
            class="form-control"
          />
          <label class="label-style control-label">Email</label>
          <input
            onChange={this.onChangeInput}
            type="email"
            name="email"
            class="form-control"
          />
          <label class="label-style control-label">Mobile</label>
          <input
            onChange={this.onChangeInput}
            type="text"
            name="mobile"
            class="form-control"
          />
          <label class="label-style control-label">Password</label>
          <input
            onChange={this.onChangeInput}
            type="password"
            name="password"
            class="form-control"
            autoComplete="new-password"
          />
        </form>
      </div>
    )
  }

  renderSocial = () => {
    return (
      <div className="reg-social">
        <p onClick={() => this.props.onBack()}>
          Already have an account?&nbsp;&nbsp;<a>Click here to login</a>
        </p>
        <div className="reg-social-btns">
          <button className="btn-social btn-fb">
            <i className="fa fa-facebook" />Sign Up with Facebook
          </button>
          <button className="btn-social btn-google">
            <i className="fa fa-google-plus" />Sign Up with Google
          </button>
        </div>
      </div>
    )
  }

  renderConfirmation = () => {
    return (
      <div className="reg-foot">
        <div className="reg-confirmation">
          <input type="checkbox" onClick={() => this.onConfirm()} />
          <p>
            By confirming your account you agree to our Terms and Conditions.
          </p>
        </div>
        <div className="reg-action">
          <button
            className="a-btn btn-round btn-outline-dark"
            onClick={() => this.onRegister()}
          >
            Confirm
          </button>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="reg-container">
        <div className="reg-bg">
          <div className="reg-logo">
            <img
              className="reg-main-logo"
              alt=""
              src={require(".././assets/logo&Text.png")}
            />
          </div>
        </div>
        <div className="reg-content">
          <div className="row">
            <div className="col-sm-3">
              <a onClick={() => this.props.onBack()}>
                <i className="fa fa-long-arrow-left" />&nbsp;&nbsp;Back to
                Options
              </a>
            </div>
            <div className="col-sm-9">
              <a>Home</a>

              {this.renderSocial()}
              {this.renderForm()}
              {this.renderConfirmation()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      onBack: () => push("/"),
      onSuccess: () => push("/success")
    },
    dispatch
  )

export default connect(null, mapDispatchToProps)(Registration)
