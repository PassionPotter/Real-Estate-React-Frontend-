import {
  ACTION_PROPERTY_GET,
  ACTION_PROPERTY_GET_FAIL,
  ACTION_PROPERTY_LIST,
  ACTION_PROPERTY_LIST_FAIL,
  ACTION_PROPERTY_ADD,
  ACTION_PROPERTY_UPDATE,
  ACTION_SELL_TOKEN_PROPERTIES_LIST,
  ACTION_SELL_TOKEN_PROPERTIES_LIST_FAIL
} from '../actionTypes/property'

export const initialState = {
  propertyData: [],
  currentHouse: {},
  sellTokenProperties: []
}

const property = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_PROPERTY_GET:
      return {
        ...state,
        currentHouse: action.payload,
      }
    case ACTION_PROPERTY_GET_FAIL:
      return {
        ...state,
        currentHouse: {},
      }
    case ACTION_PROPERTY_LIST:
      return {
        ...state,
        propertyData: action.payload,
      }
    case ACTION_PROPERTY_LIST_FAIL:
      return {
        ...state,
        propertyData: [],
      }
    case ACTION_SELL_TOKEN_PROPERTIES_LIST:
      return {
        ...state,
        sellTokenProperties: action.payload,
      }
    case ACTION_SELL_TOKEN_PROPERTIES_LIST_FAIL:
      return {
        ...state,
        sellTokenProperties: [],
      }
    case ACTION_PROPERTY_ADD:
      return {
        ...state,
        propertyData: [action.payload, ...state.propertyData] //state.propertyData.push(action.payload),
      }
    case ACTION_PROPERTY_UPDATE:
      return {
        ...state,
        propertyData: state.propertyData.map(property=>{
          if(property.id===action.payload.id){
            // console.log('updateid', action.payload.id);
            return {...property, ...action.payload};
          }
          return property;
        })
      }
    default:
      return state
  }
}
export default property