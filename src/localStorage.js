export const loadState = key => {
  try {
    const serializedState = localStorage.getItem(key)
    // console.log('loadState', serializedState)
    if (serializedState === null) {
      return undefined
    }
    return JSON.parse(serializedState)
  } catch (err) {
    return undefined
  }
}

export const saveState = (key, val) => {
  try {
    const serializedState = JSON.stringify(val)
    // console.log(key, serializedState)
    localStorage.setItem(key, serializedState)
  } catch (err) {
    // ignore write errors.
  }
}
