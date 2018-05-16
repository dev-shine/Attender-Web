import React from "react"
import NavBar from "../layouts/NavBar"
import SubscribePopUp from "../layouts/SubscribePopUp/SubscribePopUp"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { push } from "react-router-redux"
import { subscribeMe } from "./../actions/myProfile-actions"

class SubscriptionOffer extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        <NavBar />
        <SubscribePopUp
          close={() => {
            this.props.goToStaff()
          }}
        />
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
      goToStaff: staffId => push(`/find-staff`),
      onSubscribeMe: subscribeMe
    },
    dispatch
  )
export default connect(mapStateToProps, mapDispatchToProps)(SubscriptionOffer)
