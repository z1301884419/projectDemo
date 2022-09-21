
import {makeAutoObservable} from 'mobx'
import * as request from '../utils/request'
export default class suguanStore {
  constructor(){
    makeAutoObservable(this)
  }
  suguan = []
  getSuguan = ()=>{
    return request.SELECTALL('ALL_SUGUAN_GET').then(res=>{
      if(res.data.code===200){
        this.suguan = [...res.data.list]
      }
    })
  }
}