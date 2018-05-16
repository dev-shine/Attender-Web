import React, { Component } from "react"
import NavBar from "../layouts/NavBar"

import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { Grid, Row, Col, Image } from "react-bootstrap"
import { Link } from "react-router-dom"

import API from "../services/api"
import moment from "moment"

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
      filterEvents: {
        near: true,
        upcoming: false
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
      eventTypes: {
        all: true,
        wedding: false,
        birthday: false,
        conference: false,
        musicFestival: false,
        familyEvent: false
      },
      events: [],
      profile: {},
      loading: true
    }
  }

  componentWillMount = async () => {
    API.initRequest()
    const resultVenues = await API.get("venues")
    const resultEvents = await API.get("events")
    console.log("events", resultEvents)
    this.setState({
      defaultVenues: resultVenues.venues,
      venues: resultVenues.venues,
      defaultEvents: resultEvents.events,
      events: resultEvents.events,
      loading: false
    })
  }

  componentDidMount = () => {
    this.setState(prev => ({
      profile: JSON.parse(localStorage.getItem("com.attender.pty.ltd.profile"))
    }))
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

  handleEventsClick = eventType => {
    const eventTypes = this.state.eventTypes
    if (eventType === "all") {
      Object.keys(eventTypes).forEach(key => {
        eventTypes[key] = false
      })
    } else {
      eventTypes["all"] = false
    }
    eventTypes[eventType] = true
    this.setState({ eventTypes })
  }

  handleFilterBy = event => {
    this.setState(
      prev => {
        const filters = prev.filterTypes
        Object.keys(filters).forEach(type => {
          filters[type] = !filters[type]
        })
        return { filterTypes: filters }
      },
      () => {
        console.log("the state filter by", this.state.filterTypes)
      }
    )
  }

  handleFilterEvents = filterEvent => {
    const filterEvents = this.state.filterEvents
    Object.keys(filterEvents).forEach(key => {
      key === filterEvent
        ? (filterEvents[key] = true)
        : (filterEvents[key] = false)
    })
    this.setState({ filterEvents })
  }

  handleInterestedClick = async (id, index, event) => {
    const url = `venue/${id}/interest`
    let response = await API.post(url, { venue_id: id })
    if (response.status) {
      let venues = [...this.state.venues]
      venues[index] = response.venue
      this.setState({ venues })
    }
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
            <Link to={"/venue/profile/" + venue._id}>
              <b>{venue.name}</b>
            </Link>
          </p>
          <p>{venue.type.map(type => type.capitalize()).join(" / ")}</p>
          {venue.openingHours
            ? Object.keys(venue.openingHours).map((day, index) => (
                <p key={index}>{`${day.capitalize()}: ${moment(
                  venue.openingHours[day].start
                ).format("h:m A")} - ${moment(
                  venue.openingHours[day].end
                ).format("h:m A")}`}</p>
              ))
            : null}
          <Grid>
            <Row>
              Services:
              {venue.services.map((service, index) => {
                if (service && index < 3) {
                  return (
                    <Col key={index} md={2}>
                      <Image
                        src={require(`../../assets/icons/venue/services/white/${service}.png`)}
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
          <button
            className={`btn-round ${
              venue.interested &&
              Object.keys(venue.interested).includes(
                this.state.profile.staffId._id
              )
                ? "btn-dark"
                : "btn-passive"
            } `}
            onClick={e => this.handleInterestedClick(venue._id, index, e)}
          >
            Interested
          </button>
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
                <div className="xxm">{this.renderFilterButtons()}</div>
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
                  {Object.keys(this.state.filterEvents).map((key, index) => {
                    const active = this.state.filterEvents[key]
                      ? "btn-active"
                      : "btn-passive"
                    return (
                      <button
                        key={index}
                        className={`a-btn btn-round btn-dark ${active}`}
                        onClick={this.handleFilterEvents.bind(this, key)}
                        style={{ fontSize: "14px" }}
                      >
                        {key.capitalize()}
                      </button>
                    )
                  })}
                </div>
                <div className="xxm card-filter">
                  {Object.keys(this.state.eventTypes).map((key, index) => {
                    const active = this.state.eventTypes[key]
                      ? "btn-active"
                      : "btn-passive"
                    return (
                      <button
                        key={index}
                        className={`a-btn btn-round ${
                          key.length > 8 ? "wide-md" : "wide-sm"
                        } ${active}`}
                        style={{ fontSize: "14px" }}
                        onClick={this.handleEventsClick.bind(this, key)}
                      >
                        {key.capitalize()}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
            <div className="card-content-np scroll v-scroll xxm">
              {this.state.events.map((evnt, index) => (
                <div key={evnt._id} className="event-box row">
                  <div className="col-sm-3 event-date">
                    <p className="e-day">{moment(evnt.date).day()}</p>
                    <p className="e-month">
                      {moment(evnt.date).format("MMMM")}
                    </p>
                  </div>
                  <div className="col-sm-9 event-data">
                    <div className="col-sm-3 event-img">
                      <img
                        alt=""
                        height={150}
                        width={150}
                        src={
                          evnt.image !== "undefined"
                            ? evnt.image
                            : "https://dummyimage.com/150x150/000/fff"
                        }
                      />
                    </div>
                    <div className="col-sm-9">
                      <p className="event-title">{evnt.name}</p>
                      <p>
                        <small>
                          <FontAwesome name="clock-o" />
                          {`${moment(evnt.time.start).format(
                            "h:m A"
                          )} - ${moment(evnt.time.end).format("h:m A")}`}
                        </small>
                      </p>
                      <p>
                        <small>
                          Venue: {evnt.employer && evnt.employer.name}
                        </small>
                      </p>
                      <p>
                        <small>
                          <FontAwesome name="map-marker" />
                          {evnt.employer && evnt.employer.locationName}
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
              ))}
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
