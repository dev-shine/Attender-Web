/**
 * @providesModule API
 */

import constant from '../configs/constant';
import helper from '../helper/ZHelper';

var API = {

  REQUEST_TOKEN: "",

  async get(url, param) {
    try {
      let response = await fetch(constant.API_URL + url, {
        method: 'GET',
        headers: {
          'Content-Type':'application/x-www-form-urlencoded',
          'X-request-token': this.REQUEST_TOKEN || ''
        }
      });
      try {
        return await response.json();
      } catch (error) {
        console.log(error);
        return
      }
    } catch (e) {
      console.log('Error', e);
      return
    }
  },
  async post(url, param) {
    try {
      let response = await fetch(constant.API_URL + url, {
        method: 'POST',
        headers: {
          'Access-Control-Allow-Origin':'*',
          'Content-Type':'application/x-www-form-urlencoded',
          'X-request-token': this.REQUEST_TOKEN || ''
        },
        body: helper.createParam(param)
      });

      try {
        return await response.json();
      } catch (error) {
        console.log(error);
        return
      }
    } catch (e) {
      console.log('Error', e);
      return
    }

  },

  initRequest() {
    this.REQUEST_TOKEN = localStorage.getItem('com.attender.pty.ltd.token', '');
  },

  setToken(token) {
    this.REQUEST_TOKEN = token;
    localStorage.setItem('com.attender.pty.ltd.token', token);
  },

  async getProfile() {
    let profile = localStorage.getItem('com.attender.pty.ltd.profile', '{}')
    try {
      return JSON.parse(profile)
    } catch (e) {
      console.log('Error', e);
      return
    }
  },


  logout() {
    localStorage.removeItem('com.attender.pty.ltd.token');
    this.REQUEST_TOKEN = ''
  }

};

export default API;
