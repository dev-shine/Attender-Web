import React, { Component } from "react"
import NavBar from "../layouts/NavBar"
import ".././styles/global.css"
import ".././styles/style.css"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import TextTruncate from "react-text-truncate"

class EmployerMessage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      threads: [1, 2, 3, 0, 2, 0, 0, 7, 8]
    }
  }

  renderMessages = () => {
    return (
      <div className="m-content">
        <div className="m-message-left">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt e velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </div>
        <div className="m-message-left">
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
        </div>
        <div className="m-time-left">9:45 AM</div>

        <div className="m-message-right">
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa{" "}
        </div>
        <div className="m-message-right">
          quae ab illo inventore veritati it aut fugit, sed quia consequuntur
          magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro
          quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur,
          adipisc
        </div>
        <div className="m-time-right">10:00 AM</div>

        <div className="m-line">
          <div className="a-line" />
          <div className="m-today">TODAY</div>
        </div>

        <div className="m-message-left">
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
        </div>
        <div className="m-time-left">9:45 AM</div>

        <div className="m-message-right">
          quae ab illo inventore veritati it aut fugit, sed quia consequuntur
          magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro
          quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur,
          adipisc
        </div>
        <div className="m-time-right">10:00 AM</div>
      </div>
    )
  }

  renderContactMenu = () => {
    return (
      <div className="m-contacts-menu">
        <div className="m-contacts-menu-item-active">
          <span>CHAT</span>
        </div>
        <div className="m-contacts-menu-item">
          <span>CONTACTS</span>
        </div>
        <div className="m-contacts-menu-item">
          <span>ONLINE</span>
        </div>
        <div className="m-contacts-menu-item">
          <span>STAFF</span>
        </div>
      </div>
    )
  }

  renderContacts = () => {
    return (
      <div>
        {this.state.threads.map((thread, index) => {
          return (
            <div key={index} className="m-thread">
              <div className="row">
                <div className="col-sm-3">
                  <img
                    alt=""
                    className="profile-thumb"
                    src="http://via.placeholder.com/150x150"
                  />
                </div>
                <div className="col-sm-9">
                  <span>Dummy Name</span>
                  <div className="m-thread-msg">
                    {thread ? (
                      <span className="a-badge pull-right">{thread}</span>
                    ) : null}
                    <TextTruncate
                      line={1}
                      truncateText="…"
                      text="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
                    />
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  renderComposer = () => {
    return (
      <div className="m-composer">
        <a className="m-icon pull-left">
          <img
            alt=""
            src={require(".././assets/icons/messages/attachment.png")}
          />
        </a>
        <input type="text" placeholder="Type here to write something" />
        <button>
          <i className="fa fa-paper-plane" />
        </button>
      </div>
    )
  }

  render() {
    return (
      <div>
        <NavBar />
        <div className="container xxem">
          <div className="content-messages">
            <div className="messages-header">
              <div className="row">
                <div className="col-sm-4 m-head">
                  <span>My Conversations</span>
                  <a className="m-icon pull-right">
                    <img
                      alt=""
                      src={require(".././assets/icons/messages/gear.png")}
                    />
                  </a>
                  <a className="m-icon pull-right">
                    <img
                      alt=""
                      src={require(".././assets/icons/messages/edit.png")}
                    />
                  </a>
                </div>
              </div>
            </div>
            <div className="messages-body">
              <div className="row">
                <div className="col-sm-4 m-contacts">
                  {this.renderContactMenu()}
                  {this.renderContacts()}
                </div>

                <div className="col-sm-8 m-messages">
                  {this.renderMessages()}
                  {this.renderComposer()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(EmployerMessage)
