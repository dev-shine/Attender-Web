/**
 * @providesModule API
 */

import constant from "./../configs/constant"
import helper from "./../helper/ZHelper"

export const cloudinary = {
  uploadFile(payload) {
    return new Promise((resolve, reject) => {
      var url = `https://api.cloudinary.com/v1_1/${payload.cloudName}/upload`
      var xhr = new XMLHttpRequest()
      var fd = new FormData()
      xhr.open("POST", url, true)
      xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest")

      xhr.onreadystatechange = function(e) {
        if (xhr.readyState == 4 && xhr.status == 200) {
          // File uploaded successfully
          var response = JSON.parse(xhr.responseText)

          // https://res.cloudinary.com/cloudName/image/upload/v1483481128/public_id.jpg
          var url = response.secure_url
          resolve(url)
          // Create a thumbnail of the uploaded image, with 150px width
          // var tokens = url.split("/")
          // tokens.splice(-2, 0, "w_150,c_scale")
          // var img = new Image() // HTML5 Constructor
          // img.src = tokens.join("/")
          // img.alt = response.public_id
        }
      }

      fd.append("upload_preset", payload.preset)
      fd.append("file", payload.file)
      xhr.onerror = () => reject(xhr.statusText)
      xhr.send(fd)
    })
  },

  async upload(payload) {
    const url = `https://api.cloudinary.com/v1_1/${payload.cloudName}/upload`
    const preset = "aepowkth"
    // const timestamp = Math.round(new Date().getTime() / 1000)

    try {
      let response = await fetch(url, {
        headers: {
          "X-Requested-With": "XMLHttpRequest"
        },
        method: "POST",
        body: {
          upload_preset: preset,
          file: payload.file
        }
      })

      try {
        return await response.json()
      } catch (err) {
        throw new Error(err)
      }
    } catch (err) {
      throw new Error(err)
    }
  }
}

var API = {
  REQUEST_TOKEN: "",

  async get(url, param) {
    try {
      let response = await fetch(constant.API_URL + url, {
        method: "GET",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "X-request-token": this.REQUEST_TOKEN || ""
        }
      })
      try {
        return await response.json()
      } catch (error) {
        console.log(error)
        return
      }
    } catch (e) {
      console.log("Error", e)
      return
    }
  },
  async post(url, param) {
    try {
      let response = await fetch(constant.API_URL + url, {
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/x-www-form-urlencoded",
          "X-request-token": this.REQUEST_TOKEN || ""
        },
        body: helper.createParam(param)
      })

      try {
        return await response.json()
      } catch (error) {
        console.log(error)
        return
      }
    } catch (e) {
      console.log("Error", e)
      return
    }
  },

  initRequest() {
    this.REQUEST_TOKEN = localStorage.getItem("com.attender.pty.ltd.token", "")
  },

  setToken(token) {
    this.REQUEST_TOKEN = token
    localStorage.setItem("com.attender.pty.ltd.token", token)
  },

  async getProfile() {
    let profile = localStorage.getItem("com.attender.pty.ltd.profile", "{}")
    try {
      return JSON.parse(profile)
    } catch (e) {
      console.log("Error", e)
      return
    }
  },

  logout() {
    localStorage.removeItem("com.attender.pty.ltd.token")
    localStorage.removeItem("com.attender.pty.ltd.mystaffs")
    localStorage.removeItem("com.attender.pty.ltd.profile")
    this.REQUEST_TOKEN = ""
  }
}

export default API
