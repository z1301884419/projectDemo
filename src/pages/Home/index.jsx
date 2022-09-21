import React from 'react'
import {Link,withRouter} from "react-router-dom";
import { Layout, Menu, Breadcrumb } from 'antd';
import {inject,observer} from "mobx-react";
import {
  InsertRowRightOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import './index.css'
import userStore from "../../mobx/userStore";

const { Header, Content, Sider } = Layout;

@inject('userStore')
@observer
class Home extends React.Component {
  state = {
    collapsed: false,
    pageTitle:'学生信息',
  };

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };
  exitLogin = ()=>{
    //退出登录
    sessionStorage.clear()
    this.props.userStore.setUser({isLogin:false,permissicon:''})
    this.props.history.replace('/login')
  }
  changeMenu = (item)=>{
    this.setState({ pageTitle:item.key });
  }
  render() {
    const { collapsed } = this.state;
    return (
        <Layout style={{ minHeight: '100vh' }}>
          <Header className="site-layout-background header" style={{ padding: 0 }}>
            学生宿舍管理系统
            <span className='btnText exit' onClick={this.exitLogin}>退出登录</span>
          </Header>
          <Layout className="site-layout">
            <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
              <div className="logo" />
              <Menu theme="dark" defaultSelectedKeys={['学生信息']} mode="inline" onClick={this.changeMenu}>
                <Menu.Item key="学生信息" icon={<TeamOutlined />}>
                  <Link to='/home/stu'/>
                    学生信息
                </Menu.Item>
                <Menu.Item key="宿舍管理" icon={<InsertRowRightOutlined />}>
                  <Link to='/home/sushe'/>
                    宿舍管理
                </Menu.Item>
                <Menu.Item key="宿管管理" icon={<TeamOutlined />}>
                  <Link to='/home/suguan'/>
                    宿管管理
                </Menu.Item>
                <Menu.Item key="后勤管理" icon={<UserOutlined />}>
                  <Link to='/home/houqin'/>
                    后勤管理
                </Menu.Item>
                <Menu.Item key="宿舍维修记录" icon={<FileOutlined />}>
                  <Link to='/home/susheweixiu'/>
                    宿舍维修记录
                </Menu.Item>
                <Menu.Item key="学生记录管理" icon={<FileOutlined />}>
                  <Link to='/home/xueshengjilu'/>
                    学生记录管理
                </Menu.Item>
              </Menu>
            </Sider>
            <Content style={{ margin: '0 15px' }}>
              <Breadcrumb style={{ margin: '20px 25px 0 25px',fontSize:'20px' }}>
                <Breadcrumb.Item>首页</Breadcrumb.Item>
                <Breadcrumb.Item>{this.state.pageTitle}</Breadcrumb.Item>
              </Breadcrumb>
              <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                {/*这里面显示每个路由*/}
                {this.props.children}
              </div>
            </Content>
          </Layout>
        </Layout>
    );
  }
}
export default withRouter(Home)