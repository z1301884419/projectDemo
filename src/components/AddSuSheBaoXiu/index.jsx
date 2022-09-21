import {Form, Input} from "antd/lib/index";
import HocForm from '../HocForm'

const { TextArea } = Input;

function AddSuSheBaoXiu(props) {
    return(
        <Form
            form={props.form}
            name="AddSuSheBaoXiu"
            initialValues={props.thisInfo}
        >
          <Form.Item
              label="报修内容："
              labelCol={{span: 5}}
              name="baoXiuNeiRong"
              className='input'
              rules={[{ required: true, message: '请输入宿舍报修内容' }]}
          >
            <TextArea placeholder="请输入宿舍报修内容" style={{height:'100px'}} />
          </Form.Item>

          <Form.Item
              label="报修人："
              labelCol={{span: 5}}
              name="suGuanName"
              className='input'
          >
            <Input readOnly={true}/>
          </Form.Item>
          {/*隐藏不需要渲染的html*/}
          <Form.Item
              label="报修人id："
              labelCol={{span: 5}}
              name="suGuanRenYuanId"
              className='input hideHtml'
          >
            <Input readOnly={true} className='hideHtml' />
          </Form.Item>

          <Form.Item
              label="宿舍id："
              labelCol={{span: 5}}
              name="suSheId"
              className='input hideHtml'
          >
            <Input readOnly={true} className='hideHtml'/>
          </Form.Item>
        </Form>
    )
}
export default HocForm('宿舍报修','宿舍报修','ADD_SUSHEBAOXIU_POST','susheStore','getSushe')(AddSuSheBaoXiu)
