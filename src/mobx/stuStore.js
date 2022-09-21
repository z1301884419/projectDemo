import {makeAutoObservable} from 'mobx'
import * as request from '../utils/request'
export default class stuStore {
  constructor(){
    makeAutoObservable(this)
  }
  students = []
  getStudents = ()=>{
    return request.SELECTALL('ALL_STU_GET').then(res=>{
      if(res.data.code===200){
        this.students = [...res.data.list]
      }
      return
    })
  }
}