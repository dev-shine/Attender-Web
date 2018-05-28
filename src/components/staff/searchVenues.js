import React, { Component } from "react"
import NavBar from "./../layouts/NavBar"

import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { Grid, Row, Col, Image } from "react-bootstrap"
import { Link } from "react-router-dom"

import API from "./../../services/api"
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
        near: {
          label: "Events near you",
          value: true
        },
        upcoming: {
          label: "Upcoming events",
          value: false
        }
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
        ? (filterEvents[key].value = true)
        : (filterEvents[key].value = false)
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
  renderOpeningHoursDOM(data) {
    let isWeekdaysFormat = "",
      isWeekendFormat = ""
    if (data != undefined) {
      Object.keys(data).map((day, index) => {
        switch (day) {
          case "monday":
          case "tuesday":
          case "wednesday":
          case "thursday":
          case "friday":
            if (
              data[day].start == data["monday"].start &&
              data[day].end == data["monday"].end
            ) {
              isWeekdaysFormat =
                "Monday - Friday : " +
                moment(data[day].start).format("h:m A") +
                " - " +
                moment(data[day].end).format("h:m A") +
                "\n"
            } else {
              isWeekdaysFormat =
                "Monday : " +
                moment(data["saturday"].start).format("h:m A") +
                " - " +
                moment(data["sunday"].end).format("h:m A") +
                "\n"
              "Tuesday : " +
                moment(data["tuesday"].start).format("h:m A") +
                " - " +
                moment(data["tuesday"].end).format("h:m A") +
                "\n"
              "Wednesday : " +
                moment(data["wednesday"].start).format("h:m A") +
                " - " +
                moment(data["wednesday"].end).format("h:m A") +
                "\n"
              "Thursday : " +
                moment(data["thursday"].start).format("h:m A") +
                " - " +
                moment(data["thursday"].end).format("h:m A") +
                "\n"
              "Friday : " +
                moment(data["friday"].start).format("h:m A") +
                " - " +
                moment(data["friday"].end).format("h:m A") +
                "\n"
            }
            break
          case "saturday":
          case "sunday":
            if (
              data[day].start == data["saturday"].start &&
              data[day].end == data["saturday"].end
            ) {
              isWeekendFormat =
                "Saturday - Sunday : " +
                moment(data[day].start).format("h:m A") +
                " - " +
                moment(data[day].end).format("h:m A")
            } else {
              isWeekendFormat =
                "Saturday : " +
                moment(data["saturday"].start).format("h:m A") +
                " - " +
                moment(data["sunday"].end).format("h:m A") +
                "\n"
              "Sunday : " +
                moment(data["saturday"].start).format("h:m A") +
                " - " +
                moment(data["sunday"].end).format("h:m A")
            }
            break
        }
      })
    }
    return (
      <div className="venue-schedules">
        <p>{isWeekdaysFormat}</p> <p>{isWeekendFormat}</p>
      </div>
    )
  }
  renderVenueLists = () => {
    if (this.state.loading) {
      return <div>Loading...</div>
    }
    let openingHours
    return this.state.venues.map((venue, index) => (
      <div key={index} className="venue-box row">
        <div className="venue-img">
          <img alt="" src={venue.image} />
        </div>
        <div className="venue-info">
          <p className="venue-name">
            <Link to={"/venue/profile/" + venue._id}>
              <b>{venue.name}</b>
            </Link>
          </p>
          <p className="venue-type">
            {venue.type.map(type => type.capitalize()).join(" / ")}
          </p>
          {this.renderOpeningHoursDOM(venue.openingHours)}
          <Grid>
            <Row className="services">
              <label>Services:</label>
              {venue.services.map((service, index) => {
                if (service && index < 3) {
                  return <span className={"services--" + service} key={index} />
                }
              })}
            </Row>
          </Grid>
        </div>
        <div className="venue-action">
          <p className="venue-address">
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
  renderEventList = () => {
    return this.state.events.map((evnt, index) => (
      <div key={evnt._id} className="event-box row">
        <div className="event-date">
          <p className="e-day">{moment(evnt.date).day()}</p>
          <p className="e-month">{moment(evnt.date).format("MMMM")}</p>
        </div>
        <div className="event-data">
          <div className="event-img">
            <img
              alt=""
              src={
                evnt.image !== "undefined"
                  ? evnt.image
                  : "https://dummyimage.com/150x150/000/fff"
              }
            />
          </div>
          <div className="event-meta">
            <p className="event-title">{evnt.name}</p>
            <p>
              <small>
                <FontAwesome name="clock-o" />
                {`${moment(evnt.time.start).format("h:m A")} - ${moment(
                  evnt.time.end
                ).format("h:m A")}`}
              </small>
            </p>
            <p>
              <small>Venue: {evnt.employer && evnt.employer.name}</small>
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
    ))
  }

  renderFilterButtons = () => {
    if (this.state.filterTypes.venue) {
      return Object.keys(this.state.venueTypeFilters).map((venue, index) => {
        const active = this.state.venueTypeFilters[venue]
          ? "btn-active"
          : "btn-passive"
        return (
          <button
            key={index}
            active={venue.active}
            name={venue}
            className={`a-btn btn-round ${active}`}
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
          className={`a-btn btn-round "" ${active}`}
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
      <div class="m-search-venues">
        <NavBar />

        <div className="xem cont-flex m-search-venues--body">
          <div className="card card-md m-search-venues--nearby-venue">
            <div className="m-card-header m-search-venues--header">
              <h4>NEARBY VENUE</h4>
              <div className="card-filter">
                <div className="xxm m-search-venues--header--filter-by">
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
                <div className="xxm m-search-venues--header--filter-items">
                  {this.renderFilterButtons()}
                </div>
              </div>
            </div>
            <div className="card-content scroll v-scroll xxm m-search-venues--venue-lists">
              {this.renderVenueLists()}
            </div>
          </div>

          <div className="card card-md m-search-venues--nearby-events">
            <div className="m-card-header m-search-venues--nearby-events--header">
              <h4>UPCOMING EVENTS NEAR YOU</h4>
              <div className="card-filter">
                <div className="xxm m-search-venues--header--filter-by">
                  <span>FILTER BY:&nbsp;&nbsp;</span>
                  {Object.keys(this.state.filterEvents).map((key, index) => {
                    const active = this.state.filterEvents[key].value
                      ? "btn-active"
                      : "btn-passive"
                    return (
                      <button
                        key={index}
                        className={`a-btn btn-round btn-dark ${active}`}
                        onClick={this.handleFilterEvents.bind(this, key)}
                        style={{ fontSize: "14px" }}
                      >
                        {this.state.filterEvents[key].label.capitalize()}
                      </button>
                    )
                  })}
                </div>
                <div className="xxm card-filter m-search-venues--nearby-events--header--filter-items">
                  {Object.keys(this.state.eventTypes).map((key, index) => {
                    const active = this.state.eventTypes[key]
                      ? "btn-active"
                      : "btn-passive"
                    return (
                      <button
                        key={index}
                        className={`a-btn btn-round ${active}`}
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
              {this.renderEventList()}
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
