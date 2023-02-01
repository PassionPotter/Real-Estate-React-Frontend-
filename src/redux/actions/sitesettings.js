import {
    ACTION_SITESETTINGS_ADD,
    ACTION_SITESETTINGS_LIST,
    ACTION_SITESETTINGS_LIST_FAIL,
    ACTION_SITESETTINGS_GET,
    ACTION_SITESETTINGS_GET_FAIL,
  } from '../actionTypes/sitesettings'
  
  import { callGet, callPost, } from '../../services/axios'
  import { Notification } from 'element-react'
  
  let token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))['accessToken'] : null

  
  export const actionSitesettingsList = (count) => (dispatch) => {
    return callGet(`/api/site`)
      .then(function (response) {
        let result = response.data;
        dispatch({
          type: ACTION_SITESETTINGS_LIST,
          payload: result,
        })
      })
      .catch((error) => {
        dispatch({
          type: ACTION_SITESETTINGS_LIST_FAIL,
        })
      }
      )
  }
  
  
  export const actionSitesettingsUpdate = (sitesettingsData) => dispatch => {
    token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))['accessToken'] : null
    callPost('/api/admin/site', sitesettingsData, token)
      .then((response) => {
        Notification.success({
          title: 'Success',
          message: 'Site settings Update Success!',
          type: 'success',
        })
      }).catch(err => {
        console.log(err);
        Notification.error({
          title: 'Failed',
          message: 'Site settings update failed. Please try again.',
          type: 'Warning',
        })
      }
      )
  }