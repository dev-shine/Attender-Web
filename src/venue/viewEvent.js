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
              <div className="header">
                <p>MANAGE YOUR EVENT</p>
                <p>
                  EVENT FOR APRIL 5 ( <span>TODAY</span> )
                </p>
                <p>Event Starts at 06:30 PM </p>
              </div>
              <div className="sem">
                <div className="form-group">
                  <p>Event Name</p>
                  <input type="text" className="a-input" />
                </div>
                <div className="form-group">
                  <p>Event Description</p>
                  <textarea rows="2" cols="50" className="a-input">
                    {" "}
                  </textarea>
                </div>
                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <p>Date</p>
                      <input type="text" className="a-input" />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <p>Time</p>
                      <input type="text" className="a-input" />
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <span>UPLOAD PHOTOS</span>
                  <div className="upload-box">
                    <a>Upload</a>
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
