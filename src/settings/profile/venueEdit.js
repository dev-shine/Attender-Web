import React, { Component } from "react"
import PlacesAutocomplete from "react-places-autocomplete"

import "../.././styles/global.css"
import "../.././styles/style.css"

import { push } from "react-router-redux"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import API, { cloudinary } from "../.././services/api"

class VenueEdit extends Component {
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
      },
      venueImages: [],
      selectedImage: ""
    }
  }

  componentDidMount() {
    console.log("the props", this.props.profile)
    if (this.props.profile) {
      const services = this.state.services
      this.props.profile.services.forEach(key => {
        services[key] = true
      })
      this.props.profile.services = services
      const types = this.state.types
      this.props.profile.type.forEach(key => {
        types[key] = true
      })
      this.props.profile.types = types
      this.setState({ ...this.props.profile }, () => {
        console.log("theprofile destructured", this.state)
      })
    }
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

    const image = await cloudinary.uploadFile({
      cloudName: "dnjfb0e8d",
      resourceType: "image",
      file: this.state.selectedImage,
      preset: "aepowkth"
    })

    API.initRequest()
    let response = await API.post("user/profile/venue", {
      name,
      managerName,
      image,
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
      alert("Success!")
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

  onOpenUploader = event => {
    const uploader = this.refs.uploader
    uploader.click()
  }

  onUploadImage = event => {
    const images = event.target.files
    const uploader = this.refs.uploader

    Object.values(images).forEach((image, index) => {
      const reader = new FileReader()
      reader.onloadend = async () => {
        const imageBase64 = reader.result
        if (index === 0) {
          this.setState({ selectedImage: imageBase64 })
        }
        this.setState(prev => ({
          venueImages: prev.venueImages.concat(imageBase64)
        }))
      }
      reader.readAsDataURL(image)
    })
    uploader.value = ""
  }

  handleLocationChange = locationName => {
    this.setState({ locationName })
  }

  handleImageSelect = event => {
    const src = event.target.src
    const name = event.target.name
    this.setState(prev => {
      let payload = { selectedImage: src }
      if (name === "defaultImage") {
        payload.venueImages = prev.venueImages.concat(src)
      }
      return payload
    })
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
                  value={this.state.name}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="a-input"
                  name="managerName"
                  placeholder="Manager name"
                  onChange={this.onChangeInput}
                  value={this.state.managerName}
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
                            src={require(`../.././assets/icons/venue/type/white/${key}.png`)}
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
                            src={require(`../.././assets/icons/venue/type/default/${key}.png`)}
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
                                src={require(`../.././assets/icons/venue/services/white/${key}.png`)}
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
                                src={require(`../.././assets/icons/venue/services/default/${key}.png`)}
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
        </div>
      </div>
    )
  }

  renderSecondStep = () => {
    const thumbnails = this.state.venueImages.map((image, index) => (
      <div key={index} className="vs-p-photo">
        <img
          src={image}
          width="80"
          height="80"
          hidden={!(this.state.venueImages.length > 1)}
          onClick={this.handleImageSelect}
        />
      </div>
    ))
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
          <div className="vs-p-container xm" onClick={this.onOpenUploader}>
            <span hidden={!!this.state.selectedImage}>Upload</span>
            <img
              src={this.state.selectedImage}
              width="400"
              height="288"
              hidden={!this.state.selectedImage}
              style={{ margin: "auto" }}
            />
          </div>

          <input
            type="file"
            ref="uploader"
            onChange={this.onUploadImage}
            multiple
            hidden
          />
          <div className="vs-p-uploads-container xxm">
            <span>Uploaded Photos</span>
            <div className="vs-p-uploads xxm" style={{ overflow: "auto" }}>
              {this.state.venueImages.length > 0 ? (
                thumbnails
              ) : (
                <div>
                  <div className="vs-p-photo" />
                  <div className="vs-p-photo" />
                  <div className="vs-p-photo" />
                  <div className="vs-p-photo" />
                </div>
              )}
            </div>
          </div>
          <div className="vs-p-uploads-container xxm">
            <span>Or select some few photos for selection below</span>
            <div className="vs-p-uploads xxm">
              <div className="vs-p-photo">
                <img
                  name="defaultImage"
                  src="https://picsum.photos/400/288/?image=42"
                  width="80"
                  height="80"
                  onClick={this.handleImageSelect}
                />
              </div>
              <div className="vs-p-photo">
                <img
                  name="defaultImage"
                  src="https://picsum.photos/400/288/?image=78"
                  width="80"
                  height="80"
                  onClick={this.handleImageSelect}
                />
              </div>
              <div className="vs-p-photo">
                <img
                  name="defaultImage"
                  src="https://picsum.photos/400/288/?image=192"
                  width="80"
                  height="80"
                  onClick={this.handleImageSelect}
                />
              </div>
              <div className="vs-p-photo">
                <img
                  name="defaultImage"
                  src="https://picsum.photos/400/288/?image=263"
                  width="80"
                  height="80"
                  onClick={this.handleImageSelect}
                />
              </div>
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
      default:
        return this.renderFirstStep()
    }
  }

  render() {
    return <div>{this.renderContent()}</div>
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)

export default connect(null, mapDispatchToProps)(VenueEdit)
