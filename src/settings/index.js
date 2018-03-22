import React, { Component } from "react"
import NavBar from "../layouts/NavBar"
import VenueSetup from "./profile/venueSetup"
import ".././styles/global.css"
import ".././styles/style.css"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import API from "./../services/api"
import AvatarEditor from "react-avatar-editor"
import Slider from "rc-slider"
import defaultAvatar from ".././assets/150x150.png"
import "./settings.css"

class Settings extends Component {
  constructor(props) {
    super(props)
    this.state = {
      step: 1,
      isLoading: false,
      isChangingEmail: false,
      isChangingPassword: false,
      isDeletingAccount: false,
      emailChangeMessage: "",
      passwordChangeMessage: "",
      deleteAccountMessage: "",
      oldEmail: "",
      newEmail: "",
      newPassword: "",
      newPasswordConfirm: "",
      passwordVerification: "",
      eventEditProfileForm: {
        picture: "",
        organizerName: "",
        company: "no",
        companyName: "",
        location: "",
        about: "",
        eventType: "",
        organizerImage: ""
      },
      eventTypes: {
        birthday: { on: false, name: "Birthday", image: "birthday.png" },
        wedding: { on: false, name: "Wedding", image: "wedding.png" },
        conference: { on: false, name: "Conference", image: "conference.png" },
        music: {
          on: false,
          name: "Music Festival",
          image: "music-festival.png"
        },
        familyevent: {
          on: false,
          name: "Family Events",
          image: "family-events.png"
        },
        other: { on: false, name: "Other", image: "note.png" }
      },

      // Utility States
      avatar: defaultAvatar,
      zoom: 1
    }
  }

  componentWillMount = async () => {
    API.initRequest()
  }

  onChangeEventEditProfileForm = e => {
    let eventEditProfileForm = Object.assign(
      {},
      this.state.eventEditProfileForm
    )
    eventEditProfileForm[e.target.name] = e.target.value
    this.setState({ eventEditProfileForm })
  }

  onChangeInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  getImageUrl = data => {
    API.uploadImage(data, "avatars", res => {
      console.log("image url", res)
      this.setState({ photo: { uri: res.secure_url }, isLoading: false })
    })
  }

  onSaveEditProfile = async () => {
    this.setState({ isLoading: true })
    let name = this.state.eventEditProfileForm.name,
      isCompany = this.state.eventEditProfileForm.company === "yes" ? "1" : "0",
      companyName = this.state.eventEditProfileForm.companyName,
      locationName = this.state.eventEditProfileForm.location,
      bio = this.state.eventEditProfileForm.about,
      eventType = [],
      location = this.state.location

    Object.keys(this.state.eventTypes).forEach(key => {
      if (this.state.eventTypes[key].on) {
        eventType.push(this.state.eventTypes[key].name)
      }
    })

    API.initRequest()
    let response = await API.post("user/profile/organizer", {
      name,
      isCompany,
      companyName,
      locationName,
      location: [0, 0].join(),
      bio,
      eventType: eventType.join()
    })
    this.setState({ isLoading: false })
    if (response.status) {
      alert("success")
    } else {
      alert("Something Went Wrong")
    }
  }

  onSelectOption = (key, obj) => {
    let _obj = this.state[obj]
    _obj[key].on = !_obj[key].on
    this.setState(prevState => ({ [obj]: _obj }))
  }

  onSaveEmailChange = event => {
    event.preventDefault()

    const body = {
      oldEmail: this.state.oldEmail,
      newEmail: this.state.newEmail
    }

    // Should validate if it is a valid email and not empty
    console.log("the body", body)

    API.post("user/profile/change-email", body).then(res => {
      if (!res.status) {
        this.setState({ emailChangeMessage: res.message })
      }

      if (res.status) {
        this.setState({ emailChangeMessage: res.message })
      }
    })
  }

  onSavePasswordChange = event => {
    event.preventDefault()

    const body = {
      newPassword: this.state.newPassword,
      newPasswordConfirm: this.state.newPasswordConfirm
    }

    console.log("the body", body)

    API.post("user/profile/change-password", body).then(res => {
      if (!res.status) {
        this.setState({ passwordChangeMessage: res.message })
      }

      if (res.status) {
        this.setState({ passwordChangeMessage: res.message })
      }
    })
  }

  onDeleteAccount = event => {
    event.preventDefault()

    const body = {
      password: this.state.passwordVerification
    }

    API.post("user/profile/deactivate-user", body).then(res => {
      this.setState({ deleteAccountMessage: res.message })
    })
  }

  handleChangeEmailClick = () => {
    this.setState({ isChangingEmail: !this.state.isChangingEmail })
  }

  handleChangePasswordClick = () => {
    this.setState({ isChangingPassword: !this.state.isChangingPassword })
  }

  handleDeleteAccount = () => {
    this.setState({ isDeletingAccount: !this.state.isDeletingAccount })
  }

  renderGeneral = () => {
    return (
      <div className="settings-container">
        <div className="setting-head">General Settings</div>
        <div className="setting-menu">
          <div className="setting-menu-item">
            <div className="row">
              <div className="col-sm-3">Edit Profile</div>
              <div className="col-sm-9">Edit Profile Information</div>
            </div>
          </div>
          <div className="setting-menu-item">
            <div className="row">
              <div className="col-sm-3">Change Email</div>
              {!this.state.isChangingEmail && (
                <div className="col-sm-9">
                  <button onClick={this.handleChangeEmailClick.bind(this)}>
                    Edit
                  </button>
                </div>
              )}
              <div
                className={`col-sm-9 accordion ${this.state.isChangingEmail &&
                  "open"}`}
              >
                <form onSubmit={this.onSaveEmailChange}>
                  <label className="label-style control-label">Old Email</label>
                  <input
                    onChange={this.onChangeInput}
                    type="email"
                    name="oldEmail"
                    className="form-control"
                  />
                  <label className="label-style control-label">New Email</label>
                  <input
                    onChange={this.onChangeInput}
                    type="email"
                    name="newEmail"
                    className="form-control"
                  />
                  <p>{this.state.emailChangeMessage}</p>
                  <button type="submit" onClick={this.onSaveEmailChange}>
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={this.handleChangeEmailClick.bind(this)}
                  >
                    Cancel
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="setting-menu-item">
            <div className="row">
              <div className="col-sm-3">Change Password</div>
              {!this.state.isChangingPassword && (
                <div className="col-sm-9">
                  <button onClick={this.handleChangePasswordClick.bind(this)}>
                    Edit
                  </button>
                </div>
              )}
              <div
                className={`col-sm-9 accordion ${this.state
                  .isChangingPassword && "open"}`}
              >
                <form onSubmit={this.onSavePasswordChange}>
                  <label className="label-style control-label">
                    New Password
                  </label>
                  <input
                    onChange={this.onChangeInput}
                    type="password"
                    name="newPassword"
                    className="form-control"
                  />
                  <label className="label-style control-label">
                    Confirm New Password
                  </label>
                  <input
                    onChange={this.onChangeInput}
                    type="password"
                    name="newPasswordConfirm"
                    className="form-control"
                  />
                  <p>{this.state.passwordChangeMessage}</p>
                  <button type="submit" onClick={this.onSavePasswordChange}>
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={this.handleChangePasswordClick.bind(this)}
                  >
                    Cancel
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderPayment = () => {
    return (
      <div className="settings-container xem">
        <div className="setting-head">Payment Settings</div>
        <div className="setting-menu">
          <div className="setting-menu-item">
            <div className="row">
              <div className="col-sm-3">Add Bank Accounts</div>
              <div className="col-sm-9">
                You can add multiple bank by clicking add bank account.
              </div>
            </div>
          </div>
          <div className="setting-menu-item">
            <div className="row">
              <div className="col-sm-3">Payment Method</div>
              <div className="col-sm-9">
                You can select which primary bank account will be used when
                paying staff.
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderAccount = () => {
    return (
      <div className="settings-container xxem">
        <div className="setting-head">Account Settings</div>
        <div className="setting-menu">
          <div className="setting-menu-item">
            <span onClick={this.handleDeleteAccount}>Delete Account</span>
          </div>
          <div className="row">
            <div
              className={`col-sm-12 accordion ${this.state.isDeletingAccount &&
                "open"}`}
            >
              <form onSubmit={this.onDeleteAccount}>
                <label className="label-style control-label">Password</label>
                <input
                  onChange={this.onChangeInput}
                  type="password"
                  name="passwordVerification"
                  className="form-control"
                />
                <p>{this.state.deleteAccountMessage}</p>
              </form>
            </div>
            {/* <div className="col-sm-12">
              Delete your account will disable your profile and remove your
              listed events and hired staff
            </div> */}
          </div>
        </div>
      </div>
    )
  }

  renderPrivacyTaC = () => {
    return (
      <div className="settings-footer">
        <p>Privacy Policy | Terms and Agreement</p>
        <p>Attender @ {new Date().getFullYear()}</p>
      </div>
    )
  }

  renderEventTypes = () => {
    return (
      <div className="a-icon-container-sm xxm scroll h-scroll">
        {Object.keys(this.state.eventTypes).map((key, index) => {
          if (this.state.eventTypes[key].on) {
            return (
              <div
                className="vs-service-item-active"
                key={index}
                onClick={() => this.onSelectOption(key, "eventTypes")}
              >
                <a className="vs-service-action">
                  <img
                    alt={this.state.eventTypes[key].name}
                    src={require(`.././assets/icons/organiser/event-type/white/${
                      this.state.eventTypes[key].image
                    }`)}
                  />
                </a>
                <p className="xxm">{this.state.eventTypes[key].name}</p>
              </div>
            )
          } else {
            return (
              <div
                className="vs-service-item"
                key={index}
                onClick={() => this.onSelectOption(key, "eventTypes")}
              >
                <a className="vs-service-action">
                  <img
                    alt={this.state.eventTypes[key].name}
                    src={require(`.././assets/icons/organiser/event-type/default/${
                      this.state.eventTypes[key].image
                    }`)}
                  />
                </a>
                <p className="xxm">{this.state.eventTypes[key].name}</p>
              </div>
            )
          }
        })}
      </div>
    )
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

  onRemovePhoto = event => {
    this.setState({
      avatar: defaultAvatar,
      zoom: 1
    })
  }

  onImageZoomChange = scale => {
    this.setState({ zoom: scale })
  }

  changeCompanyOption = option => {
    let eventEditProfileForm = Object.assign(
      {},
      this.state.eventEditProfileForm
    )
    eventEditProfileForm.company = option
    this.setState({ eventEditProfileForm })
  }

  setEditorRef = editor => (this.editor = editor)

  renderEditProfile = () => {
    return (
      <div className="settings-container">
        <div className="setting-head">General Settings</div>
        <div className="setting-menu">
          <div className="setting-menu-item">
            <div className="row">
              <div className="col-sm-3">Edit Profile</div>
              <div className="col-sm-9">
                <div className="form-group">
                  <p>Picture</p>
                  <div>
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
                        <a
                          href="javascript:void(0)"
                          onClick={this.onRemovePhoto}
                        >
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
                  </div>
                </div>
                <div className="form-group">
                  <p>Organizer Name</p>
                  <input
                    onChange={this.onChangeEventEditProfileForm}
                    type="text"
                    name="organizerName"
                    className="a-input"
                  />
                </div>
                <div className="form-group">
                  <p>Company</p>
                  <button
                    onClick={() => this.changeCompanyOption("yes")}
                    className={
                      this.state.eventEditProfileForm.company === "yes"
                        ? "a-btn btn-active"
                        : "a-btn"
                    }
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => this.changeCompanyOption("no")}
                    className={
                      this.state.eventEditProfileForm.company === "no"
                        ? "a-btn btn-active"
                        : "a-btn"
                    }
                  >
                    No
                  </button>
                </div>
                <div
                  className={`form-group accordion ${this.state
                    .eventEditProfileForm.company === "yes" && "open"}`}
                >
                  <p>Company Name</p>
                  <input
                    onChange={this.onChangeEventEditProfileForm}
                    type="text"
                    name="companyName"
                    className="a-input"
                  />
                </div>
                <div className="form-group">
                  <p>Location</p>
                  <input
                    onChange={this.onChangeEventEditProfileForm}
                    type="text"
                    name="location"
                    className="a-input"
                  />
                </div>
                <div className="form-group">
                  <p>About</p>
                  <textarea
                    rows="5"
                    cols="50"
                    className="a-input"
                    onChange={this.onChangeEventEditProfileForm}
                  >
                    {" "}
                  </textarea>
                </div>
                {this.renderEventTypes()}
                <button
                  type="submit"
                  className="pull-right a-btn btn-round btn-dark"
                  onClick={() => this.onSaveEditProfile()}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div>
        <NavBar />
        <div className="container xem">
          <p className="settings-title">SETTINGS</p>
          <VenueSetup />
          {this.renderGeneral()}
          {this.renderPayment()}
          {this.renderAccount()}
          {this.renderPrivacyTaC()}
          {this.renderEditProfile()}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
