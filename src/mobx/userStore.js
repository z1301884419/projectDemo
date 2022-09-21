import {makeAutoObservable} from 'mobx'
export default class userStore {
  constructor(){
    makeAutoObservable(this)
  }
  user = {
    isLogin:false,
    permissicon:''
  }
  setUser = (user)=>{
    this.user = {...user}
  }
}