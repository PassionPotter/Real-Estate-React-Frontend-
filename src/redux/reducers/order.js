import {
  ACTION_ORDER_GET,
  ACTION_ORDER_GET_FAIL,
  ACTION_ORDER_LIST,
  ACTION_ORDER_LIST_FAIL,
  ACTION_ORDER_ADD,
  ACTION_USER_ORDER_GET,
  ACTION_ORDER_WHITELIST,
  ACTION_ORDER_WHITELIST_FAIL,
  ACTION_ORDER_OLD_OWNER_FAIL,
  ACTION_ORDER_OLD_OWNER
} from '../actionTypes/order'

export const initialState = {
  orderData: [],
  orderWhiteList:[],
  currentOrder: {},
  userOrder:[],
  orderOwnerList:[]
}

const order = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_ORDER_GET:
      return {
        ...state,
        currentOrder: action.payload,
      }
    case ACTION_ORDER_GET_FAIL:
      return {
        ...state,
        currentOrder: {},
      }
    case ACTION_ORDER_LIST:
      return {
        ...state,
        orderData: action.payload,
      }
    case ACTION_ORDER_LIST_FAIL:
      return {
        ...state,
        orderData: [],
      }
    case ACTION_ORDER_WHITELIST:
      return {
        ...state,
        orderWhiteList: action.payload,
      }
    case ACTION_ORDER_OLD_OWNER:
      return {
        ...state,
        orderOwnerList: action.payload
      }
    case ACTION_ORDER_OLD_OWNER_FAIL:
      return {
        ...state,
        orderOwnerList: []
      }
    case ACTION_ORDER_WHITELIST_FAIL:
      return {
        ...state,
        orderWhiteList: [],
      }
    case ACTION_ORDER_ADD:
      return {
        ...state,
        orderData: [...state.orderData, action.payload] 
      }
    case ACTION_USER_ORDER_GET:
      return {
        ...state,
        userOrder: action.payload
      }
    default:
      return state
  }
}
export default order