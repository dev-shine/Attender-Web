import React, { Component } from "react"
import "./../../.././styles/global.css"
import "./../../.././styles/style.css"
import { push } from "react-router-redux"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import PlacesAutocomplete from "react-places-autocomplete"
import API from "./../../../services/api"

import _ from "lodash"

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
      ],
      orgImages: [],
      selectedImage: ""
    }
  }
  componentDidMount() {
    if (this.props.profile) {
      let _types = _.isEmpty(this.props.profile.types)
        ? this.state.types
        : _.isEmpty(this.props.profile.types)
      this.setState({
        isCompany: this.props.profile.isCompany,
        name: this.props.profile.name,
        companyName: this.props.profile.companyName,
        locationName: this.props.profile.locationName,
        about: this.props.profile.about,
        location: this.props.profile.location,
        types: _types,
        selectedImage: this.props.profile.image
      })
    }
  }
  // componentDidUpdate() {
  //   if (this.props.profile) {
  //     this.setState({ ...this.props.myProfile }, () => {
  //       this.state.eventType.forEach(type => {
  //         const types = this.state.types
  //         types.forEach(t => t.label == type && (t.on = true))
  //         this.setState({ types }, () => {
  //           // console.log("theprofile destructured", this.state)
  //         })
  //       })
  //     })
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
  onOpenUploader = event => {
    const uploader = this.refs.uploader
    uploader.click()
  }
  handleImageSelect = event => {
    const src = event.target.src
    const name = event.target.name
    this.setState(prev => {
      let payload = { selectedImage: src }
      if (name === "defaultImage") {
        payload.orgImages = prev.orgImages.concat(src)
      }
      return payload
    })
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
          orgImages: prev.orgImages.concat(imageBase64)
        }))
      }
      reader.readAsDataURL(image)
    })
    uploader.value = ""
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
      about = this.state.about,
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
      about,
      eventType: eventType.join()
    })
    this.setState({ isLoading: false })
    if (response.status) {
      // Update the local storage
      let profile = await API.get("auth/current")
      if (profile) {
        if (profile.status) {
          localStorage.setItem(
            "com.attender.pty.ltd.profile",
            JSON.stringify(profile.data)
          )
        }
      }
      alert("Saved!")
    } else {
      alert("Something Went Wrong")
    }
  }
  handleLocationChange = locationName => {
    this.setState({ locationName })
  }
  renderFirstStep = () => {
    const inputProps = {
      value: this.state.locationName,
      onChange: this.handleLocationChange,
      name: "locationName",
      type: "text",
      placeholder: "Location"
    }
    return (
      <div className="container xem">
        <div className="content-header">
          <h1>Event Organiser Information</h1>
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
                {this.state.isCompany && (
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
                )}
                <div className="form-group">
                  <p>Location</p>
                  <div className="pp-location">
                    <PlacesAutocomplete
                      classNames={{ input: "a-input" }}
                      inputProps={inputProps}
                    />
                    <i className="fa fa-map-marker" />
                  </div>
                  <br />
                  <br />
                  {!_.isEmpty(this.state.locationName) ? (
                    <iframe
                      width="600"
                      height="200"
                      id="gmap_canvas"
                      src={`https://maps.google.com/maps?q=${
                        this.state.locationName
                      }&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                      frameborder="0"
                      scrolling="no"
                      marginheight="0"
                      marginwidth="0"
                    />
                  ) : null}
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
                    value={this.state.about}
                  />
                  <span className="help-text pull-right">
                    {this.state.about.length}
                    /200
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
                            src={require(`../../../assets/icons/organiser/event-type/white/${
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
                            src={require(`../../../assets/icons/organiser/event-type/default/${
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
            onClick={() => this.onSave()}
          >
            Save
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
              Here you can upload photos for your Organiser
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
    const inputProps = {
      value: this.state.locationName,
      onChange: this.handleLocationChange,
      name: "locationName",
      type: "text",
      placeholder: "Location"
    }
    const thumbnails = this.state.orgImages.map((image, index) => (
      <div
        key={index}
        className="vs-p-photo"
        style={{ width: "80px", height: "80px" }}
      >
        <img
          src={image}
          style={{ maxWidth: "100%", maxHeight: "100%" }}
          hidden={!(this.state.orgImages.length > 1)}
          onClick={this.handleImageSelect}
        />
      </div>
    ))
    return (
      <div className="row">
        <div className="col-sm-12">
          <h1>Event Organiser Information</h1>
          <div className="row">
            <div className="col-sm-12">
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
                {this.state.isCompany && (
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
                )}
                <div className="form-group">
                  <p>Location</p>
                  <div className="pp-location">
                    <PlacesAutocomplete
                      classNames={{ input: "a-input" }}
                      inputProps={inputProps}
                    />
                    <i className="fa fa-map-marker" />
                  </div>
                  <br />
                  <br />
                  {!_.isEmpty(this.state.locationName) ? (
                    <iframe
                      width="600"
                      height="200"
                      id="gmap_canvas"
                      src={`https://maps.google.com/maps?q=${
                        this.state.locationName
                      }&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                      frameborder="0"
                      scrolling="no"
                      marginheight="0"
                      marginwidth="0"
                    />
                  ) : null}
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
                    value={this.state.about}
                  />
                  <span className="help-text pull-right">
                    {this.state.about.length}
                    /200
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
                            src={require(`../../../assets/icons/organiser/event-type/white/${
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
                            src={require(`../../../assets/icons/organiser/event-type/default/${
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

          <h1>Organisers Photo</h1>
          <div className="col-sm-12">
            <div className="col-sm-12 vs-p-title xm">
              <p className="help-text">
                Here you can upload photos for your Organiser
              </p>
              <p className="light-text">
                Click on the upload icon to select photo
              </p>
            </div>
            <div className="vs-p-container xm" onClick={this.onOpenUploader}>
              <span hidden={!!this.state.selectedImage}>Upload</span>
              <div style={{ width: "400px", height: "288px" }}>
                <img
                  src={this.state.selectedImage}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    margin: "auto"
                  }}
                  hidden={!this.state.selectedImage}
                />
              </div>
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
                {this.state.orgImages.length > 0 ? (
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

          <button
            className="pull-right a-btn btn-round btn-dark"
            onClick={() => this.onSave()}
          >
            Save
          </button>
        </div>
      </div>
    )
  }

  render() {
    return <div>{this.renderContent()}</div>
  }
}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrganiserEdit)
