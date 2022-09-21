import {makeAutoObservable} from 'mobx'
import * as request from '../utils/request'
export default class huanqinStore {
  constructor(){
    makeAutoObservable(this)
  }
  huanqinJilu = []
  getHuanqinJilu = ()=>{
    return request.SELECTALL('ALL_HUANQIN_GET').then(res=>{
      if(res.data.code===200){
        this.huanqinJilu =[...res.data.list]
      }
      return
    })
  }
}