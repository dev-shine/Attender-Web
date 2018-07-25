import {
  SET_SUBSCRIBE_POPUP,
  SET_INFO,
  SET_SUBSCRIBE_ME,
  SET_UNSUBSCRIBE_ME,
  GET_INFO
} from "./../actions/myProfile-actions"

import { loadState, saveState } from "./../localStorage"

export default function myProfileReducer(state = "", { type, payload }) {
  const profile = loadState("com.attender.pty.ltd.profile")
  if (profile !== undefined) {
    state = profile
  }
  switch (type) {
    case SET_SUBSCRIBE_POPUP: {
      const data = Object.assign({}, state, payload)
      return data
    }
    case SET_INFO: {
      const data = Object.assign({}, payload)
      saveState("com.attender.pty.ltd.profile", data)
      return data
    }
    case GET_INFO: {
      return loadState("com.attender.pty.ltd.profile")
    }
    case SET_SUBSCRIBE_ME: {
      const data = Object.assign({}, state, payload)
      saveState("com.attender.pty.ltd.profile", data)
      return data
    }
    case SET_UNSUBSCRIBE_ME: {
      const data = Object.assign({}, state, payload)
      saveState("com.attender.pty.ltd.profile", data)
      return data
    }
  }
  return state
}
