export const SET_SUBSCRIBE_POPUP = "myprofile:setSubscribePopUp"

export function setSubscribePopUp(val) {
  return {
    type: SET_SUBSCRIBE_POPUP,
    payload: {
      showPopup: val
    }
  }
}
