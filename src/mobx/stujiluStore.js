import {makeAutoObservable} from 'mobx'
import * as request from '../utils/request'
export default class stujiluStore {
  constructor(){
    makeAutoObservable(this)
  }
  stujilu = []
  getStuJiLu = ()=>{
    return request.SELECTALL('ALL_STUJILU_GET').then(res=>{
      if(res.data.code===200){
        this.stujilu = [...res.data.list]
      }
      return
    })
  }
}