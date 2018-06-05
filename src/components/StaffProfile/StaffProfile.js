import React from "react"

import { Link } from "react-router-dom"
import { Button } from "react-bootstrap"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { push } from "react-router-redux"

import NavBar from "./../layouts/NavBar"
import API from "./../../services/api"

// import "./VenueProfile.css"

class StaffProfile extends React.Component {
  constructor(props) {
    super(props)
  }
  state = {
    staff: {},
    profile: {}
  }
  fetch = async () => {
    const {
      match: { params }
    } = this.props
    let staff_id = params.staff_id
    const data = await API.get("staff/" + staff_id + "/show")
    console.log(data)
    this.setState({ staff: data.staff })
  }
  componentWillMount() {
    API.initRequest()
    this.fetch()
  }
  componentDidMount = async () => {
    let profile = await API.getProfile()
    this.setState({ profile })
  }
  render() {
    return (
      <div>
        <NavBar />
        <div className="container xem app-body">
          <div className="container StaffProfile">
            <div className="app-body-header">
              <h1>Staff Profile</h1>
              <p>&nbsp;</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return state
}

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(StaffProfile)
