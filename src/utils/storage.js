export const setStorage = (key,value)=>{
  value = JSON.stringify(value)
  sessionStorage.setItem(key,value)
}
export const getStorage  = (key)=>{
  let value = sessionStorage.getItem(key)
  return JSON.parse(value)
}