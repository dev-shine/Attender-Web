import React, { Component } from "react"
import NavBar from "../layouts/NavBar"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"

class Schedule extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      schedules: [1, 2, 3, 4, 5, 6, 7, 8]
    }
  }

  renderAddSched = () => {
    return (
      <div className="staff-sched-add max-width">
        <a className="a-btn-circle">+</a>
      </div>
    )
  }

  renderSched = () => {
    return (
      <div className="max-width">
        <div className="staff-sched-box-head">
          <span>Andrew O.</span>
          <a>&times;</a>
        </div>
        <div className="staff-sched-box-body">
          <p>
            <i className="fa fa-clock-o" /> 1:00 PM - 7:00 PM
          </p>
          <a className="pull-left">
            <i className="fa fa-copy" />
          </a>
          <a className="pull-left">
            <i className="fa fa-arrows" />
          </a>
          <a className="pull-right darker">
            <i className="fa fa-envelope-o" />
          </a>
          <a className="pull-right">
            <i className="fa fa-edit" />
          </a>
        </div>
      </div>
    )
  }

  renderHeader = () => {
    return (
      <div className="staff-sched-header">
        <p>YOUR WEEKLY STAFF SCHEDULE FOR VENUE</p>
        <div>
          <a className="a-btn-circle">
            <i className="fa fa-arrow-left" />
          </a>
          &nbsp;&nbsp;&nbsp; MONDAY, AUGUST 14,2017 - SUNDAY, AUGUST 20, 2017
          &nbsp;&nbsp;&nbsp;
          <a className="a-btn-circle">
            <i className="fa fa-arrow-right" />
          </a>
        </div>
      </div>
    )
  }

  renderTableHeader = () => {
    return (
      <thead>
        <tr>
          <td>
            <a className="staff-sched-c-active pull-left">ACTIVE STAFF</a>
            <a className="staff-sched-c pull-right">TRIAL PERIOD</a>
          </td>
          <td>
            <div>
              MONDAY
              <p>August 14, 2017</p>
            </div>
          </td>
          <td>
            <div>
              TUESDAY
              <p>August 15, 2017</p>
            </div>
          </td>
          <td>
            <div>
              WEDNESDAY
              <p>August 16, 2017</p>
            </div>
          </td>
          <td>
            <div>
              THURSDAY
              <p>August 17, 2017</p>
            </div>
          </td>
          <td>
            <div>
              FRIDAY
              <p>August 18, 2017</p>
            </div>
          </td>
          <td>
            <div>
              SATURDAY
              <p>August 19, 2017</p>
            </div>
          </td>
          <td>
            <div>
              SUNDAY
              <p>August 20, 2017</p>
            </div>
          </td>
        </tr>
      </thead>
    )
  }

  renderTableBody = () => {
    return (
      <tbody>
        {this.state.schedules.map(schedule => {
          return (
            <tr>
              <td>
                <button className="btn-square">
                  <i className="fa fa-edit" />
                </button>
                <div>
                  <p>Rostered: 09:00 hrs | 4 shifts</p>
                  <p>Venue: Lumi Bar & Cafe</p>
                  <p>Manager: Michael Barks</p>
                </div>
              </td>
              <td>{this.renderSched()}</td>
              <td>{this.renderAddSched()}</td>
              <td>{this.renderSched()}</td>
              <td>{this.renderAddSched()}</td>
              <td>{this.renderSched()}</td>
              <td>{this.renderAddSched()}</td>
              <td>{this.renderAddSched()}</td>
            </tr>
          )
        })}
      </tbody>
    )
  }

  renderBody = () => {
    return (
      <div className="staff-sched-body v-scroll scroll">
        <table className="table table-responsive">
          {this.renderTableHeader()}
          {this.renderTableBody()}
        </table>
      </div>
    )
  }

  renderContent = () => {
    return (
      <div className="container xem">
        <div className="card staff-sched-container">
          {this.renderHeader()}
          {this.renderBody()}
          <button className="staff-sched-save a-btn btn-dark btn-round">
            Save
          </button>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="bg bg-default">
        <NavBar />
        {this.renderContent()}
      </div>
    )
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Schedule)
