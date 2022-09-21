import {Form, Input} from "antd/lib/index";
import { Select ,DatePicker } from 'antd';
import React from "react";
import HocForm from '../HocForm'
const { Option } = Select;

function AddBiaoXianJiLu(props) {
    return(
        <Form
            form={props.form}
            name="AddBiaoXianJiLu"
            initialValues={props.thisInfo}
        >
          <Form.Item
              label="学生姓名："
              labelCol={{span: 5}}
              name="xingMing"
              className='input'
          >
            <Input readOnly={true} />
          </Form.Item>
          <Form.Item
              label="学生学号："
              labelCol={{span: 5}}
              name="xueHao"
              className='input'
          >
            <Input readOnly={true} />
          </Form.Item>
          <Form.Item
              label="选择类型"
              labelCol={{span: 5}}
              name="leiXing"
              className='input'
              rules={[{ required: true, message: '请选择类型' }]}
          >
            <Select placeholder='请选择类型' style={{ width: 120 }}>
              <Option value='缺勤记录'>缺勤记录</Option>
              <Option value='晚归记录'>晚归记录</Option>
              <Option value='离校记录'>离校记录</Option>
            </Select>
          </Form.Item>
          <Form.Item
              label="记录时间："
              labelCol={{span: 5}}
              name="shiJian"
              className='input'
              rules={[{ required: true, message: '请选择记录时间' }]}
          >
            <DatePicker placeholder='请选择时间' />
          </Form.Item>
          {/*隐藏不需要渲染的项*/}
          <Form.Item
              label="学生id："
              labelCol={{span: 5}}
              name="xueShengId"
              className='input hideHtml'
          >
            <Input readOnly={true} className='hideHtml' />
          </Form.Item>

        </Form>
    )
}
export default HocForm('添加学生记录','添加学生记录','ADD_BIAOXIANJILU_POST','stujiluStore','getStuJiLu')(AddBiaoXianJiLu)
