import React, { Component } from "react"
import _ from "lodash/core"

export default class SchedulePopOver extends Component {
  constructor(props) {
    super(props)
    this.handleEdit = this.handleEdit.bind(this)
    this.handleSave = this.handleSave.bind(this)

    // fetch data from db
    this.fetchSchedule()
  }
  state = {
    editMode: false,
    schedules: {}
  }
  _schedules = {
    monday: [{ startTime: {}, endTime: {} }, { startTime: {}, endTime: {} }],
    tuesday: [{ startTime: {}, endTime: {} }, { startTime: {}, endTime: {} }],
    wednesday: [{ startTime: {}, endTime: {} }, { startTime: {}, endTime: {} }],
    thursday: [{ startTime: {}, endTime: {} }, { startTime: {}, endTime: {} }],
    friday: [{ startTime: {}, endTime: {} }, { startTime: {}, endTime: {} }],
    saturday: [{ startTime: {}, endTime: {} }, { startTime: {}, endTime: {} }],
    sunday: [{ startTime: {}, endTime: {} }, { startTime: {}, endTime: {} }]
  }

  fetchSchedule() {
    if (typeof this.props.schedules === "undefined") {
      // this.props.schedules = {}
    }
  }

  toggleEdit() {
    const editMode = !this.state.editMode
    this.setState({ editMode })
  }
  handleSave(event) {
    // save to db
    // console.log(this._schedules)
    let sched = this._schedules
    Object.keys(sched).map(key => {
      sched[key][`0`].startTime = this._schedules[key][`0`].startTime.value
      sched[key][`0`].endTime = this._schedules[key][`0`].endTime.value

      sched[key][`1`].startTime = this._schedules[key][`1`].startTime.value
      sched[key][`1`].endTime = this._schedules[key][`1`].endTime.value
    })
    console.log(sched)
    this.props.setSchedules(sched, this.props.staffid)
    // console.log(this.props.schedules);

    this.toggleEdit()
  }
  handleEdit(event) {
    // change dom to user input

    this.toggleEdit()
  }
  editSection() {
    const editMode = this.state.editMode
    if (editMode) {
      return (
        <div className="edit" onClick={this.handleSave}>
          Save ✔
        </div>
      )
    } else {
      return (
        <div className="edit" onClick={this.handleEdit}>
          Edit <span className="icon-edit" />
        </div>
      )
    }
  }
  renderTimeDom(selectedTime) {
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
  renderSchedule() {
    const days = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    ]
    return Object.keys(days).map(key => {
      let timeAStart, timeAEnd, timeBStart, timeBEnd
      if (typeof this.props.schedules !== "undefined") {
        if (days[key].toLowerCase() in this.props.schedules) {
          timeAStart = this.props.schedules[days[key].toLowerCase()][0]
            .startTime
          timeAEnd = this.props.schedules[days[key].toLowerCase()][0].endTime
          timeBStart = this.props.schedules[days[key].toLowerCase()][1]
            .startTime
          timeBEnd = this.props.schedules[days[key].toLowerCase()][1].endTime
        }
      }
      let timeADom = (
          <div className="timeADom">
            <span className={`time ${this.state.editMode ? " hide" : " show"}`}>
              {timeAStart + " - " + timeAEnd}
            </span>
            <div className={this.state.editMode ? "show" : "hide"}>
              <select
                defaultValue={timeAStart}
                ref={input =>
                  (this._schedules[days[key].toLowerCase()][
                    `0`
                  ].startTime = input)
                }
              >
                <optgroup>{this.renderTimeDom(timeAStart)}</optgroup>
              </select>
              <select
                defaultValue={timeAEnd}
                ref={input =>
                  (this._schedules[days[key].toLowerCase()][
                    `0`
                  ].endTime = input)
                }
              >
                <optgroup>{this.renderTimeDom(timeAEnd)}</optgroup>
              </select>
            </div>
          </div>
        ),
        timeBDom = (
          <div className="timeBDom">
            <span className={`time ${this.state.editMode ? " hide" : " show"}`}>
              {timeBStart + " - " + timeBEnd}
            </span>

            <div className={this.state.editMode ? "show" : "hide"}>
              <select
                defaultValue={timeBStart}
                ref={input =>
                  (this._schedules[days[key].toLowerCase()][
                    `1`
                  ].startTime = input)
                }
              >
                <optgroup>{this.renderTimeDom(timeBStart)}</optgroup>
              </select>
              <select
                defaultValue={timeBEnd}
                ref={input =>
                  (this._schedules[days[key].toLowerCase()][
                    `1`
                  ].endTime = input)
                }
              >
                <optgroup>{this.renderTimeDom(timeBEnd)}</optgroup>
              </select>
            </div>
          </div>
        )
      let inputSchedSingle = {
        timeA: { startTime: "", endTime: "" },
        timeB: { startTime: "", endTime: "" }
      }

      return (
        <tr key={key}>
          <td>{days[key]}</td>
          <td>{timeADom}</td>
          <td>{timeBDom}</td>
        </tr>
      )
    })
  }
  render() {
    return (
      <div className="schedulepopover">
        <div className="header">
          <strong>SCHEDULE</strong>
          {this.editSection()}
        </div>
        <div className="body">
          <table>
            <tbody>{this.renderSchedule()}</tbody>
          </table>
        </div>
      </div>
    )
  }
}
