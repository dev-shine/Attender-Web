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
      tasks: [],
      suggestions: [],
      myStaffs: [],
      currentTab: "active"
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

        Object.keys(res.staffs).forEach(staff => {
          res.staffs[staff].forEach(as => {
            if (
              allStaff.length === 0 ||
              !allStaff.find(asf => asf.staff._id === as.staff._id)
            ) {
              allStaff.push(as)
            }
          })
        })
        this.setState({
          myStaffs: allStaff,
          renderStaffsLoading: false
        })
      }
    })
  }
  renderItem = item => {
    console.log(item)
    return (
      <div key={item} className="my-staff-ss-item">
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
  renderStaffBox = (data, col, active) => {
    console.log("renderStaffBox")
    if (data.trial) {
      col += " trial"
    } else if (data.active) {
      col += " active"
    }
    const avatar =
      data.staff.avatar !== "undefined"
        ? data.staff.avatar
        : "http://via.placeholder.com/150x150"
    console.log(avatar)
    return (
      <div key={data._id} className={"my-staff " + col}>
        <img alt="" className="profile-thumb-md my-staff-img" src={avatar} />
        <p>{data.staff.fullname}</p>
        <small>{data.staff.rateType}</small>
        <small>{data.staff.rateBadge}</small>
        <button className="a-btn btn-dark btn-round">
          <small>Send Message</small>
        </button>
        <a>Add monthly review</a>
      </div>
    )
  }
  switchTab = tabname => {
    this.setState({ currentTab: tabname })
  }
  renderNoData = (trialC, activeC) => {
    if (
      (this.state.currentTab === "trial" && trialC == 0) ||
      (this.state.currentTab === "trial" && trialC == 0)
    ) {
      return "Sorry no data here."
    }
  }
  renderMyStaffs = () => {
    let activeC = 0,
      trialC = 0,
      noDataMessage = ""

    return (
      <div className="card my-staff-container">
        <div className="my-staff-header">
          <div className="my-staff-menu">
            <div
              className={
                "my-staff-header-menu" +
                (this.state.currentTab === "active" ? "-active" : "")
              }
              onClick={() => this.switchTab("active")}
            >
              <span>ACTIVE STAFF</span>
            </div>
            <div
              className={
                "my-staff-header-menu" +
                (this.state.currentTab === "trial" ? "-active" : "")
              }
              onClick={() => this.switchTab("trial")}
            >
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
            {this.state.myStaffs.map(staff => {
              if (this.state.currentTab === "trial" && staff.trial) {
                trialC++
                return this.renderStaffBox(staff, "col-sm-2", false)
              } else if (this.state.currentTab === "active" && staff.active) {
                activeC++
                return this.renderStaffBox(staff, "col-sm-2", true)
              }
            })}
            {this.renderNoData(trialC, activeC)}
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
                {/*this.state.active.map(active => {
                  return this.renderStaffBox(true, "col-sm-3", active)
                })*/}
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
