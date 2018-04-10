import React from "react"
import NavBar from "../layouts/NavBar"
import { Link } from "react-router-dom"
import { Button } from "react-bootstrap"
import "./SubscribeSettings.css"

export default class SubscribeSettings extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        <NavBar />
        <div className="container lem">
          <div className="container subscribe-settings">
            <h4>Your Subscription</h4>
            <ul>
              <li>
                <Link to="/">
                  Attender Premium <i class="fa fa-angle-right" />
                </Link>
              </li>
            </ul>
            <h3>Managing Staff</h3>
            <ul>
              <li>
                <Link to="/">
                  Andrew Orsen <i class="fa fa-angle-right" />
                </Link>
              </li>
              <li>
                <Link to="/">
                  Bea Alonzo <i class="fa fa-angle-right" />
                </Link>
              </li>
              <li>
                <Link to="/">
                  Pia Wurztbach <i class="fa fa-angle-right" />
                </Link>
              </li>
              <li>
                <Link to="/">
                  Angel Locsin <i class="fa fa-angle-right" />
                </Link>
              </li>
              <li>
                <Link to="/">
                  Andrew Orsen <i class="fa fa-angle-right" />
                </Link>
              </li>
              <li>
                <Link to="/">
                  Bea Alonzo <i class="fa fa-angle-right" />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
