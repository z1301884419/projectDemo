import {makeAutoObservable} from 'mobx'
import * as request from '../utils/request'
export default class susheweixiuStore {
  constructor(){
    makeAutoObservable(this)
  }
  susheweixiu = []
  getSusheWeixiu = ()=>{
    return request.SELECTALL('ALL_SUSHEWEIXIU_GET').then(res=>{
      if(res.data.code===200){
        this.susheweixiu =[...res.data.list]
      }
      return
    })
  }
}