
import {makeAutoObservable} from 'mobx'
import * as request from '../utils/request'
export default class houqinStore {
  constructor(){
    makeAutoObservable(this)
  }
  houqin = []
  getHouqin = ()=>{
    return request.SELECTALL('ALL_HOUQIN_GET').then(res=>{
      if(res.data.code===200){
        this.houqin = [...res.data.list]
      }
    })
  }
}