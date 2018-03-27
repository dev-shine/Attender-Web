import React, { Component } from "react"

export default class SchedulePopOver extends Component {
  constructor(props) {
    super(props)
    this.handleEdit = this.handleEdit.bind(this)
    this.handleSave = this.handleSave.bind(this)
  }
  state = {
    editMode: false
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
  render() {
    return (
      <div className="schedulepopover">
        <div className="header">
          <strong>SCHEDULE</strong>
          {this.editSection()}
        </div>
        <div className="body">
          <table>
            <tbody>
              <tr>
                <td>Monday</td>
                <td>
                  <span className="time">8AM-4PM</span>
                </td>
                <td>
                  <span className="time">8AM-4PM</span>
                </td>
              </tr>
              <tr>
                <td>Tuesday</td>
                <td>
                  <span className="time">8AM-4PM</span>
                </td>
                <td>
                  <span className="time">8AM-4PM</span>
                </td>
              </tr>
              <tr>
                <td>Wednesday</td>
                <td>
                  <span className="time">8AM-4PM</span>
                </td>
                <td>
                  <span className="time">8AM-4PM</span>
                </td>
              </tr>
              <tr>
                <td>Monday</td>
                <td>
                  <span className="time">8AM-4PM</span>
                </td>
                <td>
                  <span className="time">8AM-4PM</span>
                </td>
              </tr>
              <tr>
                <td>Monday</td>
                <td>
                  <span className="time">8AM-4PM</span>
                </td>
                <td>
                  <span className="time">8AM-4PM</span>
                </td>
              </tr>
              <tr>
                <td>Monday</td>
                <td>
                  <span className="time">8AM-4PM</span>
                </td>
                <td>
                  <span className="time">8AM-4PM</span>
                </td>
              </tr>
              <tr>
                <td>Monday</td>
                <td>
                  <span className="time">8AM-4PM</span>
                </td>
                <td>
                  <span className="time">8AM-4PM</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}
