// 要录用登录者的身份 来渲染组件
import React from 'react'
import { inject, observer } from 'mobx-react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { toJS } from 'mobx'

import {getStorage} from '../utils/storage'
import Permission from '../pages/Permission'

@inject('userStore')
@observer
class PrivateRouter extends React.Component {
  util = (routerList) => routerList.map( route => {
    if (route.meta && route.meta.require) {
      // 这个花括号里面代表需要登录
      if (this.props.userStore.user.isLogin) {
        let userStore = toJS(this.props.userStore)
        const premissicons = userStore.user.permissicon
        const roles = route.role
        if (roles.includes(premissicons)) {
          // 有权限进入
          if (route.children) {

            return <Route key={route.name} path={route.path} render={() =>
                <route.component>
                  {this.util(route.children)}
                  <Route key={route.name} path={route.path} render={() => <Redirect to={route.redirect}></Redirect>}></Route>
                </route.component>
            }></Route>
          } else {
            return <Route key={route.name} path={route.path} component={route.component}></Route>
          }
        } else {
          // 没有权限进入
          return <Route key={route.name} path={route.path} component={Permission}></Route>
        }
      } else {
        return <Redirect key={route.name} to='/login'></Redirect>
      }
    } else if (route.redirect) {
      // 这个里不需要登录 并且这个对象需要重定向
      return <Route key={route.name} path={route.path} exact render={() => <Redirect to={route.redirect}></Redirect>}></Route>
    } else {
      // 这个里不需要登录 并且也不需要重定向
      return <Route key={route.name} path={route.path} component={route.component}></Route>
    }
  })
  render() {
    //如果用户手动刷新页面，mobx丢失了状态，则重新从storage中获取
    if(!toJS(this.props.userStore.user).isLogin&&getStorage('user')){
      this.props.userStore.setUser({isLogin:true,permissicon:getStorage('user').quanXian})
    }
    let { routers } = this.props
    return (
      <Switch>
        {this.util(routers)}
      </Switch>
    )
  }
}
export default PrivateRouter