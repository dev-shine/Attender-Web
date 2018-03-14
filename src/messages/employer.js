import React, { Component } from "react"
import NavBar from "../layouts/NavBar"
import ".././styles/global.css"
import ".././styles/style.css"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import TextTruncate from "react-text-truncate"
import API from "./../services/api"
import constant from "./../configs/constant"
var moment = require("moment")
const ws = require("adonis-websocket-client")
const io = ws("http://localhost:3333")
const client = io.channel("chat").connect()

class EmployerMessage extends Component {
  constructor(props) {
    super(props)
    this.inputMessageRef = null
    this.messagesEnd = null
    this.state = {
      inputMessage: "",
      renderContactsLoading: true,
      renderMessagesLoading: true,
      loading: true,
      thread: {},
      threads: [],
      conversation: []
    }
  }

  componentWillMount = async () => {
    API.initRequest()

    let profile = await API.getProfile()
    this.setState({ profile })
    API.get("staff-messages").then(res => {
      if (res.status) {
        this.setState(
          {
            threads: res.threads,
            renderContactsLoading: false,
            thread: res.threads[0]
          },
          () => {
            this.getConversation()
            this.connectSocket()
          }
        )
      }
    })
  }

  getStaffMessages = () => {
    this.setState(
      {
        renderContactsLoading: false
      },
      () => {
        API.get("staff-messages").then(res => {
          if (res.status) {
            this.setState({
              threads: res.threads,
              renderContactsLoading: false
            })
          }
        })
      }
    )
  }

  onChangeInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleThreadClick = thread => {
    if (this.state.thread._id) {
      this.leaveSocketRoom(this.state.thread._id)
    }

    this.setState({ thread, renderMessagesLoading: true }, function() {
      this.getConversation()
      this.connectSocket()
    })
  }

  getConversation = () => {
    API.get(`conversation/${this.state.thread._id}`).then(res => {
      if (res.status) {
        let formatMessages = []
        let date = null
        res.messages.map((res, id) => {
          if (!date) {
            date = moment(res.sentAt).format("MM/DD/YYYY")
          }

          var $formatMessages = {
            _id: id,
            text: res.message,
            createdAt: moment(res.sentAt).format("h:mm A"),
            conversation: res.conversation,
            user: {
              _id: res.sender,
              name: "",
              avatar: res.staff.avatar
            }
          }

          if (date !== moment(res.sentAt).format("MM/DD/YYYY")) {
            $formatMessages.setDateBar = date
          }

          formatMessages.push($formatMessages)
        })

        this.setState({
          conversation: formatMessages,
          renderMessagesLoading: false
        })
        this.scrollToBottom()
      }
    })
  }

  connectSocket = () => {
    var self = this
    var threadId = this.state.thread._id

    client.joinRoom(threadId, {}, (err, message) => {
      console.log("join room", err, message)
    })

    client.on("message", function(room, message) {
      console.log("room", room, "message", message)
      if (message == "refresh-messages") {
        self.getConversation()
        self.getStaffMessages()
      }
    })
  }

  leaveSocketRoom = id => {
    client.leaveRoom(id, {}, (err, message) => {
      console.log(err, message)
    })
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView()
  }

  onSend = event => {
    event.preventDefault()
    var self = this

    var thread = this.state.thread

    var body = {
      receiver: thread.usid,
      message: this.state.inputMessage,
      venue: thread.uselect,
      convo: this.state.thread._id
    }

    API.post("new-venue-message", body).then(res => {
      if (res.status) {
        self.setState({ inputMessage: "" }, function() {
          self.inputMessageRef.focus()
        })
      }
    })
  }

  renderMessages = () => {
    if (this.state.renderMessagesLoading) {
      return (
        <div className="container xem center navigator">
          <img alt="" src={require("./../assets/icons/loading.svg")} />
        </div>
      )
    }

    return (
      <div className="m-content">
        {this.state.conversation
          .slice(0)
          .reverse()
          .map((message, index) => {
            return (
              <div key={index}>
                {message.setDateBar ? (
                  <div className="m-line">
                    <div className="a-line" />
                    <div className="m-today">{message.setDateBar}</div>
                  </div>
                ) : null}
                <div
                  className={
                    this.state.profile._id === message.user._id
                      ? "m-message-right"
                      : "m-message-left"
                  }
                >
                  {message.text}
                </div>
                <div
                  className={
                    this.state.profile._id === message.user._id
                      ? "m-time-right"
                      : "m-time-left"
                  }
                >
                  {message.createdAt}
                </div>
              </div>
            )
          })}
        <div
          style={{ float: "left", clear: "both" }}
          ref={el => {
            this.messagesEnd = el
          }}
        />
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
    if (this.state.renderContactsLoading) {
      return (
        <div className="container xem center navigator">
          <img alt="" src={require("./../assets/icons/loading.svg")} />
        </div>
      )
    }

    return (
      <div>
        {this.state.threads.map((thread, index) => {
          return (
            <div
              key={index}
              className="m-thread"
              onClick={this.handleThreadClick.bind(this, thread)}
            >
              <div className="row">
                <div className="col-sm-3">
                  <img alt="" className="profile-thumb" src={thread.uavatar} />
                </div>
                <div className="col-sm-9">
                  <span>{thread.uname}</span>
                  <div className="m-thread-msg">
                    {!thread.seen ? (
                      <span className="a-badge pull-right" />
                    ) : null}
                    <TextTruncate
                      line={1}
                      truncateText="…"
                      text={thread.message}
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
        <form onSubmit={this.onSend}>
          <input
            type="text"
            name="inputMessage"
            placeholder="Type here to write something"
            ref={input => {
              this.inputMessageRef = input
            }}
            value={this.state.inputMessage}
            onChange={this.onChangeInput}
          />
          <button onClick={this.onSend}>
            <i className="fa fa-paper-plane" />
          </button>
        </form>
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
