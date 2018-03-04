import React, { Component } from "react"
import NavBar from "../layouts/NavBar"

import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import classNames from "classnames"
import API from "../services/api"

const FontAwesome = require("react-fontawesome")

class SearchVenues extends Component {
  constructor(props) {
    super(props)
    this.state = {
      step: 1,
      isLoading: false,
      venues: [],
      venueTypeFilters: {
        all: true,
        cafe: false,
        bar: false,
        club: false,
        pub: false,
        restaurant: false
      },
      loading: true
    }
  }

  componentWillMount = async () => {
    const results = await API.get("/venues")
    console.log("results", results)
    this.setState({
      defaultVenues: results.venues,
      venues: results.venues,
      loading: false
    })
  }

  handleVenueTypeClick = event => {
    const { name } = event.target
    this.setState(prev => {
      let filters = prev.venueTypeFilters
      if (name === "all") {
        filters["all"] = !filters["all"]
        Object.keys(prev.venueTypeFilters).forEach(filter => {
          if (filter !== "all") {
            filters[filter] = filters["all"]
          }
        })
      } else {
        filters[name] = !filters[name]
        filters["all"] = false
      }

      const venues = prev.defaultVenues.filter(venue => {
        const filtersArray = Object.keys(filters).filter(type => filters[type])
        let isFiltered = false
        venue.type.forEach(type => {
          if (filtersArray.includes(type)) {
            isFiltered = true
          }
        })
        return isFiltered
      })

      return { venueTypeFilters: filters, venues }
    })
  }

  renderVenueLists = () => {
    if (this.state.loading) {
      return <div>Loading...</div>
    }
    return this.state.venues.map((venue, index) => (
      <div key={index} className="venue-box row">
        <div className="col-sm-3 venue-img">
          <img alt="" src={venue.image} />
        </div>
        <div className="col-sm-6 venue-info">
          <p className="venue-name">
            <b>{venue.name}</b>
          </p>
          <p>{venue.type.map(type => type.capitalize()).join(" / ")}</p>
          <p>Monday - Friday: 10AM - 11PM</p>
          <p>Saturday - Sunday: 10AM - 11PM</p>
          <p>Services: </p>
        </div>
        <div className="col-sm-3 venue-action">
          <p>
            <FontAwesome name="map-marker" />&nbsp;&nbsp;Sydney, CBD
          </p>
          <button className="btn-round btn-dark">Interested</button>
        </div>
      </div>
    ))
  }

  render() {
    return (
      <div>
        <NavBar />

        <div className="container xem cont-flex">
          <div className="card card-md">
            <div className="card-header">
              <h4>NEARBY VENUE</h4>
              <div className="card-filter">
                <div className="xxm">
                  <span>FILTER BY:&nbsp;&nbsp;</span>
                  <button className="a-btn btn-round btn-dark">
                    Type of Venue
                  </button>
                  <button className="a-btn btn-round btn-passive">
                    Type of Service
                  </button>
                </div>
                <div className="xxm mini-container">
                  {Object.keys(this.state.venueTypeFilters).map(
                    (venue, index) => {
                      const wide =
                        venue === "restaurant" ? "wide-md" : "wide-sm"
                      const active = this.state.venueTypeFilters[venue]
                        ? "btn-active"
                        : "btn-passive"
                      return (
                        <button
                          key={index}
                          active={venue.active}
                          name={venue}
                          className={`a-btn btn-round ${wide} ${active}`}
                          style={{ fontSize: "14px" }}
                          onClick={this.handleVenueTypeClick}
                        >
                          {venue.capitalize()}
                        </button>
                      )
                    }
                  )}
                </div>
              </div>
            </div>
            <div className="card-content scroll v-scroll xxm">
              {this.renderVenueLists()}
            </div>
          </div>

          <div className="card card-sm">
            <div className="card-header">
              <h4>UPCOMING EVENTS NEAR YOU</h4>
              <div className="card-filter">
                <div className="xxm">
                  <span>FILTER BY:&nbsp;&nbsp;</span>
                  <button className="a-btn btn-round wide-md btn-dark">
                    Events Near You
                  </button>
                  <button className="a-btn btn-round wide-md btn-passive">
                    Upcoming Events
                  </button>
                </div>
                <div className="xxm card-filter">
                  <button className="a-btn btn-round wide-sm btn-passive">
                    All
                  </button>
                  <button className="a-btn btn-round wide-md btn-active">
                    Wedding
                  </button>
                  <button className="a-btn btn-round wide-md btn-passive">
                    Birthday
                  </button>
                  <button className="a-btn btn-round wide-md btn-passive">
                    Conference
                  </button>
                  <button className="a-btn btn-round wide-md btn-passive">
                    Music Festival
                  </button>
                  <button className="a-btn btn-round wide-md btn-passive">
                    Family Events
                  </button>
                </div>
              </div>
            </div>
            <div className="card-content-np scroll v-scroll xxm">
              <div className="event-box row">
                <div className="col-sm-3 event-date">
                  <p className="e-day">21</p>
                  <p className="e-month">August</p>
                </div>
                <div className="col-sm-9 event-data">
                  <div className="col-sm-3 event-img">
                    <img
                      alt=""
                      src="http://www.venue360.co.uk/assets/3314/0061/9043/riverside-ltfc2.jpg"
                    />
                  </div>
                  <div className="col-sm-9">
                    <p className="event-title">Wow Power</p>
                    <p>
                      <small>
                        <FontAwesome name="clock-o" /> 10:00AM - 12:00PM
                      </small>
                    </p>
                    <p>
                      <small>Venue: Oasis Beach</small>
                    </p>
                    <p>
                      <small>
                        <FontAwesome name="map-marker" /> Sydney, CBC
                      </small>
                    </p>
                    <div className="event-action">
                      {/* TODO Identify correct logic on the lines below */}
                      <a href="#">
                        <FontAwesome name="ellipsis-v" size="2x" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="event-box row">
                <div className="col-sm-3 event-date">
                  <p className="e-day">21</p>
                  <p className="e-month">August</p>
                </div>
                <div className="col-sm-9 event-data">
                  <div className="col-sm-3 event-img">
                    <img
                      alt=""
                      src="http://www.venue360.co.uk/assets/3314/0061/9043/riverside-ltfc2.jpg"
                    />
                  </div>
                  <div className="col-sm-9">
                    <p className="event-title">Wow Power</p>
                    <p>
                      <small>
                        <FontAwesome name="clock-o" /> 10:00AM - 12:00PM
                      </small>
                    </p>
                    <p>
                      <small>Venue: Oasis Beach</small>
                    </p>
                    <p>
                      <small>
                        <FontAwesome name="map-marker" /> Sydney, CBC
                      </small>
                    </p>
                    <div className="event-action">
                      {/* TODO Identify correct logic on the lines below */}
                      <a href="#">
                        <FontAwesome name="ellipsis-v" size="2x" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="event-box row">
                <div className="col-sm-3 event-date">
                  <p className="e-day">21</p>
                  <p className="e-month">August</p>
                </div>
                <div className="col-sm-9 event-data">
                  <div className="col-sm-3 event-img">
                    <img
                      alt=""
                      src="http://www.venue360.co.uk/assets/3314/0061/9043/riverside-ltfc2.jpg"
                    />
                  </div>
                  <div className="col-sm-9">
                    <p className="event-title">Wow Power</p>
                    <p>
                      <small>
                        <FontAwesome name="clock-o" /> 10:00AM - 12:00PM
                      </small>
                    </p>
                    <p>
                      <small>Venue: Oasis Beach</small>
                    </p>
                    <p>
                      <small>
                        <FontAwesome name="map-marker" /> Sydney, CBC
                      </small>
                    </p>
                    <div className="event-action">
                      {/* TODO Identify correct logic on the lines below */}
                      <a href="#">
                        <FontAwesome name="ellipsis-v" size="2x" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(SearchVenues)
