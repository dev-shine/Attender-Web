import { SET_SUBSCRIBE_POPUP } from "../actions/myProfile-actions"

export default function myProfileReducer(state = "", { type, payload }) {
  switch (type) {
    case SET_SUBSCRIBE_POPUP:
      return payload
    default:
      return state
  }
}
