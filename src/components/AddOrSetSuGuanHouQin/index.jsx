import {Form, Input,DatePicker} from "antd"
import moment from 'moment'
import HocForm from '../HocForm'

function AddOrSetSuGuanHouQinFn(titel,btnText,requestURL,updateStore,updateFn) {
  function AddOrSetSuGuanHouQin(props) {
    console.log(props);
    return(
        <Form
            form={props.form}
            name="AddOrSetSuGuanHouQin"
            initialValues={{...props.thisInfo,shiJian:moment(new Date(),'YYYY-MM-DD')}}
        >
          <Form.Item
              label="姓名："
              labelCol={{span: 5}}
              name="xingMing"
              className='input'
              rules={[{ required: true, message: '请输入姓名' }]}
          >
            <Input placeholder="请输入姓名" />
          </Form.Item>
          <Form.Item
              label="账号："
              labelCol={{span: 5}}
              name="zhangHao"
              className='input'
              rules={[{ required: true, message: '请输入账号' }]}
          >
            <Input placeholder="请输入账号" />
          </Form.Item>
          <Form.Item
              label="密码："
              labelCol={{span: 5}}
              name="miMa"
              className='input'
              rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input placeholder="请输入密码" />
          </Form.Item>
          <Form.Item
              label="添加时间："
              labelCol={{span: 5}}
              name="shiJian"
              className='input hideHtml'
          >
            <DatePicker className='hideHtml' />
          </Form.Item>
        </Form>
    )
  }
  return  HocForm(titel,btnText,requestURL,updateStore,updateFn)(AddOrSetSuGuanHouQin)
}
export default AddOrSetSuGuanHouQinFn