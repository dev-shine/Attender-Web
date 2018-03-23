import React, { Component } from "react"
import "../.././styles/global.css"
import "../.././styles/style.css"
import { push } from "react-router-redux"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import API from "../.././services/api"

class OrganiserEdit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      step: 1,
      isLoading: false,
      isCompany: true,
      name: "",
      companyName: "",
      locationName: "",
      about: "",
      location: [0, 0],
      types: [
        {
          label: "Birthday",
          icon: "birthday",
          on: false
        },
        {
          label: "Wedding",
          icon: "wedding",
          on: false
        },
        {
          label: "Conference",
          icon: "conference",
          on: false
        },
        {
          label: "Music Festival",
          icon: "music-festival",
          on: false
        },
        {
          label: "Family Events",
          icon: "family-events",
          on: false
        }
      ]
    }
  }

  // async componentWillMount() {
  //   let profile = await API.getProfile()
  //   if (profile) {
  //     if (profile.hasProfile) {
  //       this.props.goMain()
  //     }
  //   }
  // }

  onChangeCompany = bool => {
    // TODO Understand the logic here
    let isCompany = this.state.isCompany
    let companyName = this.state.companyName
    isCompany = bool
    this.setState({ isCompany, companyName: bool ? companyName : "" })
  }

  onChangeInput = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSelectType = index => {
    let types = this.state.types
    types[index].on = !types[index].on
    this.setState(prevState => ({ types }))
  }

  onStep = value => {
    this.setState({ step: value })
  }

  onSave = async () => {
    this.setState({ isLoading: true })
    let name = this.state.name,
      isCompany = this.state.isCompany ? "1" : "0",
      companyName = this.state.companyName,
      locationName = this.state.locationName,
      bio = this.state.bio,
      eventType = [],
      location = this.state.location

    this.state.types.forEach(type => {
      if (type.on) {
        eventType.push(type.label)
      }
    })

    API.initRequest()
    let response = await API.post("user/profile/organizer", {
      name,
      isCompany,
      companyName,
      locationName,
      location: location.join(),
      bio,
      eventType: eventType.join()
    })
    this.setState({ isLoading: false })
    if (response.status) {
      alert("Success!")
    } else {
      alert("Something Went Wrong")
    }
  }

  renderFirstStep = () => {
    return (
      <div className="container xem">
        <div className="content-header">
          <h1>Create Event Organiser</h1>
        </div>
        <div className="content">
          <div className="row">
            <div className="col-sm-6">
              <div className="form-container">
                <div className="form-group">
                  <p>Organisers Name</p>
                  <input
                    type="text"
                    className="a-input"
                    name="name"
                    onChange={this.onChangeInput}
                    value={this.state.name}
                  />
                </div>
                <div className="form-group">
                  <p>Company</p>
                  <button
                    onClick={() => this.onChangeCompany(true)}
                    className={
                      this.state.isCompany ? "a-btn xs btn-active" : "a-btn xs "
                    }
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => this.onChangeCompany(false)}
                    className={
                      !this.state.isCompany
                        ? "a-btn xs btn-active"
                        : "a-btn xs "
                    }
                  >
                    No
                  </button>
                </div>
                <div className="form-group">
                  <p>Company Name</p>
                  {this.state.isCompany ? (
                    <input
                      type="text"
                      className="a-input"
                      placeholder="(Optional)"
                      name="companyName"
                      onChange={this.onChangeInput}
                      value={this.state.companyName}
                    />
                  ) : (
                    <input
                      type="text"
                      className="a-input"
                      placeholder=""
                      name="companyName"
                      onChange={this.onChangeInput}
                      value={this.state.companyName}
                      readOnly
                    />
                  )}
                </div>
                <div className="form-group">
                  <p>Location</p>
                  <div className="pp-location">
                    <input
                      type="text"
                      className="a-input"
                      name="locationName"
                      onChange={this.onChangeInput}
                      value={this.state.locationName}
                    />
                    <i className="fa fa-map-marker" />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-sm-6">
              <div className="form-container">
                <div className="form-group">
                  <p>About you / Company</p>
                  <textarea
                    rows="4"
                    cols="50"
                    className="a-input"
                    maxLength="200"
                    name="about"
                    onChange={this.onChangeInput}
                    value={this.state.bio}
                  />
                  <span className="help-text pull-right">
                    {this.state.about.length}/200
                  </span>
                </div>
              </div>
              <p className="vs-title">Type of Venue</p>
              <div className="a-icon-container xxm">
                {this.state.types.map((type, index) => {
                  if (type.on) {
                    return (
                      <div key={index} className="a-icon-item-active">
                        <a
                          className="a-icon-action"
                          onClick={() => this.onSelectType(index)}
                        >
                          <img
                            alt=""
                            src={require(`../.././assets/icons/organiser/event-type/white/${
                              type.icon
                            }.png`)}
                          />
                        </a>
                        <p className="xxm">{type.label}</p>
                      </div>
                    )
                  } else {
                    return (
                      <div key={index} className="a-icon-item">
                        <a
                          className="a-icon-action"
                          onClick={() => this.onSelectType(index)}
                        >
                          <img
                            alt=""
                            src={require(`../.././assets/icons/organiser/event-type/default/${
                              type.icon
                            }.png`)}
                          />
                        </a>
                        <p className="xxm">{type.label}</p>
                      </div>
                    )
                  }
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="content-footer">
          <button
            className="pull-right a-btn btn-round btn-dark"
            onClick={() => this.onStep(2)}
          >
            Continue
          </button>
        </div>
      </div>
    )
  }

  renderSecondStep = () => {
    return (
      <div className="container xem">
        <div className="content-header">
          <h1>Organisers Photo</h1>
        </div>
        <div className="content-vs xxm">
          <div className="vs-p-title xm">
            <p className="help-text">
              Here you can upload photos for your Venue
            </p>
            <p className="light-text">
              Click on the upload icon to select photo
            </p>
          </div>
          <div className="vs-p-container xm">
            <span>Upload</span>
          </div>
          <div className="vs-p-uploads-container xxm">
            <span>Uploaded Photos</span>
            <div className="vs-p-uploads xxm">
              <div className="vs-p-photo" />
              <div className="vs-p-photo" />
              <div className="vs-p-photo" />
            </div>
          </div>
          <div className="vs-p-uploads-container xxm">
            <span>Or select some few photos for selection below</span>
            <div className="vs-p-uploads xxm">
              <div className="vs-p-photo" />
              <div className="vs-p-photo" />
              <div className="vs-p-photo" />
              <div className="vs-p-photo" />
            </div>
          </div>
        </div>
        <div className="content-vs-footer">
          <button
            className="pull-right a-btn btn-round btn-dark"
            onClick={() => this.onSave()}
          >
            Save
          </button>
          <button
            className="pull-left a-btn btn-round btn-dark xs"
            onClick={() => this.onStep(1)}
          >
            Back
          </button>
        </div>
      </div>
    )
  }

  renderContent = () => {
    switch (this.state.step) {
      case 1:
        return this.renderFirstStep()
      case 2:
        return this.renderSecondStep()
      default:
    }
  }

  render() {
    return <div>{this.renderContent()}</div>
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(OrganiserEdit)
