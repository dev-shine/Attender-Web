import React, { Component } from "react"
import NavBar from "../layouts/NavBar"
import PlacesAutocomplete from "react-places-autocomplete"

import ".././styles/global.css"
import ".././styles/style.css"

import { push } from "react-router-redux"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import API from ".././services/api"

class VenueSetup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      step: 1,
      isLoading: false,
      name: "",
      managerName: "",
      locationName: "",
      types: {
        cafe: false,
        restaurant: false,
        bar: false,
        club: false,
        pub: false
      },
      services: {
        alcohol: false,
        cocktails: false,
        drinks: false,
        food: false,
        breakfast: false,
        lunch: false,
        dinner: false
      },
      numberEmployees: 0,
      openingHours: {
        monday: { end: "", start: "", off: false },
        tuesday: { end: "", start: "", off: false },
        wednesday: { end: "", start: "", off: false },
        thursday: { end: "", start: "", off: false },
        friday: { end: "", start: "", off: false },
        saturday: { end: "", start: "", off: false },
        sunday: { end: "", start: "", off: false }
      },
      staffs: {},
      frequency: [],
      location: [0, 0],
      socialMedia: {
        facebook: false,
        google: false,
        instagram: false
      }
    }
  }

  async componentWillMount() {
    let profile = await API.getProfile()
    if (profile) {
      if (profile.hasProfile) {
        this.props.goMain()
      }
    }
    this.clearAll()
  }

  clearAll = () => {
    let staffs = {
      bartender: { on: false, num: 0 },
      manager: { on: false, num: 0 },
      waiter: { on: false, num: 0 },
      chef: { on: false, num: 0 },
      barback: { on: false, num: 0 },
      kitchen: { on: false, num: 0 },
      host: { on: false, num: 0 }
    }
    let frequency = [
      {
        name: "Full Time",
        on: false
      },
      {
        name: "Part Time",
        on: false
      },
      {
        name: "Casual",
        on: false
      },
      {
        name: "Event",
        on: false
      }
    ]
    this.setState({ frequency, staffs })
  }

  onBack = () => {
    let step = this.state.step - 1
    this.setState({ step: step })
  }

  onChangeEmployees = action => {
    let numberEmployees = this.state.numberEmployees
    if (action === "add") {
      numberEmployees += 1
    } else {
      if (numberEmployees > 0) {
        numberEmployees -= 1
      }
    }
    this.setState({ numberEmployees })
  }

  onChangeFrequency = index => {
    let frequency = this.state.frequency
    frequency[index].on = !frequency[index].on
    this.setState(prevState => ({ frequency }))
  }

  onChangeInput = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onChangeStaffs = (key, action) => {
    let staffs = this.state.staffs
    if (staffs[key].on) {
      if (action === "add") {
        staffs[key].num += 1
      } else {
        if (staffs[key].num > 0) {
          staffs[key].num -= 1
        }
      }
    }
    this.setState(prevState => ({ staffs }))
  }

  onChangeTime = (e, key) => {
    let openingHours = this.state.openingHours
    openingHours[key][e.target.name] = e.target.value
    this.setState(prevState => ({ openingHours }))
  }

  onClickDay = key => {
    let openingHours = this.state.openingHours
    let day = openingHours[key]
    day.off = !day.off
    if (day.off) {
      day.start = ""
      day.end = ""
    }
    this.setState(prevState => ({ openingHours }))
  }

  onNextStep = () => {
    let step = this.state.step + 1
    this.setState({ step: step })
  }

  onSave = async () => {
    this.setState({ isLoading: true })

    let frequency = [],
      services = [],
      type = [],
      name = this.state.name,
      managerName = this.state.managerName,
      locationName = this.state.locationName,
      location = this.state.location,
      numberEmployees = this.state.numberEmployees,
      openingHours = JSON.stringify(this.state.openingHours),
      staffOfInterest = { staffs: [], frequency: [] },
      socialMedia = []

    this.state.frequency.forEach(freq => {
      if (freq.on) {
        frequency.push(freq.name)
      }
    })

    Object.keys(this.state.services).forEach(key => {
      if (this.state.services[key]) {
        services.push(key)
      }
    })

    Object.keys(this.state.types).forEach(key => {
      if (this.state.types[key]) {
        type.push(key)
      }
    })

    Object.keys(this.state.socialMedia).forEach(key => {
      if (this.state.socialMedia[key]) {
        socialMedia.push(key)
      }
    })

    Object.keys(this.state.staffs).forEach(key => {
      if (this.state.staffs[key].on) {
        staffOfInterest.staffs.push({
          position: key,
          num: this.state.staffs[key].num
        })
      }
    })

    this.state.frequency.forEach(frequency => {
      if (frequency.on) {
        staffOfInterest.frequency.push(frequency.name)
      }
    })

    API.initRequest()
    let response = await API.post("user/profile/venue", {
      name,
      managerName,
      locationName,
      openingHours,
      numberEmployees,
      services: services.join(),
      type: type.join(),
      location: location.join(),
      socialMedia: socialMedia.join(),
      staffOfInterest: JSON.stringify(staffOfInterest)
    })
    this.setState({ isLoading: false })
    if (response.status) {
      this.props.goMain()
    } else {
      alert("Something Went Wrong")
    }
  }

  onSelectOption = (key, obj) => {
    let _obj = this.state[obj]
    if (obj === "staffs") {
      _obj[key].on = !_obj[key].on
    } else {
      _obj[key] = !_obj[key]
    }
    this.setState(prevState => ({ [obj]: _obj }))
  }

  onSelectSocial = key => {
    let socialMedia = this.state.socialMedia
    socialMedia[key] = !socialMedia[key]
    this.setState(prevState => ({ socialMedia }))
  }

  handleLocationChange = locationName => {
    this.setState({ locationName })
  }

  // =============== //
  // Render Methods  //
  // ============== //

  renderFirstStep = () => {
    const inputProps = {
      value: this.state.locationName,
      onChange: this.handleLocationChange,
      name: "locationName",
      type: "text",
      placeholder: "Location"
    }
    return (
      <div className="container xxem">
        <div className="content-header">
          <p className="help-text">Lets setup a few things</p>
        </div>
        <div className="content-wide">
          <div className="row">
            <div className="col-sm-5 vs-info">
              <p className="vs-title">VENUE INFORMATION</p>
              <div className="form-group xxm">
                <input
                  type="text"
                  className="a-input"
                  name="name"
                  placeholder="Venue name"
                  onChange={this.onChangeInput}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="a-input"
                  name="managerName"
                  placeholder="Manager name"
                  onChange={this.onChangeInput}
                />
              </div>
              <p className="vs-title">TYPE OF VENUE</p>
              <div className="vs-service-container xxm">
                {Object.keys(this.state.types).map((key, index) => {
                  if (this.state.types[key]) {
                    return (
                      <div
                        className="vs-service-item-active"
                        key={index}
                        onClick={() => this.onSelectOption(key, "types")}
                      >
                        <a className="vs-service-action">
                          <img
                            alt=""
                            src={require(`.././assets/icons/venue/type/white/${key}.png`)}
                          />
                        </a>
                        <p className="xxm">{key.capitalize()}</p>
                      </div>
                    )
                  } else {
                    return (
                      <div
                        className="vs-service-item"
                        key={index}
                        onClick={() => this.onSelectOption(key, "types")}
                      >
                        <a className="vs-service-action">
                          <img
                            alt=""
                            src={require(`.././assets/icons/venue/type/default/${key}.png`)}
                          />
                        </a>
                        <p className="xxm">{key.capitalize()}</p>
                      </div>
                    )
                  }
                })}
              </div>
              <p className="vs-title xxm">LOCATION</p>
              <div className="form-group">
                <div className="vs-location">
                  <i className="fa fa-map-marker" />
                  <PlacesAutocomplete
                    classNames={{ input: "a-input" }}
                    inputProps={inputProps}
                  />
                </div>
              </div>
            </div>
            <div className="col-sm-7 vs-about">
              <p className="vs-title">OPENING HOURS</p>
              <div className="oh-container xxm scroll h-scroll">
                {Object.keys(this.state.openingHours).map((key, index) => {
                  let oh = this.state.openingHours[key]
                  if (oh.off) {
                    return (
                      <div key={index} className="oh-item inactive">
                        <div
                          className="oh-day"
                          onClick={() => this.onClickDay(key)}
                        >
                          {key.capitalize()}
                        </div>
                        <input
                          className="a-input oh"
                          type="text"
                          readOnly
                          value={oh.start}
                        />
                        <input
                          className="a-input oh"
                          type="text"
                          readOnly
                          value={oh.end}
                        />
                      </div>
                    )
                  } else {
                    return (
                      <div key={index} className="oh-item">
                        <div
                          className="oh-day"
                          onClick={() => this.onClickDay(key)}
                        >
                          {key.capitalize()}
                        </div>
                        <input
                          className="a-input oh"
                          onChange={e => this.onChangeTime(e, key)}
                          name="start"
                          type="text"
                          value={oh.start}
                        />
                        <input
                          className="a-input oh"
                          onChange={e => this.onChangeTime(e, key)}
                          name="end"
                          type="text"
                          value={oh.end}
                        />
                      </div>
                    )
                  }
                })}
              </div>
              <div className="row xxm">
                <div className="col-sm-6">
                  <p className="vs-title">NUMBER OF EMPLOYEES</p>
                  <div className="noe-container">
                    <a
                      onClick={() => this.onChangeEmployees("sub")}
                      className="noe-action"
                    >
                      <strong>–</strong>
                    </a>
                    <div className="noe-num">{this.state.numberEmployees}</div>
                    <a
                      onClick={() => this.onChangeEmployees("add")}
                      className="noe-action"
                    >
                      <strong>+</strong>
                    </a>
                  </div>
                </div>
                <div className="col-sm-6">
                  <p className="vs-title">SERVICES</p>
                  <div className="vs-service-container xxm scroll h-scroll">
                    {Object.keys(this.state.services).map((key, index) => {
                      if (this.state.services[key]) {
                        return (
                          <div
                            className="vs-service-item-active"
                            key={index}
                            onClick={() => this.onSelectOption(key, "services")}
                          >
                            <a className="vs-service-action">
                              <img
                                alt=""
                                src={require(`.././assets/icons/venue/services/white/${key}.png`)}
                              />
                            </a>
                            <p className="xxm">{key.capitalize()}</p>
                          </div>
                        )
                      } else {
                        return (
                          <div
                            className="vs-service-item"
                            key={index}
                            onClick={() => this.onSelectOption(key, "services")}
                          >
                            <a className="vs-service-action">
                              <img
                                alt=""
                                src={require(`.././assets/icons/venue/services/default/${key}.png`)}
                              />
                            </a>
                            <p className="xxm">{key.capitalize()}</p>
                          </div>
                        )
                      }
                    })}
                  </div>
                </div>
              </div>
              <div className="row xxm">
                <p className="vs-title">INTEGRATE SOCIAL MEDIA</p>
                <div className="col-sm-4 col-sm-offset-4">
                  {Object.keys(this.state.socialMedia).map((key, index) => {
                    if (this.state.socialMedia[key]) {
                      return (
                        <a
                          key={index}
                          className="vss-action active"
                          onClick={() => this.onSelectSocial(key)}
                        >
                          <i className={`fa fa-${key}`} aria-hidden="true" />
                        </a>
                      )
                    } else {
                      return (
                        <a
                          key={index}
                          className="vss-action"
                          onClick={() => this.onSelectSocial(key)}
                        >
                          <i className={`fa fa-${key}`} aria-hidden="true" />
                        </a>
                      )
                    }
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="content-wide-footer">
          <button
            className="pull-right a-btn btn-round btn-dark"
            onClick={() => this.onNextStep()}
          >
            Next
          </button>
          <button className="pull-right a-btn btn-round btn-outline xs">
            Skip
          </button>
          <button
            className="pull-left a-btn btn-round btn-dark xs"
            onClick={() => this.props.goEmployerSetup()}
          >
            Back
          </button>
        </div>
      </div>
    )
  }

  renderSecondStep = () => {
    return (
      <div className="container xxem">
        <div className="content-header">
          <h4 className="help-text">UPLOAD PHOTOS TO YOUR VENUE</h4>
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
            onClick={() => this.onNextStep()}
          >
            Next
          </button>
          <button className="pull-right a-btn btn-round btn-outline xs">
            Skip
          </button>
          <button
            className="pull-left a-btn btn-round btn-outline xs"
            onClick={() => this.onBack()}
          >
            Back
          </button>
        </div>
      </div>
    )
  }

  renderThirdStep = () => {
    return (
      <div className="container xxem">
        <div className="content-sm">
          <div className="vs-p-title xm">
            <h3>STAFF OF INTEREST</h3>
          </div>
          <div className="vs-s-container xm">
            {Object.keys(this.state.staffs).map((key, index) => {
              if (this.state.staffs[key].on) {
                return (
                  <div
                    className="vs-service-item-active"
                    key={index}
                    onClick={() => this.onSelectOption(key, "staffs")}
                  >
                    <a className="vs-service-action">
                      <img
                        alt=""
                        src={require(`.././assets/icons/staff/white/${key}.png`)}
                      />
                    </a>
                    <p className="xxm">{key.capitalize()}</p>
                  </div>
                )
              } else {
                return (
                  <div
                    className="vs-service-item"
                    key={index}
                    onClick={() => this.onSelectOption(key, "staffs")}
                  >
                    <a className="vs-service-action">
                      <img
                        alt=""
                        src={require(`.././assets/icons/staff/default/${key}.png`)}
                      />
                    </a>
                    <p className="xxm">{key.capitalize()}</p>
                  </div>
                )
              }
            })}
            <div className="row xsm scroll v-scroll">
              {Object.keys(this.state.staffs).map((key, index) => {
                if (this.state.staffs[key].on) {
                  return (
                    <div className="col-sm-6" key={index}>
                      <p className="vs-title">{key.capitalize()}</p>
                      <div className="noe-container">
                        <a
                          className="noe-action"
                          onClick={() => this.onChangeStaffs(key, "sub")}
                        >
                          <strong>–</strong>
                        </a>
                        <div className="noe-num">
                          {this.state.staffs[key].num}
                        </div>
                        <a
                          className="noe-action"
                          onClick={() => this.onChangeStaffs(key, "add")}
                        >
                          <strong>+</strong>
                        </a>
                      </div>
                    </div>
                  )
                }
                return null
              })}
            </div>
            <div className="vs-freq xxm row">
              {this.state.frequency.map((freq, index) => {
                if (freq.on) {
                  return (
                    <div
                      key={index}
                      className="vs-freq-items col-sm-3"
                      onClick={() => this.onChangeFrequency(index)}
                    >
                      {/* TODO Must understand logic on the lines below */}
                      <a className="a-checkbox active" />
                      <span>{freq.name}</span>
                    </div>
                  )
                } else {
                  return (
                    <div
                      key={index}
                      className="vs-freq-items col-sm-3"
                      onClick={() => this.onChangeFrequency(index)}
                    >
                      {/* TODO Must understand logic on the lines below */}
                      <a className="a-checkbox" />
                      <span>{freq.name}</span>
                    </div>
                  )
                }
              })}
            </div>
          </div>
        </div>
        <div className="content-sm-footer">
          <button
            className="pull-right a-btn btn-round btn-dark"
            onClick={() => this.onSave()}
          >
            Search
          </button>
          <button
            className="pull-right a-btn btn-round btn-outline xs"
            onClick={() => this.clearAll()}
          >
            Clear All
          </button>
          <button
            className="pull-left a-btn btn-round btn-outline xs"
            onClick={() => this.onBack()}
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
      case 3:
        return this.renderThirdStep()
      default:
        return this.renderFirstStep()
    }
  }

  render() {
    return (
      <div className="bg-default">
        <NavBar />
        {this.renderContent()}
      </div>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      goEmployerSetup: () => push("/employer"),
      goMain: () => push("/")
    },
    dispatch
  )

export default connect(null, mapDispatchToProps)(VenueSetup)
