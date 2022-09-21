import {makeAutoObservable} from 'mobx'
import * as request from '../utils/request'
export default class susheStore {
  constructor(){
    makeAutoObservable(this)
  }
  sushe = []
  getSushe = ()=>{
    return request.SELECTALL('ALL_SUSHE_GET').then(res=>{
      if(res.data.code===200){
        this.sushe = [...res.data.list]
      }
      return
    })
  }
}