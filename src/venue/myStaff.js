import React, { Component } from "react"
import NavBar from "../layouts/NavBar"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import API from "./../services/api"
import "./myStaff.css"
import NewTaskField from "./NewTaskField"
import NewSuggestionField from "./NewSuggestionField"
import PropTypes from "prop-types"
import moment from "moment"

import { Link } from "react-router-dom"

import StaffTimePicker from "./staffTimePicker"

import SchedulePopOver from "./SchedulePopOver"
// import PaymentModal from "./PaymentModal"

class MyStaff extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      suggestions: [],
      myStaffs: [],
      currentTab: "active",
      showNewTaskField: false,
      showNewSuggestionField: false,
      selectedStaff: [],
      staffMetas: {},
      isPaymentModalOpen: false,
      selectedPaymentStaff: {},
      timesheet: {
        days: [],
        banksArray: [],
        isLoadingPayment: false
      },
      next: false,
      prev: false,
      additionalHours: 0,
      startRate: 0,
      isShowConfirmation: false,
      isShowEditButton: false,
      isShowEditPayableHours: true,
      isShowEditRate: true,
      accName: "",
      accNumber: ""
    }
    this.saveTask = this.saveTask.bind(this)
    this.saveSuggestion = this.saveSuggestion.bind(this)
    this.setSchedules = this.setSchedules.bind(this)
  }
  componentWillMount = async () => {
    API.initRequest()
    let profile = await API.getProfile()
    if (profile.isVenue || profile.isEmployer) {
      this.getMyStaffs()
    }
  }

  setSchedules(sched, staffid) {
    let staffMetas = this.state.staffMetas
    staffMetas[`staff-${staffid}`].schedules = sched
    this.setState({ staffMetas })
    var staffSchedule = {
      schedules: JSON.stringify(sched)
    }
    API.post("save-staff-sched/" + staffid, staffSchedule).then(res => {
      console.log(res)
    })
  }
  selectStaff = () => {
    let myStaffs = this.state.myStaffs
    myStaffs[0].selected = true
    this.setState({ myStaffs: myStaffs })
    this.setState({ selectedStaff: myStaffs[0] })
  }

  getAllBanks = () => {
    API.get("banks").then(res => {
      console.log(res)
      if (res.status) {
        this.setState({
          banksArray: res.banks
        })
      } else {
        alert("Something went wrong")
      }
    })
  }

  getMyStaffs = () => {
    API.get("my-staffs?withTrial=true").then(res => {
      if (res.status) {
        const allStaff = []
        let staffMetas = {}
        Object.keys(res.staffs).forEach(position => {
          res.staffs[position].forEach(as => {
            if (
              allStaff.length === 0 ||
              !allStaff.find(asf => asf.staff._id === as.staff._id)
            ) {
              allStaff.push(as)
              staffMetas[`staff-${as._id}`] = as
            }
          })
        })
        this.setState({
          myStaffs: allStaff,
          renderStaffsLoading: false,
          staffMetas: staffMetas
        })
        // this.selectStaff()
      }
    })
  }
  renderTasks = tasks => {
    return tasks.reverse().map(task => {
      return this.renderItem(task)
    })
  }
  renderItem = task => {
    return (
      <div key={task._id} className="my-staff-ss-item">
        <div className="my-staff-ss-check">
          <img alt="" src={require(".././assets/icons/venue/check-item.png")} />
        </div>
        <div className="my-staff-ss-desc">
          <p>{task.description}</p>
        </div>
        <a className="a-btn-circle">—</a>
      </div>
    )
  }
  toggleSchedulePopOver(key) {
    const staffMetas = this.state.staffMetas
    staffMetas[`staff-${key}`].showSchedulePopOver =
      typeof staffMetas[`staff-${key}`].showSchedulePopOver !== "undefined"
        ? !staffMetas[`staff-${key}`].showSchedulePopOver
        : true
    this.setState({ staffMetas })
  }

  togglePaymentModal = staff => {
    this.setState(
      {
        selectedPaymentStaff: staff,
        isPaymentModalOpen: !this.state.isPaymentModalOpen
      },
      () => {
        this.getStaffTimeSheet()
        this.getAllBanks()
      }
    )
  }

  onPressPayStaff = () => {
    alert("I am pressing pay staff")
    if (this.state.timesheet.status == "paid") {
      alert("Staff already paid for this week")
    } else {
      if (this.state.banksArray.length > 0) {
        this.setState({
          accName: this.state.banksArray[0].bankMeta.account_name,
          accNumber: this.state.banksArray[0].bankMeta.account_number
        })
      }
      this.setState({ isShowConfirmation: true })
    }
  }

  onPayStaff = () => {
    // this.setState({isLoadingPayment: true});

    if (this.state.banksArray.length > 0) {
      // console.log(this.state.timesheet)
      const totalPayableHours =
        this.getTotalPayableHours() + this.state.additionalHours * 1
      var totalAmount = totalPayableHours * this.state.startRate

      var promiseId = this.state.banksArray[0].promiseId

      // console.log("total amount", totalAmount)

      API.post(`timesheet/${this.state.timesheet._id}/make_payment`, {
        amount: totalAmount,
        account_id: promiseId
      }).then(res => {
        if (res.status) {
          alert("Payment Transferred.")
          // this.setState({isLoadingPayment: false});
          // this.props.navigation.goBack();
        } else {
          alert(`There is no total amount to be paid.`)
          // this.setState({isLoadingPayment: false});
        }
        console.log("Pay staff", res)
      })
    } else {
      alert("Please add atleast (1) bank account")
      // this.setState({isLoadingPayment: false});
    }
  }

  getStaffTimeSheet = () => {
    API.get(
      `management/${this.state.selectedPaymentStaff._id}/timesheet/current`
    ).then(res => {
      console.log("result ts", res)
      if (res.status) {
        this.setState({
          startRate: this.state.selectedPaymentStaff.staff.startRate,
          timesheet: res.timesheet,
          next: res.actions.next,
          prev: res.actions.previous
        })
        // this.timeSheetToState(res.timesheet)
      }
    })
  }

  renderStaffBox(data, index, col, active) {
    if (data.trial) {
      col += " trial"
    } else if (data.active) {
      col += " active"
    }
    const avatar =
      data.staff.avatar !== "undefined"
        ? data.staff.avatar
        : "http://via.placeholder.com/150x150"
    return (
      <div key={data._id} className={"my-staff " + col}>
        <span
          className="icon-calendar"
          onClick={() => {
            this.toggleSchedulePopOver(data._id)
          }}
        />
        <span className="icon-breafcase" />
        <span
          className="icon-time"
          onClick={this.togglePaymentModal.bind(this, data)}
        />
        {data.showSchedulePopOver ? (
          <SchedulePopOver
            staffid={data._id}
            setSchedules={this.setSchedules}
            schedules={data.schedules}
          />
        ) : null}
        <img alt="" className="profile-thumb-md my-staff-img" src={avatar} />
        <p>{data.staff.fullname}</p>
        <small>{data.staff.rateType}</small>
        <small>{data.staff.rateBadge}</small>
        <Link to={`./messages/${data.staff._id}`}>
          <button className="a-btn btn-dark btn-round">
            <small>Send Message</small>
          </button>
        </Link>
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
            {Object.keys(this.state.myStaffs).map(index => {
              if (
                this.state.currentTab === "trial" &&
                this.state.myStaffs[index].trial
              ) {
                trialC++

                return this.renderStaffBox(
                  this.state.myStaffs[index],
                  index,
                  "col-sm-2",
                  false
                )
              } else if (
                this.state.currentTab === "active" &&
                this.state.myStaffs[index].active
              ) {
                activeC++
                return this.renderStaffBox(
                  this.state.myStaffs[index],
                  index,
                  "col-sm-2",
                  true
                )
              }
            })}
            {this.renderNoData(trialC, activeC)}
          </div>
        </div>
      </div>
    )
  }
  renderSelectedStaffBox = staff => {
    return (
      <div key={staff._id} className="a-gradient my-staff-staff-box">
        <div className="row">
          <div className="col-sm-4">
            <img alt="" className="profile-thumb-md" src={staff.staff.avatar} />
          </div>
          <div className="col-sm-8">
            <p>{staff.staff.fullname}</p>
            <p>
              <small>
                {staff.staff.position} | {staff.staff.rateType}
              </small>
            </p>
            <p>
              <small>
                {staff.staff.bio} | {staff.staff.description.join("/")}
              </small>
            </p>
          </div>
        </div>
        <a>&times;</a>
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
  saveTask = async newTask => {
    this.setState({ isLoading: true })
    let task = this.state.selectedStaff.assignments.tasks
    task.push(newTask)
    var $assignments = {
      assignments: JSON.stringify({
        tasks: task,
        suggestions: this.state.selectedStaff.assignments.suggestions
      })
    }
    API.post(
      "save-staff-assignment/" + this.state.selectedStaff._id,
      $assignments
    ).then(res => {
      console.log(res)
    })
    this.setState({ isLoading: false })
  }
  saveSuggestion = async newSuggestion => {
    this.setState({ isLoading: true })
    let suggestion = this.state.selectedStaff.assignments.suggestions
    suggestion.push(newSuggestion)
    var $assignments = {
      assignments: JSON.stringify({
        tasks: this.state.selectedStaff.assignments.tasks,
        suggestions: suggestion
      })
    }
    API.post(
      "save-staff-assignment/" + this.state.selectedStaff._id,
      $assignments
    ).then(res => {
      console.log(res)
    })
    this.setState({ isLoading: false })
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
              {this.state.myStaffs.map(staff => {
                if (staff.selected) return this.renderSelectedStaffBox(staff)
              })}
            </div>
          </div>
          <div className="my-staff-ts col-sm-7">
            <div className="row">
              <div className="col-sm-6">
                <p>TODAY'S TASK</p>
                <span
                  className="pull-right"
                  onClick={() => this.setState({ showNewTaskField: true })}
                >
                  Add Task&nbsp;&nbsp;&nbsp;<a className="a-btn-circle">+</a>
                </span>
              </div>
              <div className="col-sm-6">
                <p>SUGGESTION</p>
                <span
                  className="pull-right"
                  onClick={() =>
                    this.setState({ showNewSuggestionField: true })
                  }
                >
                  Add Suggestion&nbsp;&nbsp;&nbsp;<a className="a-btn-circle">
                    +
                  </a>
                </span>
              </div>
            </div>
            <div className="my-staff-ss v-scroll scroll">
              <div className="row">
                <div className="my-staff-ss-task col-sm-6">
                  {this.state.showNewTaskField ? (
                    <NewTaskField save={this.saveTask} />
                  ) : null}
                  {this.state.myStaffs.map(staff => {
                    if (staff.active && staff.assignments.tasks !== null) {
                      return this.renderTasks(staff.assignments.tasks)
                    }
                  })}
                </div>
                <div className="my-staff-ss-sugg col-sm-6">
                  {this.state.showNewSuggestionField ? (
                    <NewSuggestionField save={this.saveSuggestion} />
                  ) : null}
                  {this.state.myStaffs.map(staff => {
                    if (
                      staff.active &&
                      staff.assignments.suggestions !== null
                    ) {
                      return this.renderTasks(staff.assignments.suggestions)
                    }
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  timeFormatter = time => {
    if (time != "") {
      return moment(time).format("hh A")
    } else {
      return time
    }
  }

  getNextOrPreviousTimeSheet = id => {
    API.get(`timesheet/${id}`).then(res => {
      console.log("timesheet", res)
      if (res.status) {
        this.setState({
          timesheet: res.timesheet,
          next: res.actions.next,
          prev: res.actions.previous,
          isLoadingPayment: false
        })
      }
    })
  }

  getPayableHours(startTime, endTime) {
    let start = moment(startTime, ["hh:mm A", "hh A"])
    let end = moment(endTime, ["hh:mm A", "hh A"])
    let payableHours =
      start.isValid() && end.isValid()
        ? moment.duration(end.diff(start)).asHours()
        : 0
    payableHours = payableHours < 0 ? payableHours + 24 : payableHours
    return payableHours
  }

  getTotalPayableHours() {
    let totalPayableHours = 0
    if (this.state.timesheet.days.length > 0) {
      this.state.timesheet.days.map(res => {
        switch (res.isoWeekPeriod) {
          case "1":
            {
              res.schedules.map((schedule, id) => {
                let startTime = schedule.startTime
                let endTime = schedule.endTime
                if (this.state["monstartTime" + (id + 1)])
                  startTime = this.state["monstartTime" + (id + 1)]
                if (this.state["monendTime" + (id + 1)])
                  endTime = this.state["monendTime" + (id + 1)]
                let payableHours = this.getPayableHours(startTime, endTime)
                totalPayableHours += payableHours
              })
            }
            break
          case "2":
            {
              res.schedules.map((schedule, id) => {
                let startTime = schedule.startTime
                let endTime = schedule.endTime
                if (this.state["tuestartTime" + (id + 1)])
                  startTime = this.state["tuestartTime" + (id + 1)]
                if (this.state["tueendTime" + (id + 1)])
                  endTime = this.state["tueendTime" + (id + 1)]
                let payableHours = this.getPayableHours(startTime, endTime)
                totalPayableHours += payableHours
              })
            }
            break
          case "3":
            {
              res.schedules.map((schedule, id) => {
                let startTime = schedule.startTime
                let endTime = schedule.endTime
                if (this.state["wedstartTime" + (id + 1)])
                  startTime = this.state["wedstartTime" + (id + 1)]
                if (this.state["wedendTime" + (id + 1)])
                  endTime = this.state["wedendTime" + (id + 1)]
                let payableHours = this.getPayableHours(startTime, endTime)
                totalPayableHours += payableHours
              })
            }
            break
          case "4":
            {
              res.schedules.map((schedule, id) => {
                let startTime = schedule.startTime
                let endTime = schedule.endTime
                if (this.state["thustartTime" + (id + 1)])
                  startTime = this.state["thustartTime" + (id + 1)]
                if (this.state["thuendTime" + (id + 1)])
                  endTime = this.state["thuendTime" + (id + 1)]
                let payableHours = this.getPayableHours(startTime, endTime)
                totalPayableHours += payableHours
              })
            }
            break
          case "5":
            {
              res.schedules.map((schedule, id) => {
                let startTime = schedule.startTime
                let endTime = schedule.endTime
                if (this.state["fristartTime" + (id + 1)])
                  startTime = this.state["fristartTime" + (id + 1)]
                if (this.state["friendTime" + (id + 1)])
                  endTime = this.state["friendTime" + (id + 1)]
                let payableHours = this.getPayableHours(startTime, endTime)
                totalPayableHours += payableHours
              })
            }
            break
          case "6":
            {
              res.schedules.map((schedule, id) => {
                let startTime = schedule.startTime
                let endTime = schedule.endTime
                if (this.state["satstartTime" + (id + 1)])
                  startTime = this.state["satstartTime" + (id + 1)]
                if (this.state["satendTime" + (id + 1)])
                  endTime = this.state["satendTime" + (id + 1)]
                let payableHours = this.getPayableHours(startTime, endTime)
                totalPayableHours += payableHours
              })
            }
            break
          case "7":
            {
              res.schedules.map((schedule, id) => {
                let startTime = schedule.startTime
                let endTime = schedule.endTime
                if (this.state["sunstartTime" + (id + 1)])
                  startTime = this.state["sunstartTime" + (id + 1)]
                if (this.state["sunendTime" + (id + 1)])
                  endTime = this.state["sunendTime" + (id + 1)]
                let payableHours = this.getPayableHours(startTime, endTime)
                totalPayableHours += payableHours
              })
            }
            break
          default:
        }
      })
    }
    return totalPayableHours
  }

  editWorkingHours = () => {
    this.setState({ isShowEditButton: !this.state.isShowEditButton })
  }

  onSelectTime = (periodIndex, weekdayIndex, variant, time) => {
    // Updating the timesheet
    const timesheet = this.state.timesheet
    timesheet.days[weekdayIndex].schedules[periodIndex][variant] = time.format(
      "hh:mm A"
    )
    this.setState({ timesheet })
  }

  onSaveBreakTime = (periodIndex, weekdayIndex, breakTime) => {
    // Update the breaktime
    const timesheet = this.state.timesheet
    timesheet.days[weekdayIndex].schedules[periodIndex].break =
      breakTime.target.value
    this.setState({ timesheet })
  }

  renderTimeSheet = () => {
    return (
      <div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          ANDREW O. TIME SHEET July 24 - 30 2017
        </div>
        <div onClick={this.editWorkingHours}>
          Edit Working Hours <i class="fa fa-edit" />
        </div>
        <div>
          {this.state.next && (
            <button
              onClick={this.getNextOrPreviousTimeSheet.bind(
                this,
                this.state.next
              )}
            >
              Previous
            </button>
          )}
          {this.state.next && <button>Next</button>}
        </div>
        <div style={{ display: "flex" }}>
          <div style={{ flex: "2" }}>
            <div style={{ display: "flex" }}>
              <div style={{ flex: "1" }}>Date</div>
              <div style={{ flex: "1" }}>Time(AM)</div>
              <div style={{ flex: "1" }}>Time(PM)</div>
              <div style={{ flex: "1" }}>Break hr(s)</div>
              <div style={{ flex: "1" }}>Payable Hours</div>
            </div>
            {this.state.timesheet.days.length > 0 &&
              this.state.timesheet.days.map((res, weekdayIndex) => (
                <div style={{ display: "flex" }}>
                  <div style={{ flex: "1" }}>
                    <div>{moment(res.date).format("ddd")}</div>
                    {moment(res.date).format("MMM DD")}
                  </div>
                  {res.schedules.map(
                    (s, periodIndex) =>
                      !this.state.isShowEditButton ? (
                        <div style={{ flex: "1", display: "flex" }}>
                          {`${s.startTime} - ${s.endTime}`}
                        </div>
                      ) : (
                        <div style={{ flex: "1", display: "flex" }}>
                          <div
                            style={{
                              display: "block",
                              background: "white",
                              border: "solid 1px gray",
                              borderRadius: "5px"
                            }}
                          >
                            <StaffTimePicker
                              selectedTime={moment(s.startTime, [
                                "hh:mm A",
                                "hh A"
                              ])}
                              onSelectTime={this.onSelectTime.bind(
                                this,
                                periodIndex,
                                weekdayIndex,
                                "startTime"
                              )}
                            />
                            to
                            <StaffTimePicker
                              selectedTime={moment(s.endTime, [
                                "hh:mm A",
                                "hh A"
                              ])}
                              onSelectTime={this.onSelectTime.bind(
                                this,
                                periodIndex,
                                weekdayIndex,
                                "endTime"
                              )}
                            />
                          </div>
                        </div>
                      )
                  )}
                  <div style={{ flex: "1" }}>
                    {res.schedules.map(
                      (s, periodIndex) =>
                        !this.state.isShowEditButton ? (
                          <p>{s.break}</p>
                        ) : (
                          <input
                            type="text"
                            className="a-plain-text"
                            placeholder="0"
                            value={s.break}
                            onChange={this.onSaveBreakTime.bind(
                              this,
                              periodIndex,
                              weekdayIndex
                            )}
                          />
                        )
                    )}
                  </div>
                  <div style={{ flex: "1" }}>
                    {res.schedules.map(s => <p>8.5</p>)}
                  </div>
                </div>
              ))}
          </div>
          <div style={{ flex: "1" }}>
            <div>{`Total Payable hours: ${this.getTotalPayableHours()}`}</div>
            <div>
              <button
                onClick={() =>
                  this.setState({
                    isShowEditPayableHours: !this.state.isShowEditPayableHours
                  })
                }
              >
                Add Payable Hours
              </button>
              {this.state.isShowEditPayableHours ? (
                <input
                  type="text"
                  className="a-plain-text"
                  placeholder="0"
                  onChange={hours =>
                    this.setState({ additionalHours: hours.target.value })
                  }
                />
              ) : (
                0
              )}
            </div>
            {this.state.isShowEditRate ? (
              <div>{`Rate Per Hours: $${this.state.startRate}/Hr`}</div>
            ) : (
              <input
                type="text"
                className="a-plain-text"
                placeholder={this.state.startRate}
                onChange={startRate =>
                  this.setState({ startRate: startRate.target.value })
                }
              />
            )}
            <button
              onClick={() =>
                this.setState({ isShowEditRate: !this.state.isShowEditRate })
              }
            >
              Edit Rate
            </button>
            <div>{`Total to be sent: AUD $${(this.getTotalPayableHours() +
              this.state.additionalHours * 1) *
              this.state.startRate}`}</div>
          </div>
        </div>

        <div style={{ width: "100%" }}>
          <button style={{ float: "right" }} onClick={this.onPressPayStaff}>
            Pay Staff
          </button>
        </div>
      </div>
    )
  }

  renderPaymentModal = () => {
    return (
      <div
        className={this.state.isPaymentModalOpen ? "a-modal show" : "a-modal"}
      >
        <div className="a-modal-content">
          <span
            onClick={this.togglePaymentModal.bind(
              this,
              this.state.selectedPaymentStaff
            )}
            className="a-close"
          >
            &times;
          </span>
          {!this.state.isShowConfirmation ? (
            this.renderTimeSheet()
          ) : (
            <button onClick={this.onPayStaff}>confirm</button>
          )}
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
          {this.renderPaymentModal()}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)

MyStaff.contextTypes = {
  router: PropTypes.object
}
export default connect(mapStateToProps, mapDispatchToProps)(MyStaff)
