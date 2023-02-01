import axios from 'axios'

axios.defaults.baseURL = process.env.REACT_APP_API_ENDPOINT;
console.log(process.env.REACT_APP_API_ENDPOINT);

export const axiosGet = (url, params = {}) => (
  axios.get(url, {
    params,
  })
)

export const axiosPost = (url, params = {}) => (
  axios.post(url, params)
)

export const callGet = (url, token, params = {}) => (
  axios.get(url, {
    headers: {
      'x-access-token': token,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    params,
  })
)

export const callPost = (url, payload, token) => (
  axios.post(url, payload, {
    headers: {
      'x-access-token': token,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  })
)
