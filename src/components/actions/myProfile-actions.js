export const SET_SUBSCRIBE_POPUP = "myprofile:setSubscribePopUp"
export const SET_INFO = "myprofile:setProfileDetails"
export const GET_INFO = "myprofile:getProfileDetails"
export const SET_SUBSCRIBE_ME = "myprofile:subscribeMe"
export const SET_UNSUBSCRIBE_ME = "myprofile:unsubscribeMe"

export function setProfileDetails(val) {
  return {
    type: SET_INFO,
    payload: val
  }
}
export function getProfileDetails() {
  return {
    type: GET_INFO
  }
}
export function setSubscribePopUp(val) {
  return {
    type: SET_SUBSCRIBE_POPUP,
    payload: {
      showPopup: val
    }
  }
}
export function subscribeMe() {
  return {
    type: SET_SUBSCRIBE_ME,
    payload: {
      isSubscribed: true
    }
  }
}
export function unsubscribeMe() {
  return {
    type: SET_UNSUBSCRIBE_ME,
    payload: {
      isSubscribed: false
    }
  }
}
