import axios from 'axios'
import * as api from './api'
const $axios = axios.create({
  baseURL:'http://192.168.1.23:8083',
  timeout:10000
})
//登录
export const LOGIN = (data)=>{
  return $axios({
    url:api.LOGIN_POST,
    method:'post',
    data
  })
}
//查询所有的请求
export const SELECTALL = (url)=>{
  return $axios({
    url:api[url],
    method:'GET',
  })
}
//添加和修改的请求
export const ADDORSET = (url,data)=>{
  return $axios({
    url:api[url],
    method:'POST',
    data
  })
}
//删除的请求
export const DELECTED = (url,id)=>{
  return $axios({
    url:api[url],
    method:'POST',
    params:{
      id
    }
  })
}
//查询单个学生表现记录
export const ONESTUJILU = (xueShengId)=>{
  return $axios({
    url:api.ALL_STUJILU_GET,
    method:'GET',
    params:{
      xueShengId
    }
  })
}







