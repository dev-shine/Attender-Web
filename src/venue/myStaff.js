import React, { Component } from "react"
import NavBar from "../layouts/NavBar"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import API from "./../services/api"

class MyStaff extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      active: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      trial: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      tasks: [9, 6, 4, 7, 3, 6],
      suggestions: [1, 2, 3, 4],
      myStaffs: [],
      activeStaffs: [],
      trialStaffs: []
    }
  }
  componentWillMount = async () => {
    API.initRequest()
    let profile = await API.getProfile()
    if (profile.isVenue || profile.isEmployer) {
      this.getMyStaffs()
    }
  }
  getMyStaffs = () => {
    API.get("my-staffs?withTrial=true").then(res => {
      if (res.status) {
        const allStaff = []
        const activeStaff = []
        const trialStaff = []

        Object.keys(res.staffs).forEach(staff => {
          res.staffs[staff].forEach(as => {
            if (
              allStaff.length === 0 ||
              !allStaff.find(asf => asf.staff._id === as.staff._id)
            ) {
              allStaff.push(as)
              console.log(
                as,
                as.active,
                !activeStaff.find(asf => asf.staff._id === as.staff._id)
              )
              if (
                !activeStaff.find(asf => asf.staff._id === as.staff._id) &&
                as.active
              ) {
                activeStaff.push(as)
              }
              if (
                !trialStaff.find(asf => asf.staff._id === as.staff._id) &&
                as.trial
              ) {
                trialStaff.push(as)
              }
            }
          })
        })
        this.setState({
          myStaffs: allStaff,
          renderStaffsLoading: false
        })
        this.setState({
          activeStaffs: activeStaff,
          renderStaffsLoading: false
        })
        this.setState({
          trialStaffs: trialStaff,
          renderStaffsLoading: false
        })
      }
    })
  }
  renderItem = item => {
    return (
      <div className="my-staff-ss-item">
        <div className="my-staff-ss-check">
          <img alt="" src={require(".././assets/icons/venue/check-item.png")} />
        </div>
        <div className="my-staff-ss-desc">
          <p>
            Prepare {item} exotic cocktails and serve the to {item} customers
          </p>
        </div>
        <a className="a-btn-circle">—</a>
      </div>
    )
  }
  renderStaffBox = (closable, col, active) => {
    return (
      <div className={"my-staff " + col}>
        <img
          alt=""
          className="profile-thumb-md my-staff-img"
          src="http://via.placeholder.com/150x150"
        />
        <p>Staff {active}</p>
        <small>Part Time</small>
        <small>$20 - $23 /hour</small>
        <button className="a-btn btn-dark btn-round">
          <small>Send Message</small>
        </button>
        <a>Add monthly review</a>
      </div>
    )
  }

  renderMyStaffs = () => {
    return (
      <div className="card my-staff-container">
        <div className="my-staff-header">
          <div className="my-staff-menu">
            <div className="my-staff-header-menu-active">
              <span>ACTIVE STAFF</span>
            </div>
            <div className="my-staff-header-menu">
              <span>TRIAL PERIOD</span>
            </div>
          </div>
          <input
            type="text"
            className="a-plain-text"
            placeholder="Enter event name"
          />
        </div>
        <div className="my-staff-list v-scroll scroll">
          <div className="row">
            {this.state.active.map(active => {
              return this.renderStaffBox(false, "col-sm-2", active)
            })}
          </div>
        </div>
      </div>
    )
  }

  renderEventAssignment = () => {
    return (
      <div className="card my-staff-container">
        <div className="row">
          <div className="my-staff-event-search col-sm-5">
            <p>ADD STAFF TO YOUR EVENT</p>
            <input
              type="text"
              className="a-plain-text"
              placeholder="Enter name to find staff"
            />
            <div className="sem">
              <p>Event</p>
              <div className="a-gradient my-staff-event-box">
                <div className="row">
                  <div className="col-sm-4">
                    <img
                      alt=""
                      src="http://www.venue360.co.uk/assets/3314/0061/9043/riverside-ltfc2.jpg"
                    />
                  </div>
                  <div className="col-sm-8">
                    <p>The Winery Party</p>
                    <p>
                      <small>Cafe / Restaurant</small>
                    </p>
                    <p>
                      <small>Opening: M-F (10AM-11PM)</small>
                    </p>
                    <p>
                      <small>S-SU (12PM-10PM)</small>
                    </p>
                    <p>
                      <i className="fa fa-map-marker" />&nbsp;&nbsp;<small>
                        Surry Hills, CBD Sydney
                      </small>
                    </p>
                    <a>&times;</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="my-staff-event-staffs col-sm-7">
            <div className="my-staff-event-staffs-header">
              <p>ADD STAFF TO THIS EVENT</p>
              <input
                type="text"
                className="a-plain-text"
                placeholder="Enter name to find staff"
              />
            </div>
            <div className="my-staff-list v-scroll scroll">
              <div className="row">
                {this.state.active.map(active => {
                  return this.renderStaffBox(true, "col-sm-3", active)
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderStaffManagement = () => {
    return (
      <div className="card my-staff-container">
        <div className="row">
          <div className="my-staff-event-search col-sm-5">
            <p>ASSIGN TASK TO STAFF</p>
            <input
              type="text"
              className="a-plain-text"
              placeholder="Enter name to find staff"
            />
            <div className="sem">
              <p>Selected Staff</p>
              <div className="a-gradient my-staff-staff-box">
                <div className="row">
                  <div className="col-sm-4">
                    <img
                      alt=""
                      className="profile-thumb-md"
                      src="http://www.venue360.co.uk/assets/3314/0061/9043/riverside-ltfc2.jpg"
                    />
                  </div>
                  <div className="col-sm-8">
                    <p>Vhong Navarow</p>
                    <p>
                      <small>Bartender | Fulltime</small>
                    </p>
                    <p>
                      <small>RSA | Mixology / Night Owl / Coffee</small>
                    </p>
                  </div>
                </div>
                <a>&times;</a>
              </div>
            </div>
          </div>
          <div className="my-staff-ts col-sm-7">
            <div className="row">
              <div className="col-sm-6">
                <p>TODAY'S TASK</p>
                <span className="pull-right">
                  Add Task&nbsp;&nbsp;&nbsp;<a className="a-btn-circle">+</a>
                </span>
              </div>
              <div className="col-sm-6">
                <p>SUGGESTION</p>
                <span className="pull-right">
                  Add Suggestion&nbsp;&nbsp;&nbsp;<a className="a-btn-circle">
                    +
                  </a>
                </span>
              </div>
            </div>
            <div className="my-staff-ss v-scroll scroll">
              <div className="row">
                <div className="my-staff-ss-task col-sm-6">
                  {this.state.tasks.map(task => {
                    return this.renderItem(task)
                  })}
                </div>
                <div className="my-staff-ss-sugg col-sm-6">
                  {this.state.suggestions.map(suggestion => {
                    return this.renderItem(suggestion)
                  })}
                </div>
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
        <div className="container lem">
          {this.renderMyStaffs()}
          {this.renderEventAssignment()}
          {this.renderStaffManagement()}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(MyStaff)
