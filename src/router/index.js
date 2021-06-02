import Home from '../pages/Home'
import Login from '../Login'
const router = [
  {
    path:'/login',
    component:Login,
    meta:{ require: false }
  },
  {
    path:'/',
    component:Home,
    meta:{ require: true },
    quanXian:['学生','管理员','宿管'],
    redirect:'/home'
  },
  {
    path:'/home',
    component:Home,
    meta:{ require: true },
    quanXian:['学生','管理员','宿管'],
  },

]
export default router