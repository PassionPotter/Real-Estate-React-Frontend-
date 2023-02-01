import {
    ACTION_HOWWORKS_GET,
    ACTION_HOWWORKS_GET_FAIL,
    ACTION_HOWWORKS_LIST,
    ACTION_HOWWORKS_LIST_FAIL,
    ACTION_HOWWORKS_ADD,
    ACTION_HOWWORKS_UPDATE
  } from '../actionTypes/howworks'
  
  export const initialState = {
    howworksData: [],
    currenthowworks: {},
  }
  
  const howworks = (state = initialState, action) => {
    switch (action.type) {
      case ACTION_HOWWORKS_GET:
        return {
          ...state,
          currenthowworks: action.payload,
        }
      case ACTION_HOWWORKS_GET_FAIL:
        return {
          ...state,
          currenthowworks: {},
        }
      case ACTION_HOWWORKS_LIST:
        return {
          ...state,
          howworksData: action.payload,
        }
      case ACTION_HOWWORKS_LIST_FAIL:
        return {
          ...state,
          howworksData: [],
        }
      case ACTION_HOWWORKS_ADD:
        return {
          ...state,
          howworksData: [...state.howworksData, action.payload] 
        }
      case ACTION_HOWWORKS_UPDATE:
        return {
          ...state,
          howworksData: state.howworksData.map(howwork=>{
            if(howwork.id===action.payload.id){
              // console.log('updateid', action.payload.id);
              return {...howwork, ...action.payload};
            }
            return howwork;
          })
        }
      default:
        return state
    }
  }
  export default howworks