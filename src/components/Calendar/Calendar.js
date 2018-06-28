import React, { Component } from "react"
import NavBar from "./../layouts/NavBar"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import SubscribePopUp from "./.././layouts/SubscribePopUp/SubscribePopUp"
import EventDatePicker from "./../venue/eventDatePicker"
import StaffTimePicker from "./../venue/staffTimePicker"
import { setSubscribePopUp } from "./../../actions/myProfile-actions"
import ViewEvent from "./../venue/viewEvent"
import API from "./../../services/api"
const moment = require("moment")

class Calendar extends Component {
  constructor(props) {
    super(props)

    if (this.props.myProfile.isStaff) {
      this.state = {
        title: "schedules",
        isLoading: false,
        calendar: [],
        today: moment(),
        selectedDate: moment(),
        schedule: [],
        itemToLoopBelow: [],
        itemsToLoopOnList: [],
        // need to remove these later
        services: {
          alcohol: false,
          cocktails: false,
          drinks: false,
          food: false,
          breakfast: false,
          lunch: false,
          dinner: false
        },
        staffOfInterest: [],
        eventStaffs: [2, 4, 5, 7]
      }
    } else {
      this.state = {
        title: "events",
        isLoading: false,
        events: [1, 2, 3, 4, 6, 7, 8],
        currentEvents: [1, 2, 3, 4, 5, 6],
        eventStaffs: [2, 4, 5, 7],
        calendar: [],
        today: moment(),
        selectedDate: moment(),
        openCreateEvent: false,
        openManageEvent: false,
        openViewDetails: false,
        eventDropdown: "init",
        event: {},
        eventTypesTab: 1,
        services: {
          alcohol: false,
          cocktails: false,
          drinks: false,
          food: false,
          breakfast: false,
          lunch: false,
          dinner: false
        },
        staffOfInterest: [],
        staffs: {
          barista: { on: true, num: 0 },
          bartender: { on: true, num: 0 },
          manager: { on: true, num: 0 },
          waiter: { on: true, num: 0 },
          chef: { on: true, num: 0 },
          barback: { on: true, num: 0 },
          kitchen: { on: true, num: 0 },
          host: { on: true, num: 0 }
        },
        selectedImage: "",
        eventName: "",
        eventDescription: "",
        date: null,
        startTime: null,
        variant: "week"
      }
    }
    this.props.onSetSubscribePopUp(true)
  }

  componentDidMount = async () => {
    API.initRequest()
    this.loadCalendar(moment())

    if (!this.props.myProfile.isStaff) {
      Object.keys(this.state.staffs).forEach(key => {
        const obj = this.state.staffs[key]
        obj.key = key
        this.state.staffOfInterest.push(obj)
      })
      this.setState({
        itemToLoopBelow: this.state.currentEvents,
        itemsToLoopOnList: this.state.events
      })
    } else {
      let schedule = await API.get("my-managements")
      let itemToLoopBelow = [],
        itemsToLoopOnList = []
      let item_data = []

      // populating loops below
      schedule.managements.map(item => {
        item_data =
          item.schedules[this.state.selectedDate.format("dddd").toLowerCase()]

        itemToLoopBelow.push({
          title: item.employer.name,
          schedule: item_data,
          venue: item.employer.locationName
        })
      })
      let schedule_filter = schedule.managements.filter(item => {
        return (
          typeof item.schedules[
            this.state.selectedDate.format("dddd").toLowerCase()
          ] !== undefined
        )
      })

      // populate loops beside
      for (let x = 0; x < 5; x++) {
        schedule_filter.map(item => {
          itemsToLoopOnList.push({
            day: moment()
              .add(x, "days")
              .format("D"),
            month: moment()
              .add(x, "days")
              .format("MMMM"),
            title: item.employer.name,
            schedule:
              item.schedules[
                this.state.selectedDate
                  .add(x, "days")
                  .format("dddd")
                  .toLowerCase()
              ],
            location: item.employer.locationName,
            isToday: x == 0
          })
        })
      }
      console.log(itemsToLoopOnList)
      this.setState({
        schedule,
        itemToLoopBelow,
        itemsToLoopOnList
      })
    }
  }

  renderStaffBox = (closable, col, active) => {
    return (
      <div className={"my-staff " + col}>
        <div className="item">
          <img
            alt=""
            className="profile-thumb-sm my-staff-img"
            src="http://via.placeholder.com/50x50"
          />
          <p className="name">Staff {active}</p>
          <small>Part Time</small>
          <small>$20 - $23 /hour</small>
          <button className="a-btn btn-dark btn-round">
            <small>Send Message</small>
          </button>
          <a className="mreview">Add monthly review</a>
        </div>
      </div>
    )
  }

  openDropdown = index => {
    if (this.state.eventDropdown === index) {
      this.setState({ eventDropdown: "init" })
    } else {
      this.setState({ eventDropdown: index })
    }
  }

  onTriggerCreateEventModal = () => {
    this.setState(prevState => ({
      openCreateEvent: !prevState.openCreateEvent
    }))
  }

  onOpenEventManagement = event => {
    this.setState({ event, openManageEvent: true })
    this.setState({ eventDropdown: "init" })
  }

  onCloseEventManagement = () => {
    this.setState({ openManageEvent: false })
  }

  selectDate = selectedDate => {
    this.setState({ selectedDate })
  }

  nextMonth = () => {
    let nextMonth = this.state.selectedDate.startOf("month").add(1, "months")
    this.setState({ selectedDate: nextMonth })
    this.loadCalendar(nextMonth.startOf("month"))
  }

  prevMonth = () => {
    let prevMonth = this.state.selectedDate
      .startOf("month")
      .subtract(1, "months")
    this.setState({ selectedDate: prevMonth })
    this.loadCalendar(prevMonth.startOf("month"))
  }

  loadCalendar = date => {
    let selectedDate = date.format()

    const startWeek = moment(selectedDate)
      .startOf("month")
      .week()
    const endWeek = moment(selectedDate)
      .endOf("month")
      .week()
    let calendar = []

    if (endWeek === 1) {
      let weeks = [48, 49, 50, 51, 52, 1]
      for (let week of weeks) {
        let days = []
        if (week === 1) {
          days = Array(7)
            .fill(0)
            .map((n, i) =>
              moment(selectedDate)
                .add(1, "years")
                .week(week)
                .startOf("week")
                .clone()
                .add(n + i, "day")
            )
        } else {
          days = Array(7)
            .fill(0)
            .map((n, i) =>
              moment(selectedDate)
                .week(week)
                .startOf("week")
                .clone()
                .add(n + i, "day")
            )
        }
        calendar.push({ week, days })
      }
    } else {
      for (let week = startWeek; week <= endWeek; week++) {
        let days = Array(7)
          .fill(0)
          .map((n, i) =>
            moment(selectedDate)
              .week(week)
              .startOf("week")
              .clone()
              .add(n + i, "day")
          )
        calendar.push({ week, days })
      }
    }

    this.setState({ calendar })
  }
  renderCalendar = () => {
    return (
      <div className="calendar-main card">
        <div className="calendar-main-header">
          <p>CALENDAR {this.state.selectedDate.format("YYYY")}</p>
          {this.props.myProfile &&
            (this.props.myProfile.isVenue ||
              this.props.myProfile.isEmployer) && (
              <div className="add-event pull-right">
                <a
                  onClick={() => this.onTriggerCreateEventModal()}
                  className="add-event-btn a-btn-circle"
                >
                  +
                </a>
                <div className="e-tooltip">Create Event</div>
              </div>
            )}
          <input
            type="text"
            className="a-plain-text"
            placeholder="Search something on your calendar"
          />
        </div>
        <div className="calendar-main-date">
          <div className="row">
            <div className="calendar-main-date-navigator col-sm-5">
              <div className="calendar-main-head">
                <a onClick={() => this.prevMonth()} className="pull-left">
                  <i className="fa fa-angle-left" />
                </a>
                <p>{this.state.selectedDate.format("MMMM").toUpperCase()}</p>
                <a onClick={() => this.nextMonth()} className="pull-right">
                  <i className="fa fa-angle-right" />
                </a>
              </div>
              <div className="calendar-main-day">
                <h1>{this.state.selectedDate.format("D")}</h1>
              </div>
              <div className="calendar-main-settings">
                <p>{this.state.selectedDate.format("dddd")}</p>
                <div className="btn-group text-center">
                  <a
                    className={`a-btn ${this.state.variant === "month" &&
                      "selected"}`}
                    onClick={() => this.setState({ variant: "month" })}
                  >
                    Month
                  </a>
                  <a
                    className={`a-btn ${this.state.variant === "week" &&
                      "selected"}`}
                    onClick={() => this.setState({ variant: "week" })}
                  >
                    Week
                  </a>
                  <a
                    className={`a-btn ${this.state.variant === "day" &&
                      "selected"}`}
                    onClick={() => this.setState({ variant: "day" })}
                  >
                    Day
                  </a>
                </div>
              </div>
            </div>
            <div className="calendar-main-date-full col-sm-7">
              <div className="cal-wrapper week-names">
                <div className="cal-item label">SU</div>
                <div className="cal-item label">MO</div>
                <div className="cal-item label">TU</div>
                <div className="cal-item label">WE</div>
                <div className="cal-item label">TH</div>
                <div className="cal-item label">FR</div>
                <div className="cal-item label">SA</div>
              </div>
              {this.state.calendar.map((week, id) => {
                return (
                  <div className="cal-wrapper" key={id}>
                    {week.days.map((day, id) => {
                      if (this.state.today.isSame(day, "day")) {
                        return (
                          <div
                            key={id}
                            onClick={() => this.selectDate(day)}
                            className="cal-item digit"
                          >
                            <span className="today">{day.format("D")}</span>
                          </div>
                        )
                      } else if (this.state.selectedDate.isSame(day, "month")) {
                        return (
                          <div
                            key={id}
                            onClick={() => this.selectDate(day)}
                            className="cal-item digit on-month"
                          >
                            <span
                              className={
                                this.state.selectedDate.isSame(day, "day")
                                  ? "selected"
                                  : "normal"
                              }
                            >
                              {day.format("D")}
                            </span>
                          </div>
                        )
                      } else {
                        return (
                          <div key={id} className="cal-item digit">
                            <span>{day.format("D")}</span>
                          </div>
                        )
                      }
                    })}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        <div className="calendar-main-events">
          <div className="calendar-main-events-header">
            <p>{this.state.title.toUpperCase()} ON THIS DATE(S)</p>
          </div>
          <div className="calendar-main-events-body v-scroll scroll">
            {this.state.itemToLoopBelow.map((item, index) => {
              console.log(item, index)
              return (
                <div
                  key={index}
                  className={
                    item === 1
                      ? "calendar-main-event selected"
                      : "calendar-main-event"
                  }
                >
                  <div className="row">
                    <div className="col-sm-2">
                      <img alt="" src="http://via.placeholder.com/99x80" />
                    </div>
                    <div className="col-sm-10">
                      <p className="title">{item.title}</p>
                      <p className="date">
                        {item.schedule.map(i => (
                          <span>
                            <i className="fa fa-clock-o" /> {i.startTime} -{" "}
                            {i.endTime}
                            <br />
                          </span>
                        ))}
                      </p>
                      <p className="venue">
                        <span className="pull-right">
                          <i className="fa fa-map-marker" /> {item.venue}
                        </span>
                      </p>
                      <a>
                        <div className="drop-menu">
                          <img
                            alt=""
                            src={require("./../../assets/icons/venue/menu.png")}
                            onClick={() => this.openDropdown(`c-${index}`)}
                          />
                          <div
                            className="e-dropdown"
                            style={{
                              display:
                                this.state.eventDropdown === `c-${index}`
                                  ? "block"
                                  : "none"
                            }}
                          >
                            {this.props.myProfile &&
                              (this.props.myProfile.isVenue ||
                                this.props.myProfile.isEmployer) && (
                                <p>Delete Event</p>
                              )}
                            <p
                              onClick={() =>
                                this.setState({
                                  openViewDetails: !this.state.openViewDetails
                                })
                              }
                            >
                              View Details
                            </p>
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  renderEvents = () => {
    return (
      <div className="calendar-events">
        <div className="calendar-events-menu">
          {!this.props.myProfile.isStaff && (
            <div
              className={
                this.state.eventTypesTab === 1
                  ? "calendar-events-header-menu-active"
                  : "calendar-events-header-menu"
              }
              onClick={() => this.setState({ eventTypesTab: 1 })}
            >
              <span>YOUR EVENTS</span>
            </div>
          )}
          <div
            className={
              this.state.eventTypesTab === 2
                ? "calendar-events-header-menu-active"
                : "calendar-events-header-menu"
            }
            onClick={() => this.setState({ eventTypesTab: 2 })}
          >
            <span>UPCOMING {this.state.title.toUpperCase()}</span>
          </div>
        </div>
        <div className="calendar-events-list scroll">
          {this.state.itemsToLoopOnList.map((item, index) => {
            console.log(item)
            return (
              <div key={index} className="event card">
                <div className="row">
                  <div className="col-sm-3">
                    <div>
                      {item.isToday ? <p className="today">TODAY</p> : null}
                      <p className="xl-text">{item.day}</p>
                    </div>
                    <p>
                      {item.month} {item.day}
                    </p>
                  </div>
                  <div className="col-sm-9">
                    <div className="event-item">
                      <div className="row">
                        <div className="item thumb-wrapper">
                          <img
                            className="thumbnail"
                            alt=""
                            src="http://via.placeholder.com/85x85"
                          />
                        </div>
                        <div className="item">
                          <p className="title">{item.title}</p>
                          <p className="date">
                            {item.schedule.map(i => (
                              <span>
                                <i className="fa fa-clock-o" /> {i.startTime} -{" "}
                                {i.endTime}
                                <br />
                              </span>
                            ))}
                          </p>
                          <p className="region">
                            <i className="fa fa-map-marker" /> {item.location}
                          </p>
                          <a className="drop-nav">
                            <div className="drop-menu">
                              <img
                                alt=""
                                src={require("./../../assets/icons/venue/menu.png")}
                                onClick={() => this.openDropdown(`e-${index}`)}
                              />
                              <div
                                className="e-dropdown mini"
                                style={{
                                  display:
                                    this.state.eventDropdown === `e-${index}`
                                      ? "block"
                                      : "none"
                                }}
                              >
                                <div className="e-dropdown-content">
                                  <p
                                    onClick={() =>
                                      this.setState({
                                        openViewDetails: !this.state
                                          .openViewDetails
                                      })
                                    }
                                  >
                                    View Event
                                  </p>
                                  {!this.props.myProfile.isStaff && (
                                    <p
                                      onClick={() =>
                                        this.onOpenEventManagement(index)
                                      }
                                    >
                                      Manage Event
                                    </p>
                                  )}
                                  {!this.props.myProfile.isStaff && (
                                    <p>Delete Event</p>
                                  )}
                                </div>
                              </div>
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  onSelectOption = (key, obj) => {
    let _obj = this.state[obj]
    _obj[key] = !_obj[key]
    this.setState(prevState => ({ [obj]: _obj }))
  }

  onChangeStaffs = (key, action) => {
    let staffs = this.state.staffs
    if (staffs[key].on) {
      if (action === "add") {
        staffs[key].num += 1
      } else {
        if (staffs[key].num > 0) {
          staffs[key].num -= 1
        }
      }
    }
    this.setState(prevState => ({ staffs }))
  }

  onOpenUploader = event => {
    const uploader = this.refs.uploader
    uploader.click()
  }

  onUploadImage = event => {
    const images = event.target.files
    const uploader = this.refs.uploader

    Object.values(images).forEach((image, index) => {
      const reader = new FileReader()
      reader.onloadend = async () => {
        const imageBase64 = reader.result
        if (index === 0) {
          this.setState({ selectedImage: imageBase64 })
        }
      }
      reader.readAsDataURL(image)
    })
    uploader.value = ""
  }

  onSaveEvent = () => {
    var eventData = {
      name: this.state.eventName,
      description: this.state.eventDescription,
      date: this.state.date.toString(),
      startTime: moment(this.state.startTime).format("hh:mm A"),
      endTime: null,
      interest: JSON.stringify([]),
      image: null
    }

    API.post("events", eventData).then(res => {
      if (res.status) {
        alert("Save successful")
        //  this.props.navigation.dispatch({type: 'Navigation/RESET', index: 0, actions: [{ type: 'Navigate', routeName:'HomeEmployer'}]});
      } else {
        alert("Something wrong")
      }
    })
  }

  onChangeInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  renderEventModal = () => {
    return (
      <div className={this.state.openCreateEvent ? "a-modal show" : "a-modal"}>
        <div className="a-modal-content">
          <span
            onClick={() => this.onTriggerCreateEventModal()}
            className="a-close"
          >
            &times;
          </span>
          <div className="row">
            <div className="col-sm-4">
              <p className="title">CREATE EVENT</p>
              <div className="form-group">
                <p>Event Name</p>
                <input
                  type="text"
                  className="a-input"
                  name="eventName"
                  onChange={this.onChangeInput}
                />
              </div>
              <div className="form-group">
                <p>Event Description</p>
                <textarea
                  rows="2"
                  cols="50"
                  className="a-input"
                  name="eventDescription"
                  onChange={this.onChangeInput}
                />
              </div>
              <div className="form-group">
                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <p>Date</p>
                      <EventDatePicker
                        selectedDate={moment()}
                        onSelectDate={date => this.setState({ date })}
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <p>Time</p>
                      <StaffTimePicker
                        selectedTime={moment()}
                        onSelectTime={time =>
                          this.setState({ startTime: time })
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <span>UPLOAD PHOTOS</span>
                <div className="upload-box">
                  <div
                    className="vs-p-container xm"
                    onClick={this.onOpenUploader}
                  >
                    <span hidden={!!this.state.selectedImage}>Upload</span>
                    <div style={{ width: "400px", height: "288px" }}>
                      <img
                        src={this.state.selectedImage}
                        style={{
                          maxWidth: "100%",
                          maxHeight: "100%",
                          margin: "auto"
                        }}
                        hidden={!this.state.selectedImage}
                      />
                    </div>
                  </div>

                  <input
                    type="file"
                    ref="uploader"
                    onChange={this.onUploadImage}
                    multiple
                    hidden
                  />
                </div>
              </div>
            </div>
            <div className="col-sm-8">
              <div className="row">
                <div className="col-sm-6">
                  <p>STAFF OF INTEREST</p>
                  <div className="vs-service-container xxm scroll h-scroll">
                    {Object.keys(this.state.services).map((key, index) => {
                      if (this.state.services[key]) {
                        return (
                          <div
                            className="vs-service-item-active"
                            key={index}
                            onClick={() => this.onSelectOption(key, "services")}
                          >
                            <a className="vs-service-action">
                              <img
                                alt=""
                                src={require(`../../assets/icons/venue/services/white/${key}.png`)}
                              />
                            </a>
                            <p className="xxm">{key.capitalize()}</p>
                          </div>
                        )
                      } else {
                        return (
                          <div
                            className="vs-service-item"
                            key={index}
                            onClick={() => this.onSelectOption(key, "services")}
                          >
                            <a className="vs-service-action">
                              <img
                                alt=""
                                src={require(`../../assets/icons/venue/services/default/${key}.png`)}
                              />
                            </a>
                            <p className="xxm">{key.capitalize()}</p>
                          </div>
                        )
                      }
                    })}
                  </div>
                  <div className="search">
                    <i className="fa fa-search" />
                    <input
                      className="a-plain-text"
                      placeholder="Search Staff"
                    />
                  </div>
                </div>
                <div className="col-sm-6">
                  <p>NUMBER OF STAFF</p>
                  <div className="staff-num-container h-scroll scroll">
                    {this.state.staffOfInterest.map((soi, index) => {
                      if (this.state.staffs[soi.key].on) {
                        return (
                          <div className="sn-container" key={index}>
                            <p className="vs-title">{soi.key.capitalize()}</p>
                            <div className="noe-container">
                              <a
                                className="noe-action"
                                onClick={() =>
                                  this.onChangeStaffs(soi.key, "sub")
                                }
                              >
                                <strong>–</strong>
                              </a>
                              <div className="noe-num">
                                {this.state.staffs[soi.key].num}
                              </div>
                              <a
                                className="noe-action"
                                onClick={() =>
                                  this.onChangeStaffs(soi.key, "add")
                                }
                              >
                                <strong>+</strong>
                              </a>
                            </div>
                          </div>
                        )
                      }
                      return null
                    })}
                  </div>
                </div>
              </div>
              <div className="calendar-event-staff-list v-scroll scroll">
                <div className="calendar-event-staff">
                  <p className="title">Bartenders</p>
                  <div className="staffs h-scroll scroll">
                    {[3, 4, 6, 8].map((staff, index) => {
                      return (
                        <div key={index} className="my-staff">
                          <div className="item">
                            <img
                              alt=""
                              className="profile-thumb my-staff-img"
                              src="http://via.placeholder.com/50x50"
                            />
                            <p className="name">Staff {staff}</p>
                            <small>Part Time</small>
                            <small>$20 - $23 /hour</small>
                            <button className="a-btn btn-dark btn-round">
                              <small>Send Message</small>
                            </button>
                            <a className="mreview">Add monthly review</a>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                <div className="calendar-event-staff">
                  <p className="title">Waiter/Waitresses</p>
                  <div className="staffs h-scroll scroll">
                    {[3, 4, 6, 8].map((staff, index) => {
                      return (
                        <div key={index} className="my-staff">
                          <div className="item">
                            <img
                              alt=""
                              className="profile-thumb my-staff-img"
                              src="http://via.placeholder.com/50x50"
                            />
                            <p className="name">Staff {staff}</p>
                            <small>Part Time</small>
                            <small>$20 - $23 /hour</small>
                            <button className="a-btn btn-dark btn-round">
                              <small>Send Message</small>
                            </button>
                            <a className="mreview">Add monthly review</a>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
              <button
                className="a-btn btn-dark btn-round pull-right"
                onClick={this.onSaveEvent}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderManagementModal = () => {
    return (
      <div className={this.state.openManageEvent ? "a-modal show" : "a-modal"}>
        <div className="a-modal-content management">
          <span
            onClick={() => this.onCloseEventManagement()}
            className="a-close"
          >
            &times;
          </span>
          <div className="row">
            <div className="col-sm-5">
              <div className="header">
                <p>MANAGE YOUR EVENT</p>
                <p>
                  EVENT FOR APRIL 5 ( <span>TODAY</span> )
                </p>
                <p>Event Starts at 06:30 PM </p>
              </div>
              <div className="sem">
                <div className="form-group">
                  <p>Event Name</p>
                  <input type="text" className="a-input" />
                </div>
                <div className="form-group">
                  <p>Event Description</p>
                  <textarea rows="2" cols="50" className="a-input">
                    {" "}
                  </textarea>
                </div>
                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <p>Date</p>
                      <input type="text" className="a-input" />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <p>Time</p>
                      <input type="text" className="a-input" />
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <span>UPLOAD PHOTOS</span>
                  <div className="upload-box">
                    <a>Upload</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-7">
              <div className="header">
                <p>YOUR STAFF FOR THIS EVENT</p>
                <p>
                  EVENT FOR APRIL 5 ( <span>TODAY</span> )
                </p>
              </div>
              <div className="search">
                <i className="fa fa-search" />
                <input
                  className="a-plain-text"
                  placeholder="Enter name to find staff"
                />
              </div>
              <div className="staff-list v-scroll scroll">
                <div className="row">
                  {this.state.eventStaffs.map(staff => {
                    return this.renderStaffBox(false, "col-sm-4", staff)
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderContent = () => {
    return (
      <div className="container lem">
        <div className="row">
          <div className="col-sm-7">{this.renderCalendar()}</div>
          <div className="col-sm-5">{this.renderEvents()}</div>
        </div>
        {this.renderEventModal()}
        {this.renderManagementModal()}
      </div>
    )
  }

  render() {
    return (
      <div>
        {!this.props.myProfile.showPopup ? (
          <SubscribePopUp
            close={() => {
              this.props.onSetSubscribePopUp(false)
            }}
          />
        ) : null}
        <ViewEvent
          openViewDetails={this.state.openViewDetails}
          onToggleModal={() =>
            this.setState({ openViewDetails: !this.state.openViewDetails })
          }
        />
        <NavBar />
        {this.renderContent()}
      </div>
    )
  }
}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      onSetSubscribePopUp: setSubscribePopUp
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(Calendar)
