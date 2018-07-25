import { GET_STAFFS, SET_STAFFS } from "./../actions/myStaffs-actions"

import { loadState, saveState } from "./../localStorage"

export default function myStaffsReducer(state = "", { type, payload }) {
  let myStaffs = loadState("com.attender.pty.ltd.mystaffs")
  if (myStaffs !== undefined) {
    state = myStaffs
  }

  switch (type) {
    case SET_STAFFS: {
      const data = Object.assign({}, payload)
      saveState("com.attender.pty.ltd.mystaffs", data)
      return data
    }
    case GET_STAFFS: {
      const x = loadState("com.attender.pty.ltd.mystaffs")
    }
  }
  return state
}
