import React, { Component } from "react"

export default class SchedulePopOver extends Component {
  constructor(props) {
    super(props)
    this.handleEdit = this.handleEdit.bind(this)
    this.handleSave = this.handleSave.bind(this)

    // fetch data from db
    this.fetchSchedule()
  }
  state = {
    editMode: false
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
  renderSchedule() {
    let days = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      time = [
        "6AM",
        "7AM",
        "8AM",
        "9AM",
        "10AM",
        "11AM",
        "12NN",
        "1PM",
        "2PM",
        "3PM",
        "4PM",
        "5PM",
        "6PM",
        "7PM",
        "8PM",
        "9PM",
        "10PM",
        "11PM",
        "12MN",
        "1AM",
        "2AM",
        "3AM",
        "4AM",
        "5AM",
        "6AM"
      ],
      timeDom = Object.keys(time).map(key => {
        return <option>{time[key]}</option>
      })
    return Object.keys(days).map(key => {
      let timeA, timeB
      if (typeof this.props.schedules !== "undefined") {
        if (days[key].toLowerCase() in this.props.schedules) {
          timeA =
            this.props.schedules[days[key].toLowerCase()][0].startTime +
            "-" +
            this.props.schedules[days[key].toLowerCase()][0].endTime
          timeB =
            this.props.schedules[days[key].toLowerCase()][1].startTime +
            "-" +
            this.props.schedules[days[key].toLowerCase()][1].endTime
        }
      }

      let timeADom = <span className="time">{timeA}</span>,
        timeBDom = <span className="time">{timeB}</span>
      if (this.state.editMode) {
        timeADom = (
          <div>
            <select>
              <optgroup>{timeDom}</optgroup>
            </select>
            <select>
              <optgroup>{timeDom}</optgroup>
            </select>
          </div>
        )
        timeBDom = (
          <div>
            <select>
              <optgroup>{timeDom}</optgroup>
            </select>
            <select>
              <optgroup>{timeDom}</optgroup>
            </select>
          </div>
        )
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
