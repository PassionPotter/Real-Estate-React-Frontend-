import {
    ACTION_SITESETTINGS_GET,
    ACTION_SITESETTINGS_GET_FAIL,
    ACTION_SITESETTINGS_LIST,
    ACTION_SITESETTINGS_LIST_FAIL,
    ACTION_SITESETTINGS_ADD,
  } from '../actionTypes/sitesettings'
  
  export const initialState = {
    sitesettingsData: [],
    currentSitesettings: {},
  }
  
  const credential = (state = initialState, action) => {
    switch (action.type) {
      case ACTION_SITESETTINGS_GET:
        return {
          ...state,
          currentSitesettings: action.payload,
        }
      case ACTION_SITESETTINGS_GET_FAIL:
        return {
          ...state,
          currentSitesettings: {},
        }
      case ACTION_SITESETTINGS_LIST:
        return {
          ...state,
          sitesettingsData: action.payload,
        }
      case ACTION_SITESETTINGS_LIST_FAIL:
        return {
          ...state,
          sitesettingsData: [],
        }
      case ACTION_SITESETTINGS_ADD:
        return {
          ...state,
          sitesettingsData: [...state.sitesettingsData, action.payload] 
        }
      default:
        return state
    }
  }
  export default credential