import React from 'react'
import { Form, Input, Button, Checkbox,Select } from 'antd/lib/index';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {inject,observer} from "mobx-react";
import {toJS} from 'mobx'
import * as request from '../utils/request'
import {setStorage} from "../utils/storage";

import './index.css'
const { Option } = Select;

function Login(props){
  //表单提交的事件
  const onFinish = (values) => {
    //请求登录
    request.LOGIN(values).then(res=>{
      //登录成功，保存信息
      if(res.data.code===200){
        setStorage('user',res.data)
        let user = toJS(props.userStore.user)
        props.userStore.setUser({...user,isLogin:true,permissicon:res.data.quanXian})
        //跳转页面
        props.history.push('/')
      }
    })
  };

  return (
    <div className='login'>
      <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      >
        <Form.Item
          label="账号："
          labelCol={{span: 5}}
          name="zhangHao"
          className='input'
          rules={[{ required: true, message: '请输入账号' }]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          label="密码"
          labelCol={{span: 5}}
          name="miMa"
          className='input'
          rules={[{ required: true, message: '请输入密码' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item
        label=' '
        colon={false}
        labelCol={{span: 5}}
        name='quanXian'
        className="input"
        rules={[{ required: true, message: '请选择权限' }]}
        >
        <Select  placeholder="请选择身份" style={{ width: 150 }}>
          <Option value="学生">学生</Option>
          <Option value="宿管">宿管</Option>
          <Option value="管理员">管理员</Option>
        </Select>
        </Form.Item>
        <Form.Item
          label=" "
          colon={false}
          labelCol={{span: 5}}
        >
          <Form.Item 
          name="remember" 
          valuePropName="checked"
          noStyle
          >
            <Checkbox>记住我</Checkbox>
          </Form.Item>
          <span style={{color:"rgb(24,144,255)",marginLeft:'150px'}}>忘记密码?</span>
        </Form.Item>

        <Form.Item
          label=" "
          colon={false}
          labelCol={{span:4}}
        >
          <Button style={{width:'80%'}} type="primary" htmlType="submit" className="login-form-button">
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
export default inject('userStore')(observer(Login))