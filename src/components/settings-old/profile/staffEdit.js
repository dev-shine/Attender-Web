import React, { Component } from "react"
import "../.././staff/staff.css"
import "../../.././styles/global.css"
import "../../.././styles/style.css"
import { Table, Row, Col } from "react-bootstrap"
import { push } from "react-router-redux"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import API from "../.././services/api"
import AvatarEditor from "react-avatar-editor"
import Slider from "rc-slider"
import PlacesAutocomplete from "react-places-autocomplete"
import defaultAvatar from "../../../assets/150x150.png"
import { cloudinary } from "../../services/api"
import moment from "moment"

const FontAwesome = require("react-fontawesome")

class StaffEdit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      step: 1,
      isLoading: false,
      gender: "male",
      other: "",
      fullname: "",
      bio: "",
      birthdate: "",
      preferedLocation: "",
      preferedDistance: "5km",
      frequency: "",
      eligibility: "",
      rateType: "hourly",
      startRate: 8,
      endRate: 20,
      licenses: [""],
      defaultLang: "",
      languages: [],
      description: ["", "", ""],
      descriptions: {
        nightowl: false,
        mixologist: false,
        hardworker: false,
        productive: false,
        proactive: false,
        professional: false,
        quick: false,
        fast: false,
        manager: false,
        outgoing: false,
        patient: false,
        hipster: false,
        rocker: false,
        fun: false,
        active: false,
        positive: false,
        sporty: false,
        quirky: false,
        metalhead: false,
        raver: false,
        honest: false,
        vibrant: false,
        funny: false,
        artistic: false,
        strong: false,
        sophisticated: false,
        suit: false,
        skilled: false,
        flexible: false,
        leader: false,
        inventive: false,
        awesome: false,
        muso: false,
        committed: false,
        social: false,
        friendly: false,
        traditional: false,
        green: false
      },
      lacs: [
        "Driver's License",
        "Responsible Service of Alcohol (RSA)",
        "Responsible Conduct of Gambling (RCG)",
        "Diploma of Hospitality Management",
        "Certificate 2 in Hospitality",
        "Certificate 3 in Hospitality",
        "Certificate 4 in Hospitality",
        "Certificate 3 in Events",
        "Accredited cocktail course",
        "Accredited food handling course",
        "Accredited food safety supervision",
        "Accredited Barista course",
        "Relevant Safety Certification",
        "First Aid Certification",
        "Working with children",
        "Police check",
        "Forklift licence"
      ],
      lang: [
        "English",
        "German",
        "French",
        "Japanese",
        "Spanish",
        "Portuguese",
        "Chinese",
        "Indian",
        "Arabic",
        "Korean",
        "Thai",
        "Filipino",
        "Indonesian",
        "Swedish",
        "Finnish",
        "Norweigan",
        "Vietnamese",
        "Greek",
        "Turkish",
        "Russian",
        "Nepali",
        "Polish",
        "Dutch",
        "Czech"
      ],
      positions: {
        barista: false,
        bartender: false,
        manager: false,
        waiter: false,
        chef: false,
        barback: false,
        kitchen: false,
        host: false
      },
      experiences: [
        {
          companyValue: "",
          positionValue: "",
          locationValue: "",
          startDuration: "",
          endDuration: "",
          additionalValue: ""
        }
      ],
      availability: {
        monday: {
          morning: false,
          afternoon: false,
          evening: false
        },
        tuesday: {
          morning: false,
          afternoon: false,
          evening: false
        },
        wednesday: {
          morning: false,
          afternoon: false,
          evening: false
        },
        thursday: {
          morning: false,
          afternoon: false,
          evening: false
        },
        friday: {
          morning: false,
          afternoon: false,
          evening: false
        },
        saturday: {
          morning: false,
          afternoon: false,
          evening: false
        },
        sunday: {
          morning: false,
          afternoon: false,
          evening: false
        }
      },

      // Utility States
      avatar: defaultAvatar,
      zoom: 1,
      distance: 5,
      address: ""
    }
  }

  componentDidMount() {
    console.log("the props", this.props.profile)
    if (this.props.profile) {
      this.props.profile.birthdate = moment(
        this.props.profile.birthdate
      ).toDate()
      const positions = this.state.positions
      this.props.profile.position.forEach(key => {
        positions[key] = true
      })
      this.props.profile.positions = positions
      this.setState({ ...this.props.profile }, () => {
        console.log("theprofile destructured", this.state)
      })
    }
  }

  addExperience = () => {
    let experiences = this.state.experiences
    experiences.push({
      companyValue: "",
      positionValue: "",
      locationValue: "",
      startDuration: "",
      endDuration: "",
      additionalValue: ""
    })
    this.setState(prevState => ({ experiences }))
  }

  addLanguage = e => {
    let languages = this.state.languages
    let lang = this.state.lang
    let index = lang.indexOf(e.target.value)
    languages.push(lang[index])
    lang.splice(index, 1)
    this.setState(prevState => ({ languages, lang, defaultLang: "" }))
  }

  addLicense = () => {
    let licenses = this.state.licenses
    licenses.push("")
    this.setState(prevState => ({ licenses }))
  }

  changeGender = gender => {
    this.setState({ gender, other: "" })
  }

  onClickSched = ($day, $time) => {
    let availability = this.state.availability
    availability[$day][$time] = !availability[$day][$time]
    this.setState(prevState => ({ availability: availability }))
  }
  onChangeExperience = (e, index) => {
    let experiences = this.state.experiences
    experiences[index][e.target.name] = e.target.value
    this.setState(prevState => ({ experiences }))
  }

  onChangeInput = e => {
    let target = e.target.name
    if (target === "gender") {
      this.setState({ other: e.target.value })
    }
    this.setState({
      [target]: e.target.value
    })
  }

  onRemoveLanguage = index => {
    let languages = this.state.languages
    let lang = this.state.lang
    let language = languages[index]
    lang.push(language)
    languages.splice(index, 1)
    this.setState(prevState => ({ languages, lang }))
  }

  onSave = async () => {
    this.setState({ isLoading: true })

    let position = [],
      experiences = [],
      description = this.state.description,
      fullname = this.state.fullname,
      bio = this.state.bio,
      gender = this.state.gender,
      birthdate = this.state.birthdate,
      startRate = this.state.startRate,
      endRate = this.state.endRate,
      rateType = this.state.rateType,
      frequency = this.state.frequency,
      eligibility = this.state.eligibility,
      availability = JSON.stringify(this.state.availability),
      licenses = this.state.licenses.join(),
      languages = this.state.languages.join(),
      avatar = this.state.avatar,
      preferredLocation = this.state.address,
      preferredDistance = this.state.distance

    if (
      description[0] === "" &&
      description[1] === "" &&
      description[2] === ""
    ) {
      alert("You need 3 description")
    } else {
      Object.keys(this.state.positions).forEach(key => {
        if (this.state.positions[key]) {
          position.push(key)
        }
      })
      this.state.experiences.forEach(experience => {
        if (experience.companyValue && experience.positionValue) {
          experiences.push(experience)
        }
      })
    }

    API.initRequest()

    const image = await cloudinary.uploadFile({
      cloudName: "dnjfb0e8d",
      resourceType: "image",
      file: avatar,
      preset: "aepowkth"
    })

    let response = await API.post("user/profile/staff", {
      fullname,
      bio,
      gender,
      frequency,
      eligibility,
      availability,
      startRate,
      endRate,
      rateType,
      licenses,
      languages,
      birthdate,
      experiences: JSON.stringify(experiences),
      avatar: image,
      position: position.join(),
      description: description.join(),
      preferredLocation,
      preferredDistance
    })

    this.setState({ isLoading: false })
    if (response.status) {
      alert("Success!")
    } else {
      alert("Something Went Wrong")
    }
  }

  onSelectDescription = (e, index) => {
    let description = this.state.description
    let descriptions = this.state.descriptions
    descriptions[e.target.value] = !descriptions[e.target.value]
    let old = description[index]
    descriptions[String(old).toLowerCase()] = !descriptions[
      String(old).toLowerCase()
    ]
    description[index] = e.target.value
    this.setState(prevState => ({ descriptions, description }))
  }

  onSelectLicence = (e, index) => {
    let licenses = this.state.licenses
    licenses[index] = e.target.value
    this.setState(prevState => ({ licenses }))
  }

  onSelectPosition = position => {
    let positions = this.state.positions
    positions[position] = !positions[position]
    this.setState(prevState => ({ positions }))
  }

  onStep = value => {
    this.setState({ step: value })

    if (this.editor && value === 2) {
      const canvas = this.editor.getImageScaledToCanvas()
      this.setState({ avatar: canvas.toDataURL() })
    }
  }

  onOpenUploader = event => {
    const uploader = this.refs.uploader
    uploader.click()
  }

  onUploadImage = event => {
    const reader = new FileReader()
    const imageData = event.target.files[0]
    const uploader = this.refs.uploader

    reader.onloadend = async () => {
      const imageBase64 = reader.result
      this.setState({
        avatar: imageBase64
      })
    }
    reader.readAsDataURL(imageData)
    uploader.value = ""
  }

  onRemovePhoto = evennt => {
    this.setState({
      avatar: defaultAvatar,
      zoom: 1
    })
  }

  onImageZoomChange = scale => {
    this.setState({ zoom: scale })
  }

  handleHourlyRateChange = event => {
    const value = event.target.value * 1

    this.setState({
      startRate: 8 + value,
      endRate: 20 + value
    })
  }

  handleChangeDistance = event => {
    this.setState({ distance: event.target.value * 1 / 10 })
  }

  handleLocationSelect = address => {
    this.setState({ address })
  }

  setEditorRef = editor => (this.editor = editor)

  // ============== //
  // RENDER METHODS //
  // ============== //

  renderDescription = index => {
    return (
      <select
        key={index}
        defaultValue={this.state.description[index]}
        onChange={e => this.onSelectDescription(e, index)}
      >
        <option disabled value="">
          Select Description
        </option>
        {Object.keys(this.state.descriptions).map((key, i) => {
          if (this.state.descriptions[key]) {
            return (
              <option key={i} value={key} disabled>
                {key.capitalize()}
              </option>
            )
          } else {
            return (
              <option key={i} value={key}>
                {key.capitalize()}
              </option>
            )
          }
        })}
      </select>
    )
  }

  renderFirstStep = () => {
    return (
      <div className="container xem">
        <div className="content-header">
          <h1>Profile Information</h1>
        </div>
        <div className="content">
          <Row>
            <Col sm={6} className="form-container">
              <div className="pp-container">
                <div className="pp-header">
                  Click on the box to upload Profile Picture
                </div>
                <div className="pp-holder" onClick={this.onOpenUploader}>
                  <AvatarEditor
                    ref={this.setEditorRef}
                    image={this.state.avatar}
                    width={250}
                    height={250}
                    color={[255, 255, 255, 0.6]} // RGBA
                    scale={this.state.zoom}
                    crossOrigin="anonymous"
                  />
                  <input
                    type="file"
                    ref="uploader"
                    onChange={this.onUploadImage}
                    hidden
                  />
                </div>
                <div className="pp-action">
                  <a href="javascript:void(0)" onClick={this.onRemovePhoto}>
                    <p>Remove Photo</p>
                  </a>
                  <div className="pp-slider">
                    <Slider
                      min={1.0}
                      max={10.0}
                      step={0.1}
                      value={this.state.zoom}
                      onChange={this.onImageZoomChange}
                    />
                  </div>
                </div>
              </div>
            </Col>
            <Col sm={6} className="form-container">
              <div className="form-group">
                <p>Full Name</p>
                <input
                  type="text"
                  onChange={this.onChangeInput}
                  name="fullname"
                  className="a-input"
                  value={this.state.fullname}
                />
              </div>
              <div className="form-group">
                <p>Bio</p>
                <textarea
                  maxLength="200"
                  rows="4"
                  cols="50"
                  className="a-input"
                  onChange={this.onChangeInput}
                  name="bio"
                  value={this.state.bio}
                />
                <span className="help-text pull-right">
                  {this.state.bio.length}/200
                </span>
              </div>
              <div className="form-group">
                <p>Birthdate</p>
                <input
                  type="date"
                  name="birthdate"
                  onChange={this.onChangeInput}
                  className="a-input sm"
                  value={this.state.birthdate}
                />
              </div>
              <div className="form-group">
                <p>Gender</p>
                <button
                  onClick={() => this.changeGender("male")}
                  className={
                    this.state.gender === "male" ? "a-btn btn-active" : "a-btn"
                  }
                >
                  <FontAwesome name="mars" size="1x" />&nbsp;&nbsp;Male
                </button>
                <button
                  onClick={() => this.changeGender("female")}
                  className={
                    this.state.gender === "female"
                      ? "a-btn btn-active"
                      : "a-btn"
                  }
                >
                  <FontAwesome name="venus" />&nbsp;&nbsp;Female
                </button>
                <input
                  onChange={this.onChangeInput}
                  name="gender"
                  type="text"
                  className="a-input xs"
                  placeholder="Other"
                  value={this.state.other}
                />
              </div>
            </Col>
          </Row>
        </div>
        <div className="content-footer">
          <button
            className="pull-right a-btn btn-round btn-dark"
            onClick={() => this.onStep(2)}
          >
            Next
          </button>
        </div>
      </div>
    )
  }

  renderSecondStep = () => {
    const inputProps = {
      value: this.state.address,
      onChange: this.handleLocationSelect,
      name: "preferedLocation",
      type: "text"
    }
    return (
      <div className="container xem">
        <div className="content-header">
          <h1>Job Description</h1>
        </div>
        <div className="content-wide">
          <Row>
            <Col sm={4} className="form-container-wide">
              <div className="form-group">
                <p>Describe yourself in 3 words</p>
                {this.state.description.map((desc, index) => {
                  return this.renderDescription(index)
                })}
              </div>
              <div className="form-group">
                <p>Spoken Languages</p>
                <select
                  onChange={this.addLanguage}
                  value={this.state.defaultLang}
                >
                  <option disabled value="">
                    Select Languages
                  </option>
                  {this.state.lang.map((lang, index) => {
                    return <option key={index}>{lang}</option>
                  })}
                </select>
                <div className="pp-languages v-scroll scroll">
                  {this.state.languages.map((lang, index) => {
                    return (
                      <div key={index} className="pp-language">
                        <img
                          alt=""
                          src={require(`../../../assets/icons/flags/${lang}.png`)}
                        />
                        <input
                          readOnly
                          value={lang}
                          type="text"
                          className="a-input-outline"
                        />
                        <a
                          onClick={() => this.onRemoveLanguage(index)}
                          className="a-btn-circle"
                        >
                          -
                        </a>
                      </div>
                    )
                  })}
                </div>
              </div>
            </Col>
            <Col sm={4} className="form-container-wide">
              <div className="form-group">
                <p>Job Description</p>
                <div className="h-scroll scroll">
                  {Object.keys(this.state.positions).map((key, index) => {
                    if (this.state.positions[key]) {
                      return (
                        <div
                          key={index}
                          className="vs-service-item-active"
                          onClick={() => this.onSelectPosition(key)}
                        >
                          <a className="vs-service-action">
                            <img
                              alt=""
                              src={require(`../../../assets/icons/staff/white/${key}.png`)}
                            />
                          </a>
                          <p className="xxm">{key.capitalize()}</p>
                        </div>
                      )
                    } else {
                      return (
                        <div
                          key={index}
                          className="vs-service-item"
                          onClick={() => this.onSelectPosition(key)}
                        >
                          <a className="vs-service-action">
                            <img
                              alt=""
                              src={require(`../../../assets/icons/staff/default/${key}.png`)}
                            />
                          </a>
                          <p className="xxm">{key.capitalize()}</p>
                        </div>
                      )
                    }
                  })}
                </div>
              </div>
              <div className="form-group xm">
                <p>
                  Hourly Rate &nbsp;&nbsp;<span className="dark-text">
                    ${this.state.startRate}/hr - ${this.state.endRate}/hr
                  </span>
                </p>
                <input
                  type="range"
                  min="0"
                  max="130"
                  defaultValue={0}
                  className="a-slider"
                  onChange={this.handleHourlyRateChange}
                />
              </div>
              <div className="form-group xm">
                <span className="lg-text">Work Type &nbsp;</span>
                <select
                  className="sm pull-right"
                  name="frequency"
                  onChange={this.onChangeInput}
                  value={this.state.frequency}
                >
                  <option value="" disabled>
                    Select Frequency
                  </option>
                  <option>Full Time</option>
                  <option>Part Time</option>
                  <option>Casual</option>
                </select>
              </div>
              <div className="form-group xm">
                <span className="lg-text">Work Eligibility &nbsp;</span>
                <select
                  className="sm pull-right"
                  name="eligibility"
                  onChange={this.onChangeInput}
                  value={this.state.eligibility}
                >
                  <option value="" disabled>
                    Select Eligibility
                  </option>
                  <option>Citizenship</option>
                  <option>Working Visa</option>
                </select>
              </div>
            </Col>
            <Col sm={4} className="form-container">
              <div className="form-group">
                <p>Licence and Certification</p>
                <div className="v-scroll scroll xsh-fixed">
                  {this.state.licenses.map((license, index) => {
                    return (
                      <select
                        key={index}
                        defaultValue=""
                        onChange={e => this.onSelectLicence(e, index)}
                      >
                        <option disabled value="">
                          Select
                        </option>
                        {this.state.lacs.map((lac, index) => {
                          return <option key={index}>{lac}</option>
                        })}
                      </select>
                    )
                  })}
                </div>
                <button
                  onClick={() => this.addLicense()}
                  className="pull-right a-btn btn-round btn-dark xxm-xr"
                >
                  Add More
                </button>
              </div>
              <div className="form-group xm">
                <p>Prefered Location</p>
                <div className="pp-location">
                  <PlacesAutocomplete
                    classNames={{ input: "a-input-outline" }}
                    inputProps={inputProps}
                  />
                  <i className="fa fa-map-marker" />
                </div>
              </div>
              <div className="form-group xm">
                <p>
                  Distance &nbsp;&nbsp;<span className="dark-text">
                    {`${this.state.distance}km`}
                  </span>
                </p>
                <input
                  type="range"
                  min="1"
                  max="100"
                  defaultValue={50}
                  className="a-slider"
                  onChange={this.handleChangeDistance}
                />
              </div>
            </Col>
          </Row>
        </div>
        <div className="content-wide-footer">
          <button
            className="pull-right a-btn btn-round btn-dark"
            onClick={() => this.onStep(3)}
          >
            Next
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

  renderThirdStep = () => {
    return (
      <div className="container xem">
        <div className="content-header">
          <h1>Job Description</h1>
        </div>
        <div className="content-md">
          <Row>
            <Col sm={5} className="form-container">
              <div className="sched-header">
                <p>Availability</p>
                <span>Tap on the box to fill your schedule</span>
              </div>
              <Row className="sched-container">
                <Table responsive>
                  <thead>
                    <tr>
                      <td />
                      <td>Morning</td>
                      <td>Afternoon</td>
                      <td>Evening</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Monday</td>
                      <td
                        onClick={() => this.onClickSched("monday", "morning")}
                        className={
                          this.state.availability.monday.morning ? "s-box" : ""
                        }
                      >
                        {!this.state.availability.monday.morning ? (
                          <a className="s-btn">+</a>
                        ) : null}
                      </td>
                      <td
                        onClick={() => this.onClickSched("monday", "afternoon")}
                        className={
                          this.state.availability.monday.afternoon
                            ? "s-box"
                            : ""
                        }
                      >
                        {!this.state.availability.monday.afternoon ? (
                          <a className="s-btn">+</a>
                        ) : null}
                      </td>
                      <td
                        onClick={() => this.onClickSched("monday", "evening")}
                        className={
                          this.state.availability.monday.evening ? "s-box" : ""
                        }
                      >
                        {!this.state.availability.monday.evening ? (
                          <a className="s-btn">+</a>
                        ) : null}
                      </td>
                    </tr>
                    <tr>
                      <td>Tuesday</td>
                      <td
                        onClick={() => this.onClickSched("tuesday", "morning")}
                        className={
                          this.state.availability.tuesday.morning ? "s-box" : ""
                        }
                      >
                        {!this.state.availability.tuesday.morning ? (
                          <a className="s-btn">+</a>
                        ) : null}
                      </td>
                      <td
                        onClick={() =>
                          this.onClickSched("tuesday", "afternoon")
                        }
                        className={
                          this.state.availability.tuesday.afternoon
                            ? "s-box"
                            : ""
                        }
                      >
                        {!this.state.availability.tuesday.afternoon ? (
                          <a className="s-btn">+</a>
                        ) : null}
                      </td>
                      <td
                        onClick={() => this.onClickSched("tuesday", "evening")}
                        className={
                          this.state.availability.tuesday.evening ? "s-box" : ""
                        }
                      >
                        {!this.state.availability.tuesday.evening ? (
                          <a className="s-btn">+</a>
                        ) : null}
                      </td>
                    </tr>
                    <tr>
                      <td>Wednesday</td>
                      <td
                        onClick={() =>
                          this.onClickSched("wednesday", "morning")
                        }
                        className={
                          this.state.availability.wednesday.morning
                            ? "s-box"
                            : ""
                        }
                      >
                        {!this.state.availability.wednesday.morning ? (
                          <a className="s-btn">+</a>
                        ) : null}
                      </td>
                      <td
                        onClick={() =>
                          this.onClickSched("wednesday", "afternoon")
                        }
                        className={
                          this.state.availability.wednesday.afternoon
                            ? "s-box"
                            : ""
                        }
                      >
                        {!this.state.availability.wednesday.afternoon ? (
                          <a className="s-btn">+</a>
                        ) : null}
                      </td>
                      <td
                        onClick={() =>
                          this.onClickSched("wednesday", "evening")
                        }
                        className={
                          this.state.availability.wednesday.evening
                            ? "s-box"
                            : ""
                        }
                      >
                        {!this.state.availability.wednesday.evening ? (
                          <a className="s-btn">+</a>
                        ) : null}
                      </td>
                    </tr>
                    <tr>
                      <td>Thursday</td>
                      <td
                        onClick={() => this.onClickSched("thursday", "morning")}
                        className={
                          this.state.availability.thursday.morning
                            ? "s-box"
                            : ""
                        }
                      >
                        {!this.state.availability.thursday.morning ? (
                          <a className="s-btn">+</a>
                        ) : null}
                      </td>
                      <td
                        onClick={() =>
                          this.onClickSched("thursday", "afternoon")
                        }
                        className={
                          this.state.availability.thursday.afternoon
                            ? "s-box"
                            : ""
                        }
                      >
                        {!this.state.availability.thursday.afternoon ? (
                          <a className="s-btn">+</a>
                        ) : null}
                      </td>
                      <td
                        onClick={() => this.onClickSched("thursday", "evening")}
                        className={
                          this.state.availability.thursday.evening
                            ? "s-box"
                            : ""
                        }
                      >
                        {!this.state.availability.thursday.evening ? (
                          <a className="s-btn">+</a>
                        ) : null}
                      </td>
                    </tr>
                    <tr>
                      <td>Friday</td>
                      <td
                        onClick={() => this.onClickSched("friday", "morning")}
                        className={
                          this.state.availability.friday.morning ? "s-box" : ""
                        }
                      >
                        {!this.state.availability.friday.morning ? (
                          <a className="s-btn">+</a>
                        ) : null}
                      </td>
                      <td
                        onClick={() => this.onClickSched("friday", "afternoon")}
                        className={
                          this.state.availability.friday.afternoon
                            ? "s-box"
                            : ""
                        }
                      >
                        {!this.state.availability.friday.afternoon ? (
                          <a className="s-btn">+</a>
                        ) : null}
                      </td>
                      <td
                        onClick={() => this.onClickSched("friday", "evening")}
                        className={
                          this.state.availability.friday.evening ? "s-box" : ""
                        }
                      >
                        {!this.state.availability.friday.evening ? (
                          <a className="s-btn">+</a>
                        ) : null}
                      </td>
                    </tr>
                    <tr>
                      <td>Saturday</td>
                      <td
                        onClick={() => this.onClickSched("saturday", "morning")}
                        className={
                          this.state.availability.saturday.morning
                            ? "s-box"
                            : ""
                        }
                      >
                        {!this.state.availability.saturday.morning ? (
                          <a className="s-btn">+</a>
                        ) : null}
                      </td>
                      <td
                        onClick={() =>
                          this.onClickSched("saturday", "afternoon")
                        }
                        className={
                          this.state.availability.saturday.afternoon
                            ? "s-box"
                            : ""
                        }
                      >
                        {!this.state.availability.saturday.afternoon ? (
                          <a className="s-btn">+</a>
                        ) : null}
                      </td>
                      <td
                        onClick={() => this.onClickSched("saturday", "evening")}
                        className={
                          this.state.availability.saturday.evening
                            ? "s-box"
                            : ""
                        }
                      >
                        {!this.state.availability.saturday.evening ? (
                          <a className="s-btn">+</a>
                        ) : null}
                      </td>
                    </tr>
                    <tr>
                      <td>Sunday</td>
                      <td
                        onClick={() => this.onClickSched("sunday", "morning")}
                        className={
                          this.state.availability.sunday.morning ? "s-box" : ""
                        }
                      >
                        {!this.state.availability.sunday.morning ? (
                          <a className="s-btn">+</a>
                        ) : null}
                      </td>
                      <td
                        onClick={() => this.onClickSched("sunday", "afternoon")}
                        className={
                          this.state.availability.sunday.afternoon
                            ? "s-box"
                            : ""
                        }
                      >
                        {!this.state.availability.sunday.afternoon ? (
                          <a className="s-btn">+</a>
                        ) : null}
                      </td>
                      <td
                        onClick={() => this.onClickSched("sunday", "evening")}
                        className={
                          this.state.availability.sunday.evening ? "s-box" : ""
                        }
                      >
                        {!this.state.availability.sunday.evening ? (
                          <a className="s-btn">+</a>
                        ) : null}
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Row>
            </Col>
            <Col sm={7} className="form-container">
              <div className="sched-header">
                <p>Work Experience</p>
                <span>Optional</span>
              </div>
              <Row className="xxm v-scroll scroll h-fixed">
                {this.state.experiences.map((experience, index) => {
                  return (
                    <div key={index}>
                      <Col sm={6} className="form-group">
                        <p>Company</p>
                        <input
                          name="companyValue"
                          value={experience.companyValue}
                          onChange={e => this.onChangeExperience(e, index)}
                          type="text"
                          className="a-input"
                        />
                      </Col>
                      <Col sm={6} className="form-group">
                        <p>Position</p>
                        <input
                          name="positionValue"
                          value={experience.positionValue}
                          onChange={e => this.onChangeExperience(e, index)}
                          type="text"
                          className="a-input"
                        />
                      </Col>
                      <Col sm={6} className="form-group">
                        <p>Location</p>
                        <input
                          name="locationValue"
                          value={experience.locationValue}
                          onChange={e => this.onChangeExperience(e, index)}
                          type="text"
                          className="a-input"
                        />
                      </Col>
                      <Col sm={3} className="form-group no-wrap">
                        <p>Duration</p>
                        <input
                          type="text"
                          name="endDuration"
                          value={experience.endDuration}
                          onChange={e => this.onChangeExperience(e, index)}
                          className="a-input half xr"
                          placeholder="Years"
                        />
                        <input
                          type="text"
                          name="startDuration"
                          value={experience.startDuration}
                          onChange={e => this.onChangeExperience(e, index)}
                          className="a-input half"
                          placeholder="Months"
                        />
                      </Col>
                      <Col sm={12} className="form-group">
                        <p>Additional Information</p>
                        <textarea
                          maxLength="200"
                          rows="4"
                          value={experience.additionalValue}
                          name="additionalValue"
                          onChange={e => this.onChangeExperience(e, index)}
                          cols="50"
                          className="a-input full"
                        />
                        <span className="help-text pull-right">
                          {experience.additionalValue &&
                            experience.additionalValue.length}/200
                        </span>
                      </Col>
                    </div>
                  )
                })}
                <Col sm={12} className="form-group">
                  <button
                    onClick={() => this.addExperience()}
                    className="pull-right a-btn btn-round btn-dark wide-md xxm-xr"
                  >
                    + Add Experience
                  </button>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
        <div className="content-md-footer">
          <button
            className="pull-right a-btn btn-round btn-dark"
            onClick={() => this.onSave()}
          >
            Save
          </button>
          <button
            className="pull-left a-btn btn-round btn-dark xs"
            onClick={() => this.onStep(2)}
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
    }
  }

  render() {
    return <div>{this.renderContent()}</div>
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(StaffEdit)
