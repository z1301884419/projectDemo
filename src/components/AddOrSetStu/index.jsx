import {Form, Input} from "antd/lib/index";
import { Select } from 'antd';
import {inject,observer} from "mobx-react";
import {toJS} from 'mobx'
import React,{useEffect} from "react";
import HocForm from '../HocForm'
const { Option } = Select;

function AddOrSetStu(titel,btnText,requestURL) {
  function AddStu(props) {
    //如mobx中没有宿舍的数据，则请求宿舍的数据
    useEffect(()=>{
      !toJS(props.susheStore.sushe).length>0&&props.susheStore.getSushe()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    let suSheList = toJS(props.susheStore.sushe)

    return(
        <Form
            form={props.form}
            name="AddStu"
            initialValues={props.thisInfo}
        >
          <Form.Item
              label="学生姓名："
              labelCol={{span: 5}}
              name="xingMing"
              className='input'
              rules={[{ required: true, message: '请输入姓名' }]}
          >
            <Input placeholder="请输入姓名" />
          </Form.Item>
          <Form.Item
              label="学生账号："
              labelCol={{span: 5}}
              name="zhangHao"
              className='input'
              rules={[{ required: true, message: '请输入账号' }]}
          >
            <Input placeholder="请输入账号" />
          </Form.Item>
          <Form.Item
              label="学生密码："
              labelCol={{span: 5}}
              name="miMa"
              className='input'
              rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input placeholder="请输入密码" />
          </Form.Item>
          <Form.Item
              label="学生院系"
              labelCol={{span: 5}}
              name="yuanXi"
              className='input'
              rules={[{ required: true, message: '请输入院系' }]}
          >
            <Input placeholder="请输入院系" />
          </Form.Item>
          <Form.Item
              label="学生班级"
              labelCol={{span: 5}}
              name="banJi"
              className='input'
              rules={[{ required: true, message: '请输入班级' }]}
          >
            <Input placeholder="请输入班级" />
          </Form.Item>
          <Form.Item
              label="选择宿舍"
              labelCol={{span: 5}}
              name="suSheId"
              className='input'
              rules={[{ required: true, message: '请选择宿舍' }]}
          >
            {/*查询所有宿舍数据，渲染*/}
            <Select placeholder='请选择宿舍' style={{ width: 120 }}>
              {suSheList.map(v=>{
                return(
                    <Option key={v.id} value={v.id}>{v.mingCheng}</Option>
                )
              })}
            </Select>
          </Form.Item>

        </Form>
    )
  }
  return  HocForm(titel,btnText,requestURL,'stuStore','getStudents')(inject('susheStore')(observer( AddStu)))
}
export default AddOrSetStu