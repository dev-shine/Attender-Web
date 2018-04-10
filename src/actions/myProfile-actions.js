export const SET_SUBSCRIBE_POPUP = "myprofile:setSubscribePopUp"
export const SET_INFO = "myprofile:setProfileDetails"
export const SET_SUBSCRIBE_ME = "myprofile:subscribeMe"

export function setProfileDetails(val) {
  return {
    type: SET_INFO,
    payload: val
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
export function subscribeMe(val) {
  return {
    type: SET_SUBSCRIBE_ME,
    payload: {
      isSubscribed: val
    }
  }
}
