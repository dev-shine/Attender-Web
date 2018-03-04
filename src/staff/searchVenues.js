import React, { Component } from "react"
import NavBar from "../layouts/NavBar"

import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { Grid, Row, Col, Image } from "react-bootstrap"
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
      filterTypes: {
        venue: true,
        service: false
      },
      services: {
        all: true,
        alcohol: false,
        cocktails: false,
        drinks: false,
        food: false,
        breakfast: false,
        lunch: false,
        dinner: false
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

  handleServiceClick = event => {
    const { name } = event.target
    this.setState(prev => {
      let services = prev.services
      if (name === "all") {
        services["all"] = !services["all"]
        Object.keys(prev.services).forEach(filter => {
          if (filter !== "all") {
            services[filter] = services["all"]
          }
        })
      } else {
        services[name] = !services[name]
        services["all"] = false
      }

      const venues = prev.defaultVenues.filter(venue => {
        const servicesArray = Object.keys(services).filter(
          type => services[type]
        )
        let isFiltered = false
        venue.services.forEach(type => {
          if (servicesArray.includes(type)) {
            isFiltered = true
          }
        })
        return isFiltered
      })

      return { services, venues }
    })
  }

  handleFilterBy = event => {
    this.setState(prev => {
      const filters = prev.filterTypes
      Object.keys(filters).forEach(type => {
        filters[type] = !filters[type]
      })
      return { filterTypes: filters }
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

          <Grid>
            <Row>
              Services:
              {venue.services.map((service, index) => {
                if (service && index < 3) {
                  return (
                    <Col key={index} md={2}>
                      <Image
                        src={require(`../assets/icons/venue/services/white/${service}.png`)}
                        style={{
                          width: "2.5em",
                          height: "2.5em",
                          borderRadius: "100%",
                          padding: "2px",
                          backgroundColor: "#5e5cbd"
                        }}
                      />
                    </Col>
                  )
                }
              })}
            </Row>
          </Grid>
        </div>
        <div className="col-sm-3 venue-action">
          <p>
            <FontAwesome name="map-marker" />&nbsp;&nbsp;{venue.locationName}
          </p>
          <button className="btn-round btn-passive">Interested</button>
        </div>
      </div>
    ))
  }

  renderFilterButtons = () => {
    if (this.state.filterTypes.venue) {
      return Object.keys(this.state.venueTypeFilters).map((venue, index) => {
        const wide = venue === "restaurant" ? "wide-md" : "wide-sm"
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
      })
    }

    return Object.keys(this.state.services).map((service, index) => {
      const active = this.state.services[service] ? "btn-active" : "btn-passive"
      return (
        <button
          key={index}
          active={service.active}
          name={service}
          className={`a-btn btn-round "wide-sm" ${active}`}
          style={{ fontSize: "14px" }}
          onClick={this.handleServiceClick}
        >
          {service.capitalize()}
        </button>
      )
    })
  }

  render() {
    return (
      <div>
        <NavBar />

        <div
          className="xem cont-flex"
          style={{ paddingLeft: "5%", paddingRight: "5%", height: "85vh" }}
        >
          <div className="card card-md">
            <div className="card-header">
              <h4>NEARBY VENUE</h4>
              <div className="card-filter">
                <div className="xxm">
                  <span>FILTER BY:&nbsp;&nbsp;</span>
                  {Object.keys(this.state.filterTypes).map((type, index) => {
                    const active = this.state.filterTypes[type]
                      ? "btn-dark"
                      : "btn-passive"
                    return (
                      <button
                        key={index}
                        name={type}
                        className={`a-btn btn-round  ${active}`}
                        onClick={this.handleFilterBy}
                      >
                        {`Type of ${type.capitalize()}`}
                      </button>
                    )
                  })}
                </div>
                <div className="xxm mini-container">
                  {this.renderFilterButtons()}
                </div>
              </div>
            </div>
            <div className="card-content scroll v-scroll xxm">
              {this.renderVenueLists()}
            </div>
          </div>

          <div className="card card-md">
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
                  <button
                    className="a-btn btn-round wide-sm btn-passive"
                    style={{ fontSize: "14px" }}
                  >
                    All
                  </button>
                  <button
                    className="a-btn btn-round wide-sm btn-active"
                    style={{ fontSize: "14px" }}
                  >
                    Wedding
                  </button>
                  <button
                    className="a-btn btn-round wide-sm btn-passive"
                    style={{ fontSize: "14px" }}
                  >
                    Birthday
                  </button>
                  <button
                    className="a-btn btn-round wide-md btn-passive"
                    style={{ fontSize: "14px" }}
                  >
                    Conference
                  </button>
                  <button
                    className="a-btn btn-round wide-md btn-passive"
                    style={{ fontSize: "14px" }}
                  >
                    Music Festival
                  </button>
                  <button
                    className="a-btn btn-round wide-md btn-passive"
                    style={{ fontSize: "14px" }}
                  >
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
