import React, { Component } from "react"
import NavBar from "./../layouts/NavBar"
import "./../.././styles/global.css"
import "./../.././styles/style.css"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import TextTruncate from "react-text-truncate"
import API from "./../../services/api"
import constant from "./../../configs/constant"
import { push } from "react-router-redux"
import SubscribePopUp from "./.././layouts/SubscribePopUp/SubscribePopUp"
import { setSubscribePopUp } from "./../../actions/myProfile-actions"
import { loadState, saveState } from "./../../localStorage"
var moment = require("moment")
const ws = require("adonis-websocket-client")
const io = ws(constant.API_URL.replace("/api/", ""))
const client = io.channel("chat").connect()
const FontAwesome = require("react-fontawesome")

class Messages extends Component {
  constructor(props) {
    super(props)
    this.inputMessageRef = null
    this.messagesEnd = null
    this.threadUrl = ""
    this.state = {
      eventDropdown: "init",
      openHiringOptionsModal: false,
      inputMessage: "",
      renderContactsLoading: true,
      renderMessagesLoading: true,
      renderStaffsLoading: true,
      loading: true,
      thread: {},
      threads: [],
      conversation: [],
      tab: "chat",
      myStaffs: [],
      staffs: {
        all: { on: true },
        barista: { on: false },
        bartender: { on: false },
        manager: { on: false },
        waiter: { on: false },
        chef: { on: false },
        barback: { on: false },
        kitchen: { on: false },
        host: { on: false }
      },
      staffFilters: [],
      selectedStaff: {},
      showSubscribeNowOffer: true
    }
  }
  componentWillMount = async () => {
    // API.initRequest()
    // let profile = await API.getProfile()

    const profile = loadState("com.attender.pty.ltd.profile")

    if (profile.isSubscribed) {
      this.setState({ showSubscribeNowOffer: false })
    }

    this.setState({ profile })

    if (profile.isStaff) {
      this.threadUrl = "staff-messages"
    }

    if (profile.isVenue || profile.isEmployer) {
      this.threadUrl = "venue-messages"
      this.getMyStaffs()
    }

    API.get(this.threadUrl).then(res => {
      if (res && res.status) {
        this.setState(
          {
            threads: res.threads,
            renderContactsLoading: false,
            thread: res.threads[0]
          },
          () => {
            if (res.threads.length > 1) {
              this.getConversation()
              this.connectSocket()
            }
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
        API.get(this.threadUrl).then(res => {
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

  handleThreadClick = (thread, staff) => {
    if (thread) {
      this.setState({ thread, renderMessagesLoading: true }, () => {
        this.getConversation()
      })
    }

    if (!thread) {
      this.setState({ thread: null })
      this.setState({ selectedStaff: staff })
    }
  }

  handleTabClick = tab => {
    this.setState({ tab }, () => {
      this.getMyStaffs()
    })
  }

  handleDeleteConversation = thread => {
    API.post(`conversation/${thread._id}/delete`, {}).then(res => {
      if (res.status) {
        this.setState(
          { renderContactsLoading: true, renderMessagesLoading: true },
          () => {
            this.getStaffMessages()
            this.getConversation()
          }
        )
      }
    })
  }

  getMyStaffs = () => {
    API.get("my-staffs?withTrial=true").then(res => {
      if (res && res.status) {
        const allStaff = []
        Object.keys(res.staffs).forEach(staff => {
          res.staffs[staff].forEach(as => {
            if (
              allStaff.length === 0 ||
              !allStaff.find(asf => asf.staff._id === as.staff._id)
            ) {
              allStaff.push(as)
            }
          })
        })
        this.setState({
          myStaffs: allStaff,
          renderStaffsLoading: false
        })
      }
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

    this.state.threads.forEach(thread => {
      client.joinRoom(thread._id, {}, (err, message) => {
        // console.log("join room", err, message)
      })
    })

    client.on("message", function(room, message) {
      // console.log("room", room, "message", message)
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
    this.messagesEnd && this.messagesEnd.scrollIntoView()
  }

  onSend = event => {
    event.preventDefault()
    var self = this

    var thread = this.state.thread

    var body = {
      receiver: thread ? thread.usid : this.state.selectedStaff.user,
      message: this.state.inputMessage
    }

    thread && (body.convo = this.state.thread._id)
    body[this.state.profile.isStaff ? "venue" : "staff"] = thread
      ? thread.uselect
      : this.state.selectedStaff._id

    API.post(
      this.state.profile.isStaff
        ? "new-venue-message"
        : thread
          ? "new-staff-message"
          : "new-initial-message",
      body
    ).then(res => {
      if (res.status) {
        self.setState({ inputMessage: "" }, function() {
          if (res.thread) {
            self.setState({ renderMessagesLoading: true }, () => {
              const thread = res.thread
              client.joinRoom(thread._id, {}, (err, message) => {
                self.setState(
                  {
                    threads: [...self.state.threads, thread],
                    thread,
                    renderMessagesLoading: false
                  },
                  () => {
                    console.log("newthreads", this.state.threads)
                    self.getConversation()
                  }
                )
              })
            })
          }
          self.inputMessageRef.focus()
        })
      }
    })
  }

  renderMessages = () => {
    if (this.state.renderMessagesLoading) {
      return (
        <div className="container xem center navigator">
          <img alt="" src={require("./../../assets/icons/loading.svg")} />
        </div>
      )
    }

    return (
      <div className="m-content">
        {!this.state.thread ? (
          <div className="container xem center navigator">
            <a href="javascript:void(0)" className="nav-brand">
              <FontAwesome name="comments" size="2x" />&nbsp;&nbsp;Start
              Conversation
            </a>
          </div>
        ) : (
          this.state.conversation
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
            })
        )}
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
    if (this.state.profile) {
      return (
        <div className="m-contacts-menu">
          <div
            className={
              this.state.tab === "chat"
                ? "m-contacts-menu-item-active"
                : "m-contacts-menu-item"
            }
            onClick={this.handleTabClick.bind(this, "chat")}
          >
            <span>CHAT</span>
          </div>
          {this.state.profile.isEmployer || this.state.profile.isVenue ? (
            <div
              className={
                this.state.tab === "staff"
                  ? "m-contacts-menu-item-active"
                  : "m-contacts-menu-item"
              }
              onClick={this.handleTabClick.bind(this, "staff")}
            >
              <span>STAFF</span>
            </div>
          ) : null}
        </div>
      )
    }
  }

  renderContacts = () => {
    if (this.state.renderContactsLoading) {
      return (
        <div className="container xem center navigator">
          <img alt="" src={require("./../../assets/icons/loading.svg")} />
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
                  <span className="pull-right">
                    <FontAwesome
                      name="trash"
                      onClick={this.handleDeleteConversation.bind(this, thread)}
                    />
                  </span>
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

  onSelectOption = (key, obj) => {
    let _obj = this.state[obj]
    _obj[key].on = !_obj[key].on

    if (key === "all") {
      const staffs = { ...this.state.staffs }
      Object.keys(staffs).forEach(
        i => (i !== "all" ? (staffs[i].on = false) : (staffs[i].on = true))
      )
      this.setState({ staffs })
    }

    if (key !== "all") {
      const staffs = { ...this.state.staffs }
      staffs.all.on = false
      this.setState({ staffs })
    }

    this.setState(prevState => ({ [obj]: _obj }))

    this.setState({
      staffFilters: Object.keys(this.state.staffs).filter(
        i => this.state.staffs[i].on
      )
    })
  }

  renderStaff = () => {
    if (this.state.renderStaffsLoading) {
      return (
        <div className="container xem center navigator">
          <img alt="" src={require("./../../assets/icons/loading.svg")} />
        </div>
      )
    }

    return (
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
                    src={require(`../../assets/icons/staff/white/${key}.png`)}
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
                    src={require(`../../assets/icons/staff/default/${key}.png`)}
                  />
                </a>
                <p className="xxm">{key.capitalize()}</p>
              </div>
            )
          }
        })}
      </div>
    )
  }

  renderMyStaff = () => {
    if (this.state.renderStaffsLoading) {
      return (
        <div className="container xem center navigator">
          <img alt="" src={require("./../../assets/icons/loading.svg")} />
        </div>
      )
    }

    return (
      <div>
        {this.state.myStaffs
          .filter(
            m =>
              this.state.staffs.all.on
                ? m
                : m.staff.position.some(
                    p =>
                      Object.keys(this.state.staffs)
                        .filter(i => this.state.staffs[i].on)
                        .indexOf(p) >= 0
                  )
          )
          .map((staff, index) => {
            return (
              <div
                key={index}
                className="m-thread"
                onClick={this.handleThreadClick.bind(
                  this,
                  this.state.threads.find(t => t.uselect === staff.staff._id),
                  staff.staff
                )}
              >
                <div className="row">
                  <div className="col-sm-3">
                    <img
                      alt=""
                      className="profile-thumb"
                      src={staff.staff.avatar}
                    />
                  </div>
                  <div className="col-sm-9">
                    <span>{staff.staff.fullname}</span>
                  </div>
                </div>
              </div>
            )
          })}
      </div>
    )
  }

  handleViewProfileClick = () => {
    this.props.goToStaff(this.props.match.params.staff)
  }

  handleOpenModal = () => {
    this.setState({
      openHiringOptionsModal: !this.state.openHiringOptionsModal
    })
  }

  onPressStartTrial = () => {
    API.post(`trial/${this.props.match.params.staff}`, {}).then(res => {
      this.setState({ renderStaffsLoading: true, tab: "staff" }, () => {
        this.getMyStaffs()
        this.handleOpenModal()
      })
    })
  }

  onPressSkipTrial = () => {
    API.post(`direct-hire/${this.props.match.params.staff}`, {}).then(res => {
      this.setState({ renderStaffsLoading: true }, () => {
        this.getMyStaffs()
        this.handleOpenModal()
      })
    })
  }

  renderEventModal = () => {
    return (
      <div
        className={
          this.state.openHiringOptionsModal ? "a-modal show" : "a-modal"
        }
      >
        <div className="a-modal-content">
          <span onClick={() => this.handleOpenModal()} className="a-close">
            &times;
          </span>
          <div className="row">
            <div className="col-sm-12">
              <div className="container xem center navigator">
                <div className="m-composer">
                  <div>
                    <button onClick={this.onPressStartTrial}>OK</button>
                    Start Trial
                  </div>
                  or
                  <div>
                    <button onClick={this.onPressSkipTrial}>
                      <i className="fa fa-arrow-right" />
                    </button>
                    Skip Trial
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderComposer = () => {
    return (
      <div className="m-composer">
        <a className="m-icon pull-left">
          <img
            alt=""
            src={require("./../../assets/icons/messages/attachment.png")}
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

  openDropdown = index => {
    if (this.state.eventDropdown === index) {
      this.setState({ eventDropdown: "init" })
    } else {
      this.setState({ eventDropdown: index })
    }
  }

  renderNewMessage = () => {
    return (
      <div className="m-content">
        To: Recipient
        {this.renderEventModal()}
      </div>
    )
  }

  render() {
    return (
      <div>
        {this.state.showSubscribeNowOffer ? (
          <SubscribePopUp
            close={() => {
              this.setState({ showSubscribeNowOffer: false })
            }}
          />
        ) : null}
        <NavBar />
        <div className="container xxem">
          <div className="content-messages">
            <div className="messages-header">
              <div className="row">
                <div className="col-sm-4 m-head">
                  <span>My Conversations</span>
                  <a className="m-icon pull-right">
                    {/* <img
                      alt=""
                      src={require("./../../assets/icons/messages/gear.png")}
                    /> */}
                  </a>
                  <a className="m-icon pull-right">
                    <img
                      alt=""
                      src={require("./../../assets/icons/messages/edit.png")}
                    />
                  </a>
                  <div className="drop-menu">
                    <img
                      alt=""
                      src={require("./../../assets/icons/messages/gear.png")}
                      onClick={() => this.openDropdown("e-1")}
                    />
                    <div
                      className="e-dropdown"
                      style={{
                        display:
                          this.state.eventDropdown === "e-1" ? "block" : "none"
                      }}
                    >
                      <div className="e-dropdown-content">
                        <p onClick={this.handleViewProfileClick}>
                          View Profile
                        </p>
                        <p onClick={this.handleOpenModal}>Hiring Options</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="messages-body">
              <div className="row">
                <div className="col-sm-4 m-contacts">
                  {this.renderContactMenu()}
                  {this.state.tab === "chat" ? this.renderContacts() : null}
                  {this.state.tab === "staff" ? this.renderStaff() : null}
                  {this.state.tab === "staff" ? this.renderMyStaff() : null}
                </div>

                <div className="col-sm-8 m-messages">
                  {this.renderEventModal()}
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

const mapStateToProps = state => {
  return state
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      goToStaff: staffId => push(`/find-staff/${staffId}`),
      onSetSubscribePopUp: setSubscribePopUp
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(Messages)
