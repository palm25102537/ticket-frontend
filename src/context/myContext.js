import { useContext, createContext, useReducer, useState } from "react";
import service from '../service/localStorageService'


const myContext = createContext()

const { setToken, getToken, clearToken } = service

const INITIAL_STATE = {
  authen: getToken(),
}

function authenByReducer(state, action) {
  switch (action.type) {
    case 'getToken': {
      setToken(action.token)
      return { authen: action.token }
    }
    case 'clearToken': {
      clearToken()
      return { authen: getToken() }
    }
    default: return state
  }

}
function Provider(props) {
  const [state, dispatch] = useReducer(authenByReducer, INITIAL_STATE)
  const [troggle, setTroggle] = useState(false)
  const provide = { state, dispatch, troggle, setTroggle }
  return (
    <myContext.Provider value={provide}>{props.children}</myContext.Provider>
  )
}

function useMyContext() {
  const context = useContext(myContext)
  return context
}

export { Provider, useMyContext }