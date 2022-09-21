function newDate(time){
  let d = new Date(time)
  let newTime= d.getFullYear() + '-'
      + (d.getMonth() + 1) + '-'
      + d.getDate() + ' '
      + d.getHours() + ':'
      + d.getMinutes() + ':'
      + d.getSeconds();
  return newTime
}
export default  newDate