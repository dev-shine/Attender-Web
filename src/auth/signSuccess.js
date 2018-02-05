import React, { Component } from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import API from '.././services/api';


class SignSuccess extends Component {

  constructor (props) {
    super(props)
    this.state = {
      loading: false
    }
  }

  onResend = async () => {
    let response = await API.post('auth/resend', {})
    console.log(response);
  }

  render() {
    return (
      <div className="bg bg-ss">
        <div className="container">
          <div className="ss-content">
            <img src={require('.././assets/logo3.png')}/>
            <p className="ss-title">SIGN UP SUCCESS</p>
            <p className="ss-body">We have sent the confirmation link to your email. Please check your inbox (or span) and click the link to confirm your account.</p>
            <p className="ss-foot">Couldn't find your confirmation email in your inbox or spam/junk? Click below to resend.</p>
            <button onClick={()=>this.onResend()} className="a-btn btn-round btn-active wide-xm">Resend Confirmation</button>
        </div>
        </div>
      </div>
    )
  }

}



const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignSuccess)
