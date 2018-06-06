import React from "react"

import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { push } from "react-router-redux"

class SocialShare extends React.Component {
  constructor(props) {
    super(props)
  }
  state = {
    venueData: this.props.venueData
  }
  render() {
    const current_domain = window.location.href
    return (
      <div className="component SocialShare">
        <a
          className="sbg-button sbg-button-facebook"
          data-sbg-network="facebook"
          data-sbg-url={current_domain}
          data-sbg-title={this.state.venueData.name}
          data-sbg-summary={this.state.venueData.info}
          data-sbg-image={this.state.venueData.image}
          data-sbg-width="600"
          data-sbg-height="368"
        >
          <i className="sbg-button-icon fa fa-facebook" />
        </a>

        <a
          className="sbg-button sbg-button-twitter"
          data-sbg-network="twitter"
          data-sbg-text={this.state.venueData.info}
          data-sbg-via={this.state.venueData.managerName}
          data-sbg-hashtags={`${this.state.venueData.tag1}, ${
            this.state.venueData.tag2
          } `}
          data-sbg-width="600"
          data-sbg-height="258"
        >
          <i className="sbg-button-icon fa fa-twitter" />
        </a>

        <a
          className="sbg-button sbg-button-linkedin"
          data-sbg-network="linkedin"
          data-sbg-url={current_domain}
          data-sbg-title={this.state.venueData.name}
          data-sbg-source={this.state.venueData.managerName}
          data-sbg-summary={this.state.venueData.info}
          data-sbg-width="585"
          data-sbg-height="471"
        >
          <i className="sbg-button-icon fa fa-linkedin" />
        </a>

        <a
          className="sbg-button sbg-button-google-plus"
          data-sbg-network="google-plus"
          data-sbg-url={current_domain}
          data-sbg-width="500"
          data-sbg-height="505"
        >
          <i className="sbg-button-icon fa fa-google-plus" />
        </a>

        <a
          className="sbg-button sbg-button-pinterest"
          data-sbg-network="pinterest"
          data-sbg-url={current_domain}
          data-sbg-media={this.state.venueData.image}
          data-sbg-description={this.state.venueData.info}
          data-sbg-width="750"
          data-sbg-height="322"
        >
          <i className="sbg-button-icon fa fa-pinterest" />
        </a>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return state
}

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(SocialShare)
