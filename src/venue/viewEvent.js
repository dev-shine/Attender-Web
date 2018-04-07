import React, { Component } from "react"

class ViewEvent extends Component {
  constructor() {
    super()
    this.state = {
      isLoading: false,
      openManageEvent: true,
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
              <div
                className="header-event-detail-modal"
                style={{
                  backgroundImage: `url(${require(".././assets/Background1.png")})`,
                  backgroundSize: "cover"
                }}
              >
                <p style={{ fontSize: "20px", fontWeight: "bolder" }}>
                  Staff Meeting for Lumi Bar
                </p>
                <p>
                  APRIL 5 ( <span>TODAY</span> )
                </p>
                <p>Event Starts at 06:30 PM </p>
              </div>
              <div className="sem">
                <div>
                  <p>
                    The run will begin at 9:00 A.M. Participants must be
                    registered by this point. We are expecting to have around
                    100 participants. We will have sent registration
                    applications out prior to the event, to smaller running
                    clubs in the area. Registration fees are $20. The fees are
                    to help cover park permit fees, park participant fees,
                    parking fees, and refreshments. If a participant has
                    registered early they will have a parking pass distributed
                    by us and the East Bay Regional Parks will be reimbursed by
                    the end of the event. If a participant has not registered
                    early they will not have a parking pass and will have to pay
                    for parking on their own. The run/walk will go 2 ½ miles in
                    one direction then turn around and take the same route back.
                    It will begin at the Macdonald Staging area. Participants
                    will run from there to Bort Meadow Staging area and back. We
                    will set up two water stations on the trail. One at Bort
                    Meadow Staging area and one halfway in between Bort Meadow
                    Staging area and Macdonald Staging area. Our water stations
                    will be operated by volunteers. We will be requesting a
                    vehicle access permit to set up the water station that will
                    be between the two staging areas.
                  </p>
                </div>
                <div className="row">
                  <div className="col-sm-6">
                    <p>Date</p>
                    <p style={{ fontWeight: "bolder" }}>April 5, 2016</p>
                  </div>
                  <div className="col-sm-6">
                    <p>Time</p>
                    <p style={{ fontWeight: "bolder" }}>9:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-7">
              <div className="header">
                <p>YOUR STAFF FOR THIS EVENT</p>
                <p>
                  EVENT FOR APRIL 5 ( <span>TODAY</span> )
                </p>
              </div>
              <div className="search">
                <i className="fa fa-search" />
                <input
                  className="a-plain-text"
                  placeholder="Enter name to find staff"
                />
              </div>
              <div className="staff-list v-scroll scroll">
                <div className="row">
                  {this.state.eventStaffs.map(staff => {
                    return this.renderStaffBox(false, "col-sm-3", staff)
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
        <img
          alt=""
          className="profile-thumb-md my-staff-img"
          src="http://www.technodoze.com/wp-content/uploads/2016/03/default-placeholder.png"
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
  // #endregion
}
export default ViewEvent
