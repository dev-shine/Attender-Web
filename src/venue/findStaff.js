import React, { Component } from "react"
import NavBar from "../layouts/NavBar"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"

class FindStaff extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      staffs: [1, 2, 3, 4]
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
                <div className="a-icon-container-sm xxm">
                  <div className="a-icon-item-sm">
                    <a className="a-icon-action-sm">
                      <i className="fa fa-glass" aria-hidden="true" />
                    </a>
                    <p className="xxm">Alcohol</p>
                  </div>
                  <div className="a-icon-item-active-sm">
                    <a className="a-icon-action-sm">
                      <i className="fa fa-times-rectangle" aria-hidden="true" />
                    </a>
                    <p className="xxm">Drinks</p>
                  </div>
                  <div className="a-icon-item-sm">
                    <a className="a-icon-action-sm">
                      <i className="fa fa-glass" aria-hidden="true" />
                    </a>
                    <p className="xxm">Alcohol</p>
                  </div>
                  <div className="a-icon-item-sm">
                    <a className="a-icon-action-sm">
                      <i className="fa fa-glass" aria-hidden="true" />
                    </a>
                    <p className="xxm">Alcohol</p>
                  </div>
                  <div className="a-icon-item-sm">
                    <a className="a-icon-action-sm">
                      <i className="fa fa-glass" aria-hidden="true" />
                    </a>
                    <p className="xxm">Alcohol</p>
                  </div>
                  <div className="a-icon-item-sm">
                    <a className="a-icon-action-sm">
                      <i className="fa fa-glass" aria-hidden="true" />
                    </a>
                    <p className="xxm">Alcohol</p>
                  </div>
                </div>
                <div className="row xxm">
                  <div className="col-sm-6">
                    <p className="vs-title">Bartender</p>
                    <div className="noe-container">
                      <a href="#" className="noe-action">
                        <strong>–</strong>
                      </a>
                      <div className="noe-num">25</div>
                      <a href="#" className="noe-action">
                        <strong>+</strong>
                      </a>
                    </div>
                  </div>

                  <div className="col-sm-6">
                    <p className="vs-title">Chef</p>
                    <div className="noe-container">
                      <a href="#" className="noe-action">
                        <strong>–</strong>
                      </a>
                      <div className="noe-num">25</div>
                      <a href="#" className="noe-action">
                        <strong>+</strong>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="vs-freq xxm">
                  <div className="row">
                    <div className="vs-freq-items col-sm-3">
                      <a className="a-checkbox active" />
                      <span>Full Time</span>
                    </div>
                    <div className="vs-freq-items col-sm-3">
                      <a className="a-checkbox" />
                      <span>Part Time</span>
                    </div>
                    <div className="vs-freq-items col-sm-3">
                      <a className="a-checkbox" />
                      <span>Casual</span>
                    </div>
                    <div className="vs-freq-items col-sm-3">
                      <a className="a-checkbox" />
                      <span>Event</span>
                    </div>
                  </div>
                </div>
                <div className="fs-soi-action xdm">
                  <button className="a-btn btn-dark btn-round pull-right">
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
                    <button className="a-btn btn-round wide-sm btn-passive">
                      All
                    </button>
                    <button className="a-btn btn-round btn-active">
                      Bartender
                    </button>
                    <button className="a-btn btn-round wide-md btn-passive">
                      Waiter/Waitress
                    </button>
                    <button className="a-btn btn-round wide-md btn-passive">
                      Chef/Kitchen Hand
                    </button>
                    <button className="a-btn btn-round wide-sm btn-passive">
                      Host
                    </button>
                    <button className="a-btn btn-round wide-md btn-passive">
                      Barback/Floor Staff
                    </button>
                  </div>
                </div>
                <div className="xdm fs-feed-list v-scroll scroll">
                  {this.state.staffs.map((staff, index) => {
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
