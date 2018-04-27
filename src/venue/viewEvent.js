import React, { Component } from "react"

class ViewEvent extends Component {
  constructor() {
    super()
    this.state = {
      isLoading: false,
      event: {},
      eventStaffs: [2, 4, 5, 7]
    }
  }

  // #region Main Render Method
  render() {
    return <div>{this.renderManagementModal()}</div>
  }
  // #endregion

  // #region Sub Render Methods
  renderManagementModal = () => {
    return (
      <div className={this.props.openViewDetails ? "a-modal show" : "a-modal"}>
        <div className="a-modal-content management">
          <span onClick={this.props.onToggleModal} className="a-close">
            &times;
          </span>
          <div className="row">
            <div className="col-sm-5">
              <div className="header">
                <p style={{ fontSize: "20px", fontWeight: "bolder" }}>
                  Staff Meeting for Lumi Bar
                </p>
                <p>
                  APRIL 5 ( <span>TODAY</span> )
                </p>
                <p>Event Starts at 06:30 PM </p>
              </div>
              <div style={{ height: "auto", width: "100%" }}>
                <br />
                <img
                  style={{ height: "inherit", width: "inherit" }}
                  src={require(".././assets/Background1.png")}
                />
              </div>
              <div className="sem">
                <div className="v-scroll scroll view-event-modal-description">
                  The run will begin at 9:00 A.M. Participants must be
                  registered by this point. We are expecting to have around 100
                  participants. We will have sent registration applications out
                  prior to the event, to smaller running clubs in the area.
                  Registration fees are $20. The fees are to help cover park
                  permit fees, park participant fees, parking fees, and
                  refreshments. If a participant has registered early they will
                  have a parking pass distributed by us and the East Bay
                  Regional Parks will be reimbursed by the end of the event. If
                  a participant has not registered early they will not have a
                  parking pass and will have to pay for parking on their own.
                  The run/walk will go 2 ½ miles in one direction then turn
                  around and take the same route back. It will begin at the
                  Macdonald Staging area. Participants will run from there to
                  Bort Meadow Staging area and back. We will set up two water
                  stations on the trail. One at Bort Meadow Staging area and one
                  halfway in between Bort Meadow Staging area and Macdonald
                  Staging area. Our water stations will be operated by
                  volunteers. We will be requesting a vehicle access permit to
                  set up the water station that will be between the two staging
                  areas.
                </div>
              </div>
            </div>
            <div className="col-sm-7">
              <div className="header">
                <p style={{ fontSize: "20px", fontWeight: "bolder" }}>
                  Staff for this event
                </p>
              </div>
              <div className="staff-list v-scroll scroll view-event-modal-description-staff-list">
                <div className="row">
                  {this.state.eventStaffs.map(staff => {
                    return this.renderStaffBox(false, "col-sm-4", staff)
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderStaffBox = (closable, col, active) => {
    return (
      <div className={"my-staff " + col}>
        <div className="item">
          <img
            alt=""
            className="profile-thumb-sm my-staff-img"
            src="http://via.placeholder.com/50x50"
          />
          <p className="name">Staff {active}</p>
          <small>Part Time</small>
          <small>$20 - $23 /hour</small>
          <button className="a-btn btn-dark btn-round">
            <small>Send Message</small>
          </button>
          <a className="mreview">Add monthly review</a>
        </div>
      </div>
    )
  }
  // #endregion
}
export default ViewEvent
