import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  UPDATE_CARD,
  CHANGE_BACKMODE
} from '../actionTypes/auth'

let user = JSON.parse(localStorage.getItem('user'))
export const initialState = {
  token: '',
  user: user,
  logged: user ? true : false,
  backMode:"dark",
}

const auth = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        logged: true,
      }
    case LOGIN_FAIL:
      return {
        ...state,
        logged: false,
      }
    case LOGOUT:
      return {
        ...state,
        logged: false,
      }
    case UPDATE_CARD:
      return {
        ...state,
        user: {...user, card:action.payload}
      }
    case CHANGE_BACKMODE:
      return {
        ...state,
        backMode:action.payload
      }
    default:
      return state
  }
}
export default auth