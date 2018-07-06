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
  // renderWeek(obj) {
  //   obj.map((i) => {
  //     console.log(i)
  //     return (
  //     <tr>
  //       <td>{i}</td>
  //     </tr>
  //     )
  //   })
  // }
  render() {
    return (
      <div>
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
                {Object.keys(this.props.myStaffs).map(i => {
                  let day = [
                    "monday",
                    "tuesday",
                    "wednesday",
                    "thursday",
                    "friday",
                    "saturday",
                    "sunday"
                  ]
                  return (
                    <tr>
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
                      {day.map(val => {
                        if (
                          this.props.myStaffs[i].schedules[val][0].startTime ===
                          ""
                        ) {
                          return (
                            <td>
                              <span className="add">
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
                                  <i class="fa fa-clone" />
                                </span>
                                <span className="pull-left">
                                  <i class="fa fa-arrows" />
                                </span>
                                <span className="pull-right">
                                  <i class="fa fa-edit" />
                                </span>
                                <span className="pull-right">
                                  <i class="fa fa-envelope" />
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

  constructor(props) {
    super(props)
  }
  state = {
    staff: {}
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
