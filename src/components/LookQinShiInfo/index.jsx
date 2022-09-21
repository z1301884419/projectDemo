import {Form, Input} from "antd/lib/index";
import { Select } from 'antd';
import HocForm from '../HocForm'
const { Option } = Select;
const { TextArea } = Input;

function LookQinShi(props) {
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
          >
            <Input readOnly={true}/>
          </Form.Item>
          <Form.Item
              label="宿舍名称："
              labelCol={{span: 5}}
              name="mingCheng"
              className='input'
          >
            <Input readOnly={true}/>
          </Form.Item>
          <Form.Item
              label="宿舍人数："
              labelCol={{span: 5}}
              name="renShu"
              className='input'
          >
            <Input readOnly={true}/>
          </Form.Item>
          <Form.Item
              label="实际人数："
              labelCol={{span: 5}}
              name="shiJiRenShu"
              className='input'
          >
            <Input readOnly={true}/>
          </Form.Item>
          <Form.Item
              label="宿舍状态"
              labelCol={{span: 5}}
              name="baoXiuZhuangTai"
              className='input'
          >
            <Select disabled={true} style={{ width: 120 }}>
              <Option value='保修中'>保修中</Option>
              <Option value='正常使用'>正常使用</Option>
            </Select>
          </Form.Item>
          <Form.Item
              label="财产配置："
              labelCol={{span: 5}}
              name="caiChanPeiZhi"
              className='input'
          >
            <TextArea readOnly={true}/>
          </Form.Item>

        </Form>
    )
  }
  export default  HocForm('寝室信息','查看寝室信息',null)(LookQinShi)