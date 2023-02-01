import {
    ACTION_HOWWORKS_ADD,
    ACTION_HOWWORKS_LIST,
    ACTION_HOWWORKS_LIST_FAIL,
    ACTION_HOWWORKS_GET,
    ACTION_HOWWORKS_GET_FAIL,
    ACTION_HOWWORKS_UPDATE
  } from '../actionTypes/howworks'
  
  import { callGet, callPost, } from '../../services/axios'
  import { Notification } from 'element-react'
  
  const token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))['accessToken'] : null
  
  export const actionHowworksCreate = (howworksData) => (dispatch) => {
    callPost('/api/admin/howworks', howworksData, token)
      .then((response) => {
        Notification.success({
          title: 'Success',
          message: 'House Properties Submit Success!',
          type: 'success',
        })
        dispatch({
          type: ACTION_HOWWORKS_ADD,
          payload: howworksData,
        })
      }).catch(err => {
        console.log(err);
        Notification.error({
          title: 'Failed',
          message: 'Please try again.',
          type: 'Warning',
        })
      }
    )
  }
  
  export const actionHowworksList = (count) => (dispatch) => {
    return callGet(`/api/howworks?count=${count}`)
      .then(function (response) {
        let result = response.data
        dispatch({
          type: ACTION_HOWWORKS_LIST,
          payload: result,
        })
      })
      .catch((error) => {
        dispatch({
          type: ACTION_HOWWORKS_LIST_FAIL,
        })
      }
    )
  }
  
  export const actionHowworksGet = (ID) => (dispatch) => {
    return callGet(`/api/howworks/id?ID=${ID}`)
      .then(function (response) {
        let result = response.data
        console.log(result);
        return dispatch({
          type: ACTION_HOWWORKS_GET,
          payload: result,
        })
      })
      .catch((error) => {
        return dispatch({
          type: ACTION_HOWWORKS_GET_FAIL,
        })
      }
    )
  }
  export const actionHowworksUpdate = (howworksData) => (dispatch) => {
  
    return callPost('/api/admin/howworks/update', howworksData, token)
    .then((res) => {
      Notification.success({
        title: 'Success',
        message: 'How work data Update Success!',
        type: 'success',
      })
      return dispatch({
        type:ACTION_HOWWORKS_UPDATE,
        payload:res,
      })
      
    });
  }