'use strict'

import React, { Component } from 'react';
import NavBar from '../layouts/NavBar'

import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

const FontAwesome = require('react-fontawesome')


class SearchVenues extends Component {

  constructor (props) {
    super(props);
    this.state = {
      step: 1,
      isLoading: false
    }
  }

  render () {
    return (
      <div>
        <NavBar/>

        <div className="container xem cont-flex">

          <div className="card card-md">
            <div className="card-header">
              <h4>NEARBY VENUE</h4>
              <div className="card-filter">
                <div className="xxm">
                  <span>FILTER BY:&nbsp;&nbsp;</span>
                  <button className="a-btn btn-round btn-dark">Type of Venue</button>
                  <button className="a-btn btn-round btn-passive">Type of Service</button>
                </div>
                <div className="xxm mini-container">
                  <button className="a-btn btn-round wide-sm btn-passive">All</button>
                  <button className="a-btn btn-round wide-sm btn-active">Cafe</button>
                  <button className="a-btn btn-round wide-sm btn-passive">Bar</button>
                  <button className="a-btn btn-round wide-sm btn-passive">Club</button>
                  <button className="a-btn btn-round wide-sm btn-passive">Pub</button>
                  <button className="a-btn btn-round wide-md btn-passive">Restaurant</button>
                </div>
              </div>
            </div>
            <div className="card-content scroll v-scroll xxm">

              <div className="venue-box row">
                <div className="col-sm-3 venue-img">
                  <img src="http://www.venue360.co.uk/assets/3314/0061/9043/riverside-ltfc2.jpg"/>
                </div>
                <div className="col-sm-6 venue-info">
                  <p className="venue-name">Lumi Bar</p>
                  <p>Bar / Restaurant</p>
                  <p>Monday - Friday: 10AM - 11PM</p>
                  <p>Saturday - Sunday: 10AM - 11PM</p>
                  <p>Services: </p>
                </div>
                <div className="col-sm-3 venue-action">
                  <p><FontAwesome name='map-marker' />&nbsp;&nbsp;Sydney, CBD</p>
                  <button className="btn-round btn-dark">Interested</button>
                </div>
              </div>

              <div className="venue-box row">
                <div className="col-sm-3 venue-img">
                  <img src="http://www.venue360.co.uk/assets/3314/0061/9043/riverside-ltfc2.jpg"/>
                </div>
                <div className="col-sm-6 venue-info">
                  <p className="venue-name">Lumi Bar</p>
                  <p>Bar / Restaurant</p>
                  <p>Monday - Friday: 10AM - 11PM</p>
                  <p>Saturday - Sunday: 10AM - 11PM</p>
                  <p>Services: </p>
                </div>
                <div className="col-sm-3 venue-action">
                  <p><FontAwesome name='map-marker' />&nbsp;&nbsp;Sydney, CBD</p>
                  <button className="btn-round btn-dark-outline">Im Interested</button>
                </div>
              </div>

              <div className="venue-box row">
                <div className="col-sm-3 venue-img">
                  <img src="http://www.venue360.co.uk/assets/3314/0061/9043/riverside-ltfc2.jpg"/>
                </div>
                <div className="col-sm-6 venue-info">
                  <p className="venue-name">Lumi Bar</p>
                  <p>Bar / Restaurant</p>
                  <p>Monday - Friday: 10AM - 11PM</p>
                  <p>Saturday - Sunday: 10AM - 11PM</p>
                  <p>Services: </p>
                </div>
                <div className="col-sm-3 venue-action">
                  <p><FontAwesome name='map-marker' />&nbsp;&nbsp;Sydney, CBD</p>
                  <button className="btn-round btn-dark-outline">Im Interested</button>
                </div>
              </div>

              <div className="venue-box row">
                <div className="col-sm-3 venue-img">
                  <img src="http://www.venue360.co.uk/assets/3314/0061/9043/riverside-ltfc2.jpg"/>
                </div>
                <div className="col-sm-6 venue-info">
                  <p className="venue-name">Lumi Bar</p>
                  <p>Bar / Restaurant</p>
                  <p>Monday - Friday: 10AM - 11PM</p>
                  <p>Saturday - Sunday: 10AM - 11PM</p>
                  <p>Services: </p>
                </div>
                <div className="col-sm-3 venue-action">
                  <p><FontAwesome name='map-marker' />&nbsp;&nbsp;Sydney, CBD</p>
                  <button className="btn-round btn-dark-outline">Im Interested</button>
                </div>
              </div>

            </div>
          </div>

          <div className="card card-sm">
            <div className="card-header">
              <h4>UPCOMING EVENTS NEAR YOU</h4>
              <div className="card-filter">
                <div className="xxm">
                  <span>FILTER BY:&nbsp;&nbsp;</span>
                  <button className="a-btn btn-round wide-md btn-dark">Events Near You</button>
                  <button className="a-btn btn-round wide-md btn-passive">Upcoming Events</button>
                </div>
                <div className="xxm card-filter">
                  <button className="a-btn btn-round wide-sm btn-passive">All</button>
                  <button className="a-btn btn-round wide-md btn-active">Wedding</button>
                  <button className="a-btn btn-round wide-md btn-passive">Birthday</button>
                  <button className="a-btn btn-round wide-md btn-passive">Conference</button>
                  <button className="a-btn btn-round wide-md btn-passive">Music Festival</button>
                  <button className="a-btn btn-round wide-md btn-passive">Family Events</button>
                </div>
              </div>
            </div>
            <div className="card-content-np scroll v-scroll xxm">

              <div className="event-box row">
                <div className="col-sm-3 event-date">
                  <p className="e-day">21</p>
                  <p className="e-month">August</p>
                </div>
                <div className="col-sm-9 event-data">
                  <div className="col-sm-3 event-img">
                    <img src="http://www.venue360.co.uk/assets/3314/0061/9043/riverside-ltfc2.jpg"/>
                  </div>
                  <div className="col-sm-9">
                    <p className="event-title">Wow Power</p>
                    <p><small><FontAwesome name="clock-o"/> 10:00AM - 12:00PM</small></p>
                    <p><small>Venue: Oasis Beach</small></p>
                    <p><small><FontAwesome name="map-marker"/> Sydney, CBC</small></p>
                    <div className="event-action">
                      <a href="#"><FontAwesome name="ellipsis-v" size="2x"/></a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="event-box row">
                <div className="col-sm-3 event-date">
                  <p className="e-day">21</p>
                  <p className="e-month">August</p>
                </div>
                <div className="col-sm-9 event-data">
                  <div className="col-sm-3 event-img">
                    <img src="http://www.venue360.co.uk/assets/3314/0061/9043/riverside-ltfc2.jpg"/>
                  </div>
                  <div className="col-sm-9">
                    <p className="event-title">Wow Power</p>
                    <p><small><FontAwesome name="clock-o"/> 10:00AM - 12:00PM</small></p>
                    <p><small>Venue: Oasis Beach</small></p>
                    <p><small><FontAwesome name="map-marker"/> Sydney, CBC</small></p>
                    <div className="event-action">
                      <a href="#"><FontAwesome name="ellipsis-v" size="2x"/></a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="event-box row">
                <div className="col-sm-3 event-date">
                  <p className="e-day">21</p>
                  <p className="e-month">August</p>
                </div>
                <div className="col-sm-9 event-data">
                  <div className="col-sm-3 event-img">
                    <img src="http://www.venue360.co.uk/assets/3314/0061/9043/riverside-ltfc2.jpg"/>
                  </div>
                  <div className="col-sm-9">
                    <p className="event-title">Wow Power</p>
                    <p><small><FontAwesome name="clock-o"/> 10:00AM - 12:00PM</small></p>
                    <p><small>Venue: Oasis Beach</small></p>
                    <p><small><FontAwesome name="map-marker"/> Sydney, CBC</small></p>
                    <div className="event-action">
                      <a href="#"><FontAwesome name="ellipsis-v" size="2x"/></a>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    )
  }

}


const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchVenues)
