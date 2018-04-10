import React, { Component } from "react"
import NavBar from "../layouts/NavBar"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import API from "../services/api"
import "./findStaff.css"
import _ from "lodash/core"
import { Link } from "react-router-dom"

const staffs = {
  barista: { on: false, num: 0, data: [] },
  bartender: { on: false, num: 0, data: [] },
  manager: { on: false, num: 0, data: [] },
  waiter: { on: false, num: 0, data: [] },
  chef: { on: false, num: 0, data: [] },
  barback: { on: false, num: 0, data: [] },
  kitchen: { on: false, num: 0, data: [] },
  host: { on: false, num: 0, data: [] }
}

const frequency = [
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

let positionQuery = [{}]

class FindStaff extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      staffs,
      frequency,
      viewOnly: "all",
      lookingforTxt: "",
      sortBtns: [
        { lbl: "Position", selected: true },
        { lbl: "Price/h", selected: false },
        { lbl: "Availability", selected: false },
        { lbl: "Last Active", selected: false }
      ],
      results: []
    }
  }
  componentWillMount = () => {
    console.log(this.props.match.params.staff)
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
    this.updateLookingfor()
  }
  viewOnly = position => {
    this.setState({ viewOnly: position })
  }
  onSelectOption = (key, obj) => {
    let _obj = this.state[obj]
    if (obj === "staffs") {
      _obj[key].on = !_obj[key].on
    } else {
      _obj[key] = !_obj[key]
    }
    this.setState(prevState => ({ [obj]: _obj }))

    let positionQuery = Object.entries(this.state.staffs)
      .filter(staff => staff[1].on)
      .map(function(key, val) {
        return key[0]
      })
    Object.entries(positionQuery).map((key, index) => {
      this.getStaffsByPosition(key[1])
    })
  }

  onChangeFrequency = index => {
    let frequency = this.state.frequency
    frequency[index].on = !frequency[index].on
    this.setState(prevState => ({ frequency }))
  }
  getStaffsByPosition = async index => {
    let staffs = this.state.staffs

    let response = await API.get("staffs?positions=" + index)
    staffs[index].data = response.staffs
    this.setState(prevState => ({ staffs }))
    this.updateLookingfor()
  }
  updateLookingfor = () => {
    let lookingforTxt = ""
    Object.entries(this.state.staffs).map((key, index) => {
      if (key[1].on) {
        lookingforTxt += key[1].num + " " + key[0] + ", "
      }
    })
    lookingforTxt = lookingforTxt.slice(0, -2)
    this.setState({ lookingforTxt: lookingforTxt })
  }
  Capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }
  setSortBy = sortby => {
    let sortBtns = [...this.state.sortBtns],
      res = [].concat(this.state.results)

    Object.values(sortBtns).map((val, key) => {
      sortBtns[key].selected = false
      if (sortBtns[key].lbl == sortby) {
        sortBtns[key].selected = true

        if (sortby == "Position") {
          res.sort((a, b) => {
            if (a.position[0] < b.position[0]) return -1
            if (a.position[0] > b.position[0]) return 1
            return 0
          })
        } else if (sortby == "Price/h") {
          res.sort((a, b) => {
            if (a.startRate < b.startRate) return -1
            if (a.startRate > b.startRate) return 1
            return 0
          })
        } else if (sortby == "Availability") {
          res.sort((a, b) => {
            let atrueCounter = 0
            let ax = Object.values(a.availability).map((key, val) => {
              Object.values(key).map((k, v) => {
                if (k) {
                  atrueCounter++
                }
              })
            })

            let btrueCounter = 0
            let bx = Object.values(b.availability).map((key, val) => {
              Object.values(key).map((k, v) => {
                if (k) {
                  btrueCounter++
                }
              })
            })

            if (atrueCounter < btrueCounter) return -1
            if (atrueCounter > btrueCounter) return 1
            return 0
          })
        } else if (sortby == "Last Active") {
        }
      }
      this.setState({ results: res })
      this.setState({ sortBtns: sortBtns })
    })
  }
  searchStaff = () => {
    let results = []
    Object.values(this.state.staffs).map((val, key) => {
      if (val.on) {
        results = results.concat(val.data)
      }
    })
    this.setState({ results: results })
  }
  toggleShowStaffDetails = (isShow, i) => {
    let results = [...this.state.results]
    if (isShow) {
      results[i].openMeta = true
    } else {
      results[i].openMeta = false
    }
    this.setState({ results: results })
  }
  invokeStaffs = (k, i) => {
    console.log(k)
    return (
      <div key={i} className="fs-staff-box">
        <div className="fs-staff-block clearfix">
          <div className="fs-staff-img ">
            <img className="profile-thumb-md" src={k[1].avatar} />
          </div>
          <div className="fs-staff-data">
            <div className="fs-staff-info">
              <p>{k[1].fullname}</p>
              <small>
                {this.Capitalize(k[1].position.join(", "))} |{" "}
                {this.Capitalize(k[1].rateType)}
              </small>
              <p>
                <small>
                  <strong>{k[1].bio}</strong> | {k[1].position.join("/")}
                </small>
              </p>
            </div>
            <span className="fs-staff-rateBadge">{k[1].rateBadge}</span>
            <div className="fs-staff-skills">
              <p>
                <small className="pull-left">Skills: &nbsp;&nbsp;</small>
                <span className="btn-skills pull-left">
                  <img src={require(".././venue/img/uk-flag.gif")} />
                </span>
                <span className="btn-skills pull-left">
                  <img src={require(".././venue/img/contact-icon.gif")} />
                </span>
                <span className="btn-skills pull-left">
                  <img src={require(".././venue/img/list-icon.gif")} />
                </span>
                {(() => {
                  if (k[1].openMeta) {
                    return (
                      <Link
                        to={`./messages/${k[1].user.staffId}`}
                        className="a-btn btn-round btn-active pull-right"
                      >
                        Message
                      </Link>
                    )
                  } else {
                    return (
                      <button
                        className="btn-exp pull-right"
                        onClick={() => this.toggleShowStaffDetails(true, i)}
                      >
                        Experience
                      </button>
                    )
                  }
                })()}
              </p>
            </div>
          </div>
        </div>
        <br className="clearfix" />
        <div className={"fs-staff-meta" + (k[1].openMeta ? " open" : "")}>
          <p>Age : 25</p>
          <p className="bio">{k[1].bio}</p>
          <button key="Languages" className="a-btn btn-round btn-passive">
            Languages
          </button>
          <button key="License" className="a-btn btn-round btn-passive">
            License
          </button>
          <button key="Certificates" className="a-btn btn-round btn-passive">
            Certificates
          </button>
          <div className="fs-staff-experiences clearfix">
            {Object.keys(k[1].experiences).map((key, index) => {
              return (
                <div key={key} className="fs-staff-experience clearfix">
                  <img src={require(".././venue/img/image-placeholder.jpg")} />
                  <ul>
                    <li>
                      <strong>Bar: </strong>
                      {k[1].experiences[key].companyValue}
                    </li>
                    <li>
                      <strong>Duration: </strong>
                      {k[1].experiences[key].startDuration} years
                    </li>
                    <li>
                      <strong>Position: </strong>
                      {k[1].experiences[key].positionValue}
                    </li>
                  </ul>
                </div>
              )
            })}
          </div>
          <span
            className="fs-arrow-up pull-right"
            onClick={() => this.toggleShowStaffDetails(false, i)}
          />
        </div>
      </div>
    )
  }
  renderContent = () => {
    return (
      <div className="container xem">
        <div className="row">
          <div className="col-sm-5">
            <div className="fs-soi-container">
              <h4>FIND YOUR STAFF</h4>
              <p>
                Select each staff of interest and let us know how many of each
                you require.
              </p>
              <div className="fs-soi-content">
                <h4>STAFF OF INTEREST</h4>
                <div className="a-icon-container-sm xxm scroll h-scroll">
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
                </div>
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
                          <span>{freq.name}</span>
                          <a className="a-checkbox active" />
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
                          <span style={{ fontSize: "12px" }}>{freq.name}</span>
                        </div>
                      )
                    }
                  })}
                </div>
                <div className="fs-soi-action xdm">
                  <button
                    className="a-btn btn-dark btn-round pull-right"
                    onClick={() => this.searchStaff()}
                  >
                    Search
                  </button>
                  <button className="a-btn btn-active btn-round pull-right">
                    Clear All
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-7">
            <div className="fs-feed-container">
              <div className="fs-feed-content">
                <div className="fs-feed-head">
                  <p>
                    We see you're looking for staff, based on selection we've
                    listed the most compatible staff below.
                  </p>
                </div>
                <div className="fs-feed-filter">
                  <p>
                    Looking for:{" "}
                    <span className="light-text">
                      {this.state.lookingforTxt}
                    </span>
                  </p>
                  <div className="xxm">
                    <span>Filtered by:&nbsp;&nbsp;&nbsp;&nbsp;</span>

                    {Object.values(this.state.sortBtns).map((key, index) => {
                      return (
                        <button
                          onClick={() => this.setSortBy(key.lbl)}
                          key={index}
                          className={
                            key.selected
                              ? "a-btn btn-round btn-dark xs"
                              : "a-btn btn-round btn-passive xs"
                          }
                        >
                          {key.lbl}
                        </button>
                      )
                    })}
                  </div>
                  <div className="xdm mini-container">
                    <button
                      key="All"
                      className={
                        this.state.viewOnly == "all"
                          ? "a-btn btn-round btn-dark"
                          : "a-btn btn-round btn-passive"
                      }
                      onClick={() => this.viewOnly("all")}
                    >
                      All
                    </button>
                    {Object.keys(this.state.staffs).map((key, index) => {
                      if (this.state.staffs[key].on) {
                        return (
                          <button
                            key={key}
                            className={
                              this.state.viewOnly == key
                                ? "a-btn btn-round btn-dark"
                                : "a-btn btn-round btn-passive"
                            }
                            onClick={() => this.viewOnly(key)}
                          >
                            {key.replace(/\b[a-z]/g, function(letter) {
                              return letter.toUpperCase()
                            })}
                          </button>
                        )
                      }
                    })}
                  </div>
                </div>
                <div className="xdm fs-feed-list v-scroll scroll">
                  {(() => {
                    if (!_.isEmpty(Object.entries(this.state.results))) {
                      if (this.state.viewOnly !== "all") {
                        return Object.entries(
                          this.state.staffs[this.state.viewOnly].data
                        ).map((k, i) => {
                          return this.invokeStaffs(k, i)
                        })
                      } else {
                        return Object.entries(this.state.results).map(
                          (key, index) => {
                            return this.invokeStaffs(key, index)
                          }
                        )
                      }
                    }
                  })()}
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
        {this.renderContent()}
      </div>
    )
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(FindStaff)
