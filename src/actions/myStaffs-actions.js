export const GET_STAFFS = "mystaffs:getMyStaffs"
export const SET_STAFFS = "mystaffs:setMyStaffs"

export function setMyStaffs(val) {
  return {
    type: SET_STAFFS,
    payload: val
  }
}
export function getMyStaffs() {
  return {
    type: GET_STAFFS
  }
}
