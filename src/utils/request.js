import axios from 'axios'
import * as api from './api'
const $axios = axios.create({
  baseURL:'http://192.168.2.228:8083',
  timeout:10000
})
export const LOGIN = (data)=>{
  return $axios({
    url:api.LOGIN_POST,
    method:'post',
    data
  })
} 