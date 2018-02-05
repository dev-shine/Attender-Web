import React, { Component } from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import API from '.././services/api';

class AccountConfirmed extends Component {

  constructor (props) {
    super(props)
    this.state = {
      profile: {}
    }
  }

  async componentWillMount() {
    const { match: { params } } = this.props;
    let verification = params.verification
    let token = params.token
    let response = await API.post('auth/verify', {token,verification})
    if (response.status) {
      API.setToken(response.token)
      let profile = await API.get('auth/current')
      if (profile.status) {
        this.setState({ profile: profile.data })
      }
    } else {
      this.props.onMain()
    }
  }

  render() {
    return (
      <div className="bg bg-acc-confirmed">
        <div className="container">
          <div className="row">
            <div className="col-sm-6 col-sm-offset-6">
              <div className="acc-c-content">
                <div className="acc-c-action">
                  <a onClick={()=> this.props.onMain()} className="">Home</a>
                  <a onClick={()=> this.props.onSignUp()} className="">Sign Up</a>
                </div>
                <p className="acc-c-title">ACCOUNT CONFIRMED</p>
                <div className="acc-c-body">
                  <p>
                    Thank you for confirming your account {this.state.profile.fullname},
                    click Continue to finalise your Attender profile.
                  </p>
                </div>
                <button className="a-btn btn-round btn-outline" onClick={()=> this.props.onMain()}>Continue</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

}



const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => bindActionCreators({
  onMain: ()=> push('/'),
  onSignUp: ()=> push('/register')
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountConfirmed)
