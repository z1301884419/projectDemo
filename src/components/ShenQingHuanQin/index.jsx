import {Form, Input} from "antd/lib/index";
import { Select,DatePicker } from 'antd';
import {inject,observer} from "mobx-react";
import {toJS} from 'mobx'
import React,{useEffect} from "react";
import HocForm from '../HocForm'
const { Option } = Select;
const { TextArea } = Input;

function ShenQingHuanQin(props) {
    //如mobx中没有宿舍的数据，则请求宿舍的数据
    useEffect(()=>{
      !toJS(props.susheStore.sushe).length>0&&props.susheStore.getSushe()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    let suSheList = toJS(props.susheStore.sushe)

    return(
        <Form
            form={props.form}
            name="ShenQingHuanQin"
            initialValues={props.thisInfo}
        >
          <Form.Item
              label="学生姓名："
              labelCol={{span: 5}}
              name="xingMing"
              className='input'
          >
            <Input disabled = {true}/>
          </Form.Item>
          <Form.Item
              label="当前寝室："
              labelCol={{span: 5}}
              name="qinShiMingCheng"
              className='input'
          >
            <Input disabled = {true} />
          </Form.Item>
          <Form.Item
              label="目标宿舍"
              labelCol={{span: 5}}
              name="diaoHuanSuSheId"
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

          <Form.Item
              label="申请时间："
              labelCol={{span: 5}}
              name="shiJian"
              className='input'
              rules={[{ required: true, message: '申请时间不能为空' }]}
          >
              <DatePicker placeholder='请选择日期'/>
          </Form.Item>

          <Form.Item
              label="换寝理由："
              labelCol={{span: 5}}
              name="huanQinLiYou"
              className='input'
              rules={[{ required: true, message: '换寝理由不能为空' }]}
          >
            <TextArea placeholder="请输入换寝理由" style={{height:'100px'}} />
          </Form.Item>

        {/*  隐藏当前寝室id和学生id（渲染不用）*/}
          <Form.Item
              label="学生id："
              labelCol={{span: 5}}
              name="xueShengId"
              className='input'
              style={{opacity:'0',height:'0px',border:'none'}}
          >
            <Input readOnly={true} style={{height:'0px',border:'none',cursor: 'default'}} />
          </Form.Item>
          <Form.Item
              label="原来宿舍id："
              labelCol={{span: 5}}
              name="yuanYouSuSheId"
              className='input'
              style={{opacity:'0',height:'0px',border:'none'}}
          >
            <Input readOnly={true} style={{height:'0px',border:'none',cursor: 'default'}} />
          </Form.Item>

        </Form>
    )
}
export default  HocForm('申请调换寝室','申请换寝','ADD_HUANQINJILU_POST','huanqinStore','getHuanqinJilu')(inject('susheStore')(observer(ShenQingHuanQin)))
