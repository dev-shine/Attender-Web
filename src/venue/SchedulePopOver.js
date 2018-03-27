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
    // if(typeof this.props.schedules !== 'undefined') {
    let days = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    ]
    // for(var day in days) {
    //     <tr key={day}>
    //       <td>{day}</td>
    //       <td>
    //         <span className="time">8AM-4PM</span>
    //       </td>
    //       <td>
    //         <span className="time">8AM-4PM</span>
    //       </td>
    //     </tr>
    // }
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
      return (
        <tr key={key}>
          <td>{days[key]}</td>
          <td>
            <span className="time">{timeA}</span>
          </td>
          <td>
            <span className="time">{timeB}</span>
          </td>
        </tr>
      )
    })
    // }
    // else {
    //   return null;
    // }
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
