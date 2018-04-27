import React from "react"

import { Link } from "react-router-dom"
import { Button } from "react-bootstrap"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { push } from "react-router-redux"

import NavBar from "../layouts/NavBar"
import API from "./../services/api"

import "./VenueProfile.css"

class VenueProfile extends React.Component {
  constructor(props) {
    super(props)
  }
  state = {
    venue: {}
  }
  fetch = async () => {
    const { match: { params } } = this.props
    let venue_id = params.venue_id
    const data = await API.get("venues/" + venue_id)
    this.setState({ venue: data.venue })
  }
  componentWillMount() {
    API.initRequest()
    this.fetch()
  }
  render() {
    return (
      <div>
        <NavBar />
        <div className="container xem app-body">
          <div className="container VenueProfile">
            <div className="app-body-header">
              <h1>Your Venue Profile</h1>
              <p>
                Here you can see your venue and manage your staff's to your
                venue
              </p>
            </div>
            <div className="row app-body-boxed">
              <div className="col-md-6 app-body-divider">
                <h3>The Venue</h3>
                <div className="venue-avatar">
                  <span className="venue-avatar-overlay" />
                  <img src={this.state.venue.image} />
                </div>
                <div className="venue-details-container container">
                  <span className="venue-edit-toggle" />
                  <div className="venue-detail venue-name row">
                    <label className="col-md-4">Venue Name</label>
                    <strong>LuMi Bar & Dining</strong>
                  </div>
                  <div className="venue-detail venue-manager-name row">
                    <label className="col-md-4">Manager's Name</label>
                    <strong>Andrew Orsen</strong>
                  </div>
                  <div className="venue-detail venue-type app-body-centered-title">
                    <label>Type of Venue</label>
                    <ul className="venue-types app-body-circle-list">
                      <li>
                        <img src="" />
                        <span>Cafe</span>
                      </li>
                      <li>
                        <img src="" />
                        <span>Restaurant</span>
                      </li>
                      <li>
                        <img src="" />
                        <span>Bar</span>
                      </li>
                      <li>
                        <img src="" />
                        <span>Club</span>
                      </li>
                      <li>
                        <img src="" />
                        <span>Pub</span>
                      </li>
                    </ul>
                  </div>
                  <div className="venue-detail venue-info">
                    <ul className="venue-type-summary">
                      <li>Cafe/Restaurant</li>
                      <li>High-end Dining</li>
                    </ul>
                    <p>
                      Beneath a multitude of pendents lights creating an
                      intimate atmosphere, LuMi Dining comes to life under the
                      guidance of Chef Federico Zanellato and his wife and
                      Sommelier, Michela.
                    </p>
                  </div>
                  <div className="venue-detail venue-schedule app-body-centered-title">
                    <label>Opening Hours</label>
                    <table>
                      <thead>
                        <tr>
                          <th>Monday</th>
                          <th>Tuesday</th>
                          <th>Wednesday</th>
                          <th>Thursday</th>
                          <th>Friday</th>
                          <th>Saturday</th>
                          <th>Sunday</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>-</td>
                          <td>-</td>
                          <td>-</td>
                          <td>-</td>
                          <td>-</td>
                          <td>-</td>
                          <td>-</td>
                        </tr>
                        <tr>
                          <td>-</td>
                          <td>-</td>
                          <td>-</td>
                          <td>-</td>
                          <td>-</td>
                          <td>-</td>
                          <td>-</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="venue-detail venue-services app-body-centered-title">
                    <label>Services</label>
                    <ul className="venue-services app-body-circle-list">
                      <li>
                        <img src="" />
                        <span>Alcohol</span>
                      </li>
                      <li>
                        <img src="" />
                        <span>Drinks</span>
                      </li>
                      <li>
                        <img src="" />
                        <span>Food</span>
                      </li>
                      <li>
                        <img src="" />
                        <span>Pokies</span>
                      </li>
                      <li>
                        <img src="" />
                        <span>Cocktails</span>
                      </li>
                    </ul>
                  </div>
                  <div className="venue-detail venue-location app-body-centered-title">
                    <label>Location</label>
                    <address>Surry Hills, CBD Sydney</address>
                    <img src="" />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <h3>Your Staff</h3>
                <p>Under constrution</p>
              </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(VenueProfile)
