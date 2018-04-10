import { SET_SUBSCRIBE_POPUP, SET_INFO } from "../actions/myProfile-actions"

export default function myProfileReducer(state = "", { type, payload }) {
  console.log(type)
  console.log(state)
  console.log(payload)
  switch (type) {
    case SET_SUBSCRIBE_POPUP: {
      const data = Object.assign(state, payload)
      console.log(data)
      return data
    }
    case SET_INFO: {
      return payload
    }
    default:
      return state
  }
}
