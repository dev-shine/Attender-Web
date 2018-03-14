import React, { Component } from "react"
import NavBar from "../layouts/NavBar"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import API from "../services/api"

const staffs = {
  bartender: { on: false, num: 0 },
  manager: { on: false, num: 0 },
  waiter: { on: false, num: 0 },
  chef: { on: false, num: 0 },
  barback: { on: false, num: 0 },
  kitchen: { on: false, num: 0 },
  host: { on: false, num: 0 }
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

class FindStaff extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      staffs,
      frequency,
      positionButtons: ["All"]
    }
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

  onSelectOption = (key, obj) => {
    let _obj = this.state[obj]
    if (obj === "staffs") {
      _obj[key].on = !_obj[key].on
    } else {
      _obj[key] = !_obj[key]
    }
    this.setState(prevState => ({ [obj]: _obj }))
  }

  onChangeFrequency = index => {
    let frequency = this.state.frequency
    frequency[index].on = !frequency[index].on
    this.setState(prevState => ({ frequency }))
  }
  searchStaff = async () => {
    var positionQuery = ""
    for (var _key in staffs) {
      if (staffs[_key].on) {
        var positionButtons = this.state.positionButtons.slice()
        positionButtons.push(_key)
        this.setState({ positionButtons: positionButtons })
      }
    }
    positionQuery = this.state.positionButtons.join(", ")
    const url = `staffs`
    var response = await API.get(url + "?positions=" + positionQuery)
    for (var _key in this.state.positionButtons) {
      if (_key in staffs) {
        this.state.staffs[this.state.positionButtons[_key]].data =
          response.staffs
        this.forceUpdate()
      }
    }
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
                      3 bartenders, 5 Waiter/Waitress
                    </span>
                  </p>
                  <div className="xxm">
                    <span>Filtered by:&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <button className="a-btn btn-round btn-dark xs">
                      Position
                    </button>
                    <button className="a-btn btn-round btn-passive xs">
                      Price/h
                    </button>
                    <button className="a-btn btn-round btn-passive">
                      Availability
                    </button>
                    <button className="a-btn btn-round btn-passive">
                      Last Active
                    </button>
                  </div>
                  <div className="xdm mini-container">
                    <button key="All" className="a-btn btn-round btn-passive">
                      All
                    </button>
                    {Object.keys(this.state.staffs).map((key, index) => {
                      if (this.state.staffs[key].on) {
                        return (
                          <button
                            key={key}
                            className="a-btn btn-round btn-passive"
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
                  {Object.keys(this.state.staffs).map((staff, index) => {
                    return (
                      <div key={index} className="fs-staff-box">
                        <div className="fs-staff-img ">
                          <img
                            className="profile-thumb-md"
                            src="http://www.technodoze.com/wp-content/uploads/2016/03/default-placeholder.png"
                          />
                        </div>
                        <div className="fs-staff-info">
                          <p>Derrick Soto </p>
                          <small>Bartender|Partime</small>
                          <p>
                            <small>
                              <strong>RSA</strong> | Mixology/Night Owl/Cofee
                            </small>
                          </p>
                        </div>
                        <span className="pull-right">$20 - $25/H</span>
                        <div className="fs-staff-skills">
                          <p>
                            <small className="pull-left">
                              Skills: &nbsp;&nbsp;
                            </small>
                            <span className="btn-skills pull-left" />
                            <span className="btn-skills pull-left" />
                            <span className="btn-skills pull-left" />
                            <span className="btn-exp pull-right">
                              Experience
                            </span>
                          </p>
                        </div>
                      </div>
                    )
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
        {this.renderContent()}
      </div>
    )
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(FindStaff)
