import React, { Component } from "react"

class newTaskForm extends Component {
  constructor() {
    super()
    this.state = {
      description: ""
    }
    this.saveTask = this.saveTask.bind(this)
  }
  handleDescChange(e) {
    console.log(e)
    this.setState({ description: e.target.value })
  }
  saveTask(event) {
    event.preventDefault()
    this.props.saveTask(this.state)
    event.target.reset()
  }
  render() {
    return (
      <form
        name="newTaskFieldForm"
        id="newTaskFieldForm"
        onSubmit={e => this.saveTask(e)}
      >
        <div className="my-staff-ss-item">
          <div className="my-staff-ss-check">
            <img
              alt=""
              src={require(".././assets/icons/venue/check-item.png")}
            />
          </div>
          <div className="my-staff-ss-desc">
            <p>
              <input
                className="taskName"
                type="text"
                name="description"
                placeholder="Enter task here"
                onChange={e => this.handleDescChange(e)}
              />
              <button>Save 🤘</button>
            </p>
          </div>
          <a className="a-btn-circle">—</a>
        </div>
      </form>
    )
  }
}
export default newTaskForm
