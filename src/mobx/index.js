import user from './userStore'
import stu from './stuStore'
import sushe from './susheStore'
import huanqin from './huanqinStore'
import suguan from './suguanStore'
import houqin from './houqinStore'
import susheweixiu from './susheweixiuStore'
import stujilu from './stujiluStore'
const store = {
  userStore:new user(),
  stuStore:new stu(),
  susheStore:new sushe(),
  huanqinStore:new huanqin(),
  suguanStore:new suguan(),
  houqinStore:new houqin(),
  susheweixiuStore:new susheweixiu(),
  stujiluStore:new stujilu(),
}
export default store