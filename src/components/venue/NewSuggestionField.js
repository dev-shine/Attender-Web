import React, { Component } from "react"

class NewSuggestionField extends Component {
  constructor() {
    super()
    this.state = {
      form: "newSuggestionFieldForm",
      placeholder: "Enter Suggestion"
    }
    this.save = this.save.bind(this)
  }
  handleDescChange(e) {
    this.setState({ description: e.target.value })
  }
  save(event) {
    event.preventDefault()
    this.props.save(this.state)
    event.target.reset()
  }
  render() {
    return (
      <form
        name={this.state.form}
        id={this.state.form}
        onSubmit={e => this.save(e)}
      >
        <div className="my-staff-ss-item">
          <div className="my-staff-ss-check">
            <img
              alt=""
              src={require("./../../assets/icons/venue/check-item.png")}
            />
          </div>
          <div className="my-staff-ss-desc">
            <p>
              <input
                className="taskName"
                type="text"
                name="description"
                placeholder={this.state.placeholder}
                onChange={e => this.handleDescChange(e)}
              />
              <button>Save</button>
            </p>
          </div>
          <a className="a-btn-circle">—</a>
        </div>
      </form>
    )
  }
}
export default NewSuggestionField
