import { combineReducers, createStore, applyMiddleware, compose } from "redux"
import { routerMiddleware } from "react-router-redux"
import thunk from "redux-thunk"
import createHistory from "history/createBrowserHistory"

// import productsReducer from'./reducers/products-reducer'
import myProfileReducer from "./reducers/myProfile-reducer"

console.log(myProfileReducer)

let myProfile =
  myProfileReducer !== ""
    ? myProfileReducer
    : localStorage.getItem("com.attender.pty.ltd.profile")

const rootReducer = combineReducers({
  myProfile: myProfile
})

export const history = createHistory()

const initialState = {}
const enhancers = []
const middleware = [thunk, routerMiddleware(history)]

if (process.env.NODE_ENV === "development") {
  const devToolsExtension = window.devToolsExtension

  if (typeof devToolsExtension === "function") {
    enhancers.push(devToolsExtension())
  }
}

const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers)

export default createStore(rootReducer, initialState, composedEnhancers)
