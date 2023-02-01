import {
    ACTION_SCHEDULE_LIST,
    ACTION_SCHEDULE_SET_CURRENT,
    ACTION_SCHEDULE_LIST_FAIL
  } from '../actionTypes/schedule'

  export const initialState = {
    scheduleList: [],
    currentSchedule: {}
  }

  const schedule = (state = initialState, action) => {
    switch (action.type) {
      case ACTION_SCHEDULE_LIST:
        return {
          ...state,
          scheduleList: action.payload,
        }
      case ACTION_SCHEDULE_LIST_FAIL:
        return {
          ...state,
          scheduleList: [],
        }
      case ACTION_SCHEDULE_SET_CURRENT:
        return {
          ...state,
          currentSchedule: action.payload
        }
      default:
        return state
    }
  }
  export default schedule