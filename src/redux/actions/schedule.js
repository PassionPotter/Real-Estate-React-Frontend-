import {
  ACTION_SCHEDULE_LIST,
  ACTION_SCHEDULE_SET_CURRENT,
  ACTION_SCHEDULE_LIST_FAIL
} from '../actionTypes/schedule'
import { callGet, callPost, } from '../../services/axios'
import { Notification } from 'element-react'

const token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))['accessToken'] : null

export const actionScheduleList = () => (dispatch) => {
  return callGet(`/api/admin/schedules`)
    .then(function (response) {
      let result = response.data
      dispatch({
        type: ACTION_SCHEDULE_LIST,
        payload: result,
      })
    })
    .catch((error) => {
      dispatch({
        type: ACTION_SCHEDULE_LIST_FAIL,
      })
    }
    )
}
export const rentcalculation = () => (dispatch) => {
  return callGet(`/api/admin/rent`)
    .then(function (response) {
      let result = response.data
      dispatch({
        type: ACTION_SCHEDULE_LIST,
        payload: result,
      })
    })
    .catch((error) => {
      dispatch({
        type: ACTION_SCHEDULE_LIST_FAIL,
      })
    }
    )
}

export const actionScheduleSetCurrent = (schedule) => (dispatch) => {
  dispatch({
    type: ACTION_SCHEDULE_SET_CURRENT,
    payload: schedule
  })
}