import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  UPDATE_CARD,
  CHANGE_BACKMODE,
} from '../actionTypes/auth'

import {
  axiosGet,
  axiosPost,
} from '../../services/axios'
import { Notification } from 'element-react'

export const actionAuthLogin = (userData) => (dispatch) => {
  axiosPost('/api/auth/signin', userData)
    .then(function (response) {
      Notification.success({
        title: 'Success',
        message: 'login success!',
        type: 'success'
      })
      // saving localstorage data with user data
      console.log(response.data, ' &&&&&&&&&&&&&&&&&&&&&&&&&&&&')
      localStorage.setItem('user', JSON.stringify(response.data))
      dispatch({
        type: LOGIN_SUCCESS, payload: response.data
      })
    })
    .catch((error) => {
      console.log(error);
      if (error.response.status === 404) {
        Notification.error({
          title: 'Failed',
          message: 'User not fwwound!',
          type: 'Warning',
        })
      } else if (error.response.status === 401) {
        Notification.error({
          title: 'Failed',
          message: 'Invalid password!',
          type: 'Warning',
        })
      } else if (error.response.status === 402) {
        Notification.error({
          title: 'Failed',
          message: 'Not activated yet!',
          type: 'Warning',
        })
      } else {
        Notification.error({
          title: 'Failed',
          message: 'Try again!',
          type: 'Warning',
        })
      }
      dispatch({
        type: LOGIN_FAIL,
      })
    }
    )
}
export const actionAuthRegister = (userData) => (dispatch) => {
  axiosPost('/api/auth/signup', userData)
    .then((response) => {
      Notification.success({
        title: 'Success',
        message: 'Register success. Verification Email is just sent. Please check your email!',
        type: 'success'
      })
      dispatch({
        type: LOGOUT,
      })

    })
    .catch((error) => {
      if (error.response.status === 400) {
        Notification.error({
          title: 'Failed',
          message: 'User name or Email is already in use.',
          type: 'Warning'
        });
      } else if (error.response.status === 500) {
        Notification.error({
          title: 'Failed',
          message: 'Please try again.',
          type: 'Warning'
        })
      }
      dispatch({
        type: LOGOUT,
      })
    })
}
export const actionAuthActivate = (verificationString) => (dispatch) => {
  const url = `/api/auth/verify/${verificationString}`
  axiosGet(url)
    .then((response) => {
      Notification.success({
        title: 'Success',
        message: response.data.message,
        type: 'success',
      })
    })
    .catch((error) => {
      if (error.response.status === 404) {
        Notification.error({
          title: 'Failed',
          message: 'User not found!',
          type: 'Warning',
        })
      } else {
        Notification.error({
          title: 'Failed',
          message: error.response.data.message,
          type: 'Warning',
        })
      }
    })
}
export const actionAuthResetPassword = (userData) => (dispatch) => {
  axiosPost('/api/auth/resetPassword', userData)
    .then((response) => {
      console.log(response)
      Notification.success({
        title: 'Success',
        message: 'Your password has been changed. Please check your email!',
        type: 'success',
      })
    })
    .catch((error) => {
      console.log(error)
      Notification.error({
        title: 'Failed',
        message: 'Failed to reset password!',
        type: 'warning',
      })
    })
}

export const actionAuthResetNewPassword = (userData) => (dispatch) => {
  axiosPost('/api/auth/resetNewPassword', userData)
    .then((response) => {
      console.log(response)
      if (response?.data?.errorMessage) {
        Notification.error({
          title: 'Failed',
          message: response?.data?.message,
          type: 'warning',
        })
      }
      else {
        Notification.success({
          title: 'Success',
          message: 'Your password has been changed. Please check your email!',
          type: 'success',
        })
      }

    })
    .catch((error) => {
      Notification.error({
        title: 'Failed',
        message: 'Failed to reset password!',
        type: 'warning',
      })
    })
}

export const actionAuthLogout = () => (dispatch) => {
  localStorage.removeItem('user');
  localStorage.removeItem('cartProducts');
  dispatch({
    type: LOGOUT,
  })
}

export const actionAuthUpdateCard = (card) => dispatch => {
  console.log('auth card update');
  dispatch({
    type: UPDATE_CARD,
    payload: card
  })
}

export const actionSetBackMode = (mode) => dispatch => {
  if(mode == "dark") {
    document.documentElement.style.setProperty("--back-color", "#252730");
    document.documentElement.style.setProperty("--text-color", "#fff");
    document.documentElement.style.setProperty("--secondary-color", "#786e64");
  }
  if(mode == "light") {
    document.documentElement.style.setProperty("--back-color", "#F0EEEB");
    document.documentElement.style.setProperty("--text-color", "#252730");
    document.documentElement.style.setProperty("--secondary-color", "#F0EEEB");
  }
  dispatch({
    type:CHANGE_BACKMODE,
    payload:mode,
  })
}