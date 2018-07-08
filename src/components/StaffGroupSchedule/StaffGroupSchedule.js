import React from "react"

import { Link } from "react-router-dom"
import { Button } from "react-bootstrap"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { push } from "react-router-redux"
import _ from "lodash"

import NavBar from "./../layouts/NavBar"
import API from "./../../services/api"

// import "./VenueProfile.css"

class StaffGroupSchedule extends React.Component {
  constructor(props) {
    super(props)
    this.closeModal = this.closeModal.bind(this)
    this.onChangeInput = this.onChangeInput.bind(this)
  }
  state = {
    openModal: false,
    modalContent: "Under construction",
    customModalStyle: {},

    day: [
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
      "sunday"
    ],
    staff: {},

    time_start_a: "",
    time_end_a: "",
    time_start_b: "",
    time_end_b: "",
    selected_row: "",
    selected_day: "",

    to_day: ""
  }
  onChangeInput = e => {
    console.log(e.target.name, e.target.value)
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  closeModal() {
    this.setState({ openModal: false })
  }
  saveModal(type) {
    let api_url = "",
      confirm_modal_name = "",
      new_sched = {}
    let body = {}
    switch (type) {
      case "SAVE_ENTRY":
        new_sched = this.props.myStaffs[this.state.selected_row].schedules
        new_sched[this.state.selected_day] = [
          {
            startTime: this.state.time_start_a,
            endTime: this.state.time_end_a
          },
          {
            startTime: this.state.time_start_b,
            endTime: this.state.time_end_b
          }
        ]
        body = {
          schedules: JSON.stringify(new_sched)
        }
        api_url = `save-staff-sched/${
          this.props.myStaffs[this.state.selected_row]._id
        }`
        confirm_modal_name = "CONFIRM"
        break
      case "CLONE_TO_DAY":
        new_sched = this.props.myStaffs[this.state.selected_row].schedules
        new_sched[this.state.to_day] = new_sched[this.state.selected_day]
        body = {
          schedules: JSON.stringify(new_sched)
        }
        api_url = `save-staff-sched/${
          this.props.myStaffs[this.state.selected_row]._id
        }`
        confirm_modal_name = "CONFIRM"
        break
    }
    API.post(api_url, body).then(res => {
      if (!res.status) {
        alert(JSON.stringify(res))
      }
      if (res.status) {
        this.openModal(confirm_modal_name)
      }
    })
  }
  openModal(type, row_index, day) {
    let content = "",
      customModalStyle = {}
    switch (type) {
      case "ADD_ENTRY":
        content = (
          <div className="have-header form-content">
            <h5>Add Schedule</h5>
            <p>
              <label>Start Time A</label>
              <select name="time_start_a" onChange={this.onChangeInput}>
                <optgroup>{this.renderTimeDom()}</optgroup>
              </select>
            </p>
            <p>
              <label>End Time A</label>
              <select name="time_end_a" onChange={this.onChangeInput}>
                <optgroup>{this.renderTimeDom()}</optgroup>
              </select>
            </p>
            <hr />
            <p>
              <label>Start Time B</label>
              <select name="time_start_b" onChange={this.onChangeInput}>
                <optgroup>{this.renderTimeDom()}</optgroup>
              </select>
            </p>
            <p>
              <label>End Time B</label>
              <select name="time_end_b" onChange={this.onChangeInput}>
                <optgroup>{this.renderTimeDom()}</optgroup>
              </select>
            </p>
            <Button
              className="btn-primary"
              onClick={this.saveModal.bind(this, "SAVE_ENTRY", row_index)}
            >
              Ok
            </Button>
          </div>
        )
        break
      case "CLONE_TO_DAY":
        content = (
          <div className="have-header form-content">
            <h5>Clone to Day</h5>
            <p>
              <label>Enter Day</label>
              <select name="to_day" onChange={this.onChangeInput}>
                <optgroup>
                  {Object.keys(this.state.day).map(key => {
                    return (
                      <option key={this.state.day[key]}>
                        {this.state.day[key]}
                      </option>
                    )
                  })}
                </optgroup>
              </select>
            </p>
            <Button
              className="btn-primary"
              onClick={this.saveModal.bind(this, "CLONE_TO_DAY", row_index)}
            >
              Ok
            </Button>
          </div>
        )
        break
      case "MAXIMIZE":
        content = (
          <div className="have-header form-content">
            <h5>Details</h5>
            <p>
              <label>Staff : </label>
              {this.props.myStaffs[row_index].staff.fullname}
            </p>
            <p>
              <label>Day : </label>
              {this.state.selected_day}
            </p>
            <p>
              <label>Schedule A: </label>
              Start Time :{" "}
              {this.props.myStaffs[row_index].schedules[day][0].startTime}{" "}
              <br />
              End Time :{" "}
              {this.props.myStaffs[row_index].schedules[day][0].endTime} <br />
            </p>
            <p>
              <label>Schedule B: </label>
              Start Time :{" "}
              {this.props.myStaffs[row_index].schedules[day][1].startTime}{" "}
              <br />
              End Time :{" "}
              {this.props.myStaffs[row_index].schedules[day][1].endTime} <br />
            </p>
            <Button className="btn-primary" onClick={this.closeModal}>
              Ok
            </Button>
          </div>
        )
        break
      case "EDIT_ENTRY":
        content = (
          <div className="have-header form-content">
            <h5>Edit Schedule</h5>
            <p>
              <label>Start Time A</label>
              <select name="time_start_a" onChange={this.onChangeInput}>
                <optgroup>{this.renderTimeDom()}</optgroup>
              </select>
            </p>
            <p>
              <label>End Time A</label>
              <select name="time_end_a" onChange={this.onChangeInput}>
                <optgroup>{this.renderTimeDom()}</optgroup>
              </select>
            </p>
            <hr />
            <p>
              <label>Start Time B</label>
              <select name="time_start_b" onChange={this.onChangeInput}>
                <optgroup>{this.renderTimeDom()}</optgroup>
              </select>
            </p>
            <p>
              <label>End Time B</label>
              <select name="time_end_b" onChange={this.onChangeInput}>
                <optgroup>{this.renderTimeDom()}</optgroup>
              </select>
            </p>
            <Button
              className="btn-primary"
              onClick={this.saveModal.bind(this, "SAVE_ENTRY", row_index)}
            >
              Ok
            </Button>
          </div>
        )
        break
      case "CONFIRM":
        content = (
          <div className="confirm">
            <h5>Success!</h5>
            <p>Please proceed below.</p>
            <Button className="btn-primary" onClick={this.closeModal}>
              Ok
            </Button>
          </div>
        )
        break
    }
    this.setState({
      selected_row: row_index,
      selected_day: day,
      modalContent: content,
      openModal: true
    })
  }
  modal() {
    return (
      <div className="a-modal show">
        <div className="a-modal-content" style={{ maxWidth: "850px" }}>
          <span className="a-close" onClick={this.closeModal}>
            &times;
          </span>
          {this.state.modalContent}
        </div>
      </div>
    )
  }
  renderTimeDom() {
    const time = [
      "[Select]",
      "06 AM",
      "07 AM",
      "08 AM",
      "09 AM",
      "10 AM",
      "11 AM",
      "12 NN",
      "01 PM",
      "02 PM",
      "03 PM",
      "04 PM",
      "05 PM",
      "06 PM",
      "07 PM",
      "08 PM",
      "09 PM",
      "10 PM",
      "11 PM",
      "12 MN",
      "01 AM",
      "02 AM",
      "03 AM",
      "04 AM",
      "05 AM"
    ]
    return Object.keys(time).map(key => {
      if (time[key] == "[Select]") {
        return (
          <option key={key} value="">
            {time[key]}
          </option>
        )
      } else {
        return <option key={key}>{time[key]}</option>
      }
    })
  }
  render() {
    return (
      <div>
        {this.state.openModal ? this.modal() : null}
        <NavBar />
        <div className="container xem app-body">
          <div className="container StaffGroupSchedule">
            <h3>Your Weekly Staff Schedule For Venue</h3>
            <div className="week-navigator">
              <i class="fa fa-arrow-left" />
              <span className="from">Monday,August 14 2017</span> -
              <span className="to">Sunday,August 20 2017</span>
              <i class="fa fa-arrow-right" />
            </div>
            <table border="1" className="calendar-table">
              <thead>
                <tr>
                  <td>
                    <span className="load-active-staffs">Active Staff</span>
                    <span className="load-trial-staffs">Trial Period</span>
                  </td>
                  <td className="calendar-day">
                    <span className="day">Monday</span>
                    <span className="date">August 14 2017</span>
                  </td>
                  <td className="calendar-day">
                    <span className="day">Tuesday</span>
                    <span className="date">August 15 2017</span>
                  </td>
                  <td className="calendar-day">
                    <span className="day">Wednesday</span>
                    <span className="date">August 16 2017</span>
                  </td>
                  <td className="calendar-day">
                    <span className="day">Thursday</span>
                    <span className="date">August 17 2017</span>
                  </td>
                  <td className="calendar-day">
                    <span className="day">Friday</span>
                    <span className="date">August 18 2017</span>
                  </td>
                  <td className="calendar-day">
                    <span className="day">Saturday</span>
                    <span className="date">August 19 2017</span>
                  </td>
                  <td className="calendar-day">
                    <span className="day">Sunday</span>
                    <span className="date">August 20 2017</span>
                  </td>
                </tr>
              </thead>
              <tbody>
                {Object.keys(this.props.myStaffs).map((i, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <span className="edit-toggle">
                          <i class="fa fa-edit" />
                        </span>
                        <p className="week-data">
                          Rostered : 09 : 00hrs | 4 Shifts <br />
                          Venue : Lumi Bar & Cafe <br />
                          Manager : Michael Barks
                        </p>
                      </td>
                      {this.state.day.map(val => {
                        if (
                          this.props.myStaffs[i].schedules[val][0].startTime ===
                          ""
                        ) {
                          return (
                            <td key={val}>
                              <span
                                className="add"
                                onClick={this.openModal.bind(
                                  this,
                                  "ADD_ENTRY",
                                  index,
                                  val
                                )}
                              >
                                <i class="fa fa-plus-circle" />
                              </span>
                            </td>
                          )
                        } else {
                          return (
                            <td>
                              <div className="staff-name">
                                <span className="remove">X</span>
                                {this.props.myStaffs[i].staff.fullname}
                              </div>
                              <p className="schedule-time">
                                <i class="fa fa-clock" />{" "}
                                {
                                  this.props.myStaffs[i].schedules[val][0]
                                    .startTime
                                }{" "}
                                -{" "}
                                {
                                  this.props.myStaffs[i].schedules[val][0]
                                    .endTime
                                }{" "}
                                <br />
                                <i class="fa fa-clock" />{" "}
                                {
                                  this.props.myStaffs[i].schedules[val][1]
                                    .startTime
                                }{" "}
                                -{" "}
                                {
                                  this.props.myStaffs[i].schedules[val][1]
                                    .endTime
                                }
                              </p>
                              <div className="buttons">
                                <span className="pull-left">
                                  <i
                                    class="fa fa-clone"
                                    onClick={this.openModal.bind(
                                      this,
                                      "CLONE_TO_DAY",
                                      index,
                                      val
                                    )}
                                  />
                                </span>
                                <span className="pull-left">
                                  <i
                                    class="fa fa-arrows"
                                    onClick={this.openModal.bind(
                                      this,
                                      "MAXIMIZE",
                                      index,
                                      val
                                    )}
                                  />
                                </span>
                                <span className="pull-right">
                                  <i
                                    class="fa fa-edit"
                                    onClick={this.openModal.bind(
                                      this,
                                      "EDIT_ENTRY",
                                      index,
                                      val
                                    )}
                                  />
                                </span>
                                <span className="pull-right">
                                  <Link
                                    to={`./messages/${
                                      this.props.myStaffs[i].staff._id
                                    }`}
                                  >
                                    <i class="fa fa-envelope" />
                                  </Link>
                                </span>
                              </div>
                            </td>
                          )
                        }
                      })}
                    </tr>
                  )
                })}
              </tbody>
            </table>
            <Button className="save">Save</Button>
          </div>
        </div>
      </div>
    )
  }
  fetch = async () => {}
  componentWillMount() {
    API.initRequest()
  }
  componentDidMount = async () => {}
}
const mapStateToProps = state => {
  return state
}

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(StaffGroupSchedule)
