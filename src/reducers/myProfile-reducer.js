import {
  SET_SUBSCRIBE_POPUP,
  SET_INFO,
  SET_SUBSCRIBE_ME
} from "../actions/myProfile-actions"

export default function myProfileReducer(state = "", { type, payload }) {
  switch (type) {
    case SET_SUBSCRIBE_POPUP: {
      const data = Object.assign({}, state, payload)
      return data
    }
    case SET_INFO: {
      const data = Object.assign({}, { showPopup: true }, payload)
      return data
    }
    case SET_SUBSCRIBE_ME: {
      const data = Object.assign({}, state, payload)
      return data
    }
    default:
      return state
  }
}
