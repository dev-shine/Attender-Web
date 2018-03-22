import React, { Component } from "react"

class newTaskField extends Component {
  render() {
    return (
      <div className="my-staff-ss-item">
        <div className="my-staff-ss-check">
          <img alt="" src={require(".././assets/icons/venue/check-item.png")} />
        </div>
        <div className="my-staff-ss-desc">
          <p>
            <input
              className="taskName"
              type="text"
              name="_description"
              placeholder="Enter task here"
            />
          </p>
        </div>
        <a className="a-btn-circle">—</a>
      </div>
    )
  }
}
export default newTaskField
