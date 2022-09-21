import {Form, Input} from "antd/lib/index";
import { Select } from 'antd';
import HocForm from '../HocForm'
const { Option } = Select;
const { TextArea } = Input;

function AddOrSetSuSheFn(titel,btnText,requestURL) {
  function AddOrSetSuShe(props) {
    return(
        <Form
            form={props.form}
            name="AddSuShe"
            initialValues={props.thisInfo}
        >
          <Form.Item
              label="宿舍编号："
              labelCol={{span: 5}}
              name="bianHao"
              className='input'
              rules={[{ required: true, message: '请输入宿舍编号' }]}
          >
            <Input placeholder="请输入宿舍编号" />
          </Form.Item>
          <Form.Item
              label="宿舍名称："
              labelCol={{span: 5}}
              name="mingCheng"
              className='input'
              rules={[{ required: true, message: '请输入宿舍名称' }]}
          >
            <Input placeholder="请输入宿舍名称" />
          </Form.Item>
          <Form.Item
              label="宿舍人数："
              labelCol={{span: 5}}
              name="renShu"
              className='input'
              rules={[{ required: true, message: '请输入宿舍人数' }]}
          >
            <Input placeholder="请输入宿舍人数" />
          </Form.Item>
          {/*如果是添加则显示*/}
          {btnText==='添加'?
              <Form.Item
                  label="宿舍状态"
                  labelCol={{span: 5}}
                  name="baoXiuZhuangTai"
                  className='input'
                  rules={[{ required: true, message: '请选择宿舍状态' }]}
              >
                <Select placeholder='请选择宿舍状态' style={{ width: 120 }}>
                  <Option value='维修中'>保修中</Option>
                  <Option value='正常使用'>正常使用</Option>
                </Select>
              </Form.Item>
              :''
          }

          <Form.Item
              label="财产配置："
              labelCol={{span: 5}}
              name="caiChanPeiZhi"
              className='input'
              rules={[{ required: true, message: '请输入宿舍财产配置' }]}
          >
            <TextArea placeholder="请输入宿舍财产配置" />
          </Form.Item>

        </Form>
    )
  }
  return  HocForm(titel,btnText,requestURL,'susheStore','getSushe')(AddOrSetSuShe)
}
export default AddOrSetSuSheFn