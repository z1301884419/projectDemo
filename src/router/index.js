import {lazy} from 'react'
import Login from '../Login'
const Home = lazy(()=>import('../pages/Home'))
const StuInfo = lazy(()=>import('../pages/StuInfo'))
const SuSheGuanLi = lazy(()=>import('../pages/SuSheGuanLi'))
const SuGuanGuanLi = lazy(()=>import('../pages/SuGuanGuanLi'))
const HouQinGuanLi = lazy(()=>import('../pages/HouQinGuanLi'))
const SuSheWeiXiu = lazy(()=>import('../pages/SuSheWeiXiu'))
const StuJiLu = lazy(()=>import('../pages/StuJiLu'))

const router = [
  {
    path:'/login',
    name:'登录',
    component:Login,
    meta:{ require: false },
    role:['学生','管理员','宿管'],
  },
  {
    path:'/',
    name:'主页面',
    redirect:'/home',
    meta:{ require: false },
    role:['学生','管理员','宿管'],
  },
  {
    path:'/home',
    name:'首页',
    component:Home,
    meta:{ require: true },
    role:['学生','管理员','宿管'],
    redirect:'/home/stu',
    children:[
      {
        path:'/home/stu',
        name:'学生信息',
        component:StuInfo,
        meta:{ require: true },
        role:['学生','管理员','宿管'],
      },
      {
        path:'/home/sushe',
        name:'宿舍管理',
        component:SuSheGuanLi,
        meta:{ require: true },
        role:['学生','管理员','宿管'],
      },
      {
        path:'/home/suguan',
        name:'宿管管理',
        component:SuGuanGuanLi,
        meta:{ require: true },
        role:['学生','管理员','宿管'],
      },
      {
        path:'/home/houqin',
        name:'后勤管理',
        component:HouQinGuanLi,
        meta:{ require: true },
        role:['学生','管理员','宿管'],
      },
      {
        path:'/home/susheweixiu',
        name:'宿舍维修记录',
        component:SuSheWeiXiu,
        meta:{ require: true },
        role:['学生','管理员','宿管'],
      },
      {
        path:'/home/xueshengjilu',
        name:'学生记录管理',
        component:StuJiLu,
        meta:{ require: true },
        role:['学生','管理员','宿管'],
      },
    ]
  },

]
export default router