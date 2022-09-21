import React,{useEffect} from 'react'
import {Button, Table,Input} from 'antd';
import {inject,observer} from "mobx-react";
import {toJS} from "mobx";
import SureAgain from '../../components/SureAgain'
import AddOrSetHouQinFn from "../../components/AddOrSetSuGuanHouQin";

const {Search} = Input
let AddHouQin = AddOrSetHouQinFn('添加后勤人员','添加','ADD_HOUQIN_POST','houqinStore','getHouqin')
let SetHouQin = AddOrSetHouQinFn('修改后勤人员','修改','SET_HOUQIN_POST','houqinStore','getHouqin')
let DelHouQin = SureAgain('houqinStore','getHouqin')
const columns = [
  {
    title: '后勤人员编号',
    width: 50,
    dataIndex: 'id',
    fixed: 'left',
    align:"center"
  },
  {
    title: '后勤姓名',
    width: 50,
    dataIndex: 'xingMing',
    fixed: 'left',
    align:"center"
  },
  {
    title: '后勤人员账号',
    dataIndex: 'zhangHao',
    width: 50,
    align:"center"
  },
  {
    title: '后勤人员创建时间',
    dataIndex: 'shiJian',
    key: 'id',
    width: 50,
    align:"center"
  },
  {
    title: '操作',
    width: 100,
    align:"center",
    render: (col) => {
      let {id} = col
      return(
          <div>
            <span className='btnText'><DelHouQin id={id} requestURL='DEL_HOUQIN_POST'/></span>
            <span className='btnText'><SetHouQin thisInfo={col}/></span>
          </div>
      )
    }
  },
];
function HouQinGuanLi(props) {
  //初始化后勤表格信息
  let houqinData = toJS(props.houqinStore.houqin).map(v => ({...v,key:v.id}))
  useEffect(()=>{
    toJS(props.houqinStore.houqin).length<1&&props.houqinStore.getHouqin()
  },[])// eslint-disable-line
  return(
      <div>
        <div>
          <Search
              placeholder="请输入后勤账号"
              allowClear
              enterButton
              size="large"
              style={{ width: 250 }}
          />
          <Button type="primary" size='large'><AddHouQin/></Button>
        </div>
        <br/>
        <Table
            columns={columns}
            dataSource={houqinData}
            pagination={{pageSize:5}}
        />
      </div>
  )
}
export default inject('houqinStore')(observer(HouQinGuanLi))