import React,{useEffect} from 'react'
import {Button, Table, Input} from 'antd';
import {inject,observer} from "mobx-react";
import {toJS} from "mobx";
import SureAgainFn from '../../components/SureAgain'
import AddOrSetSuGuanFn from "../../components/AddOrSetSuGuanHouQin";

const { Search } = Input;
//调用函数生成对应的组件
let AddSuGuan = AddOrSetSuGuanFn('添加宿管','添加','ADD_SUGUAN_POST','suguanStore','getSuguan')
let SetSuGuan = AddOrSetSuGuanFn('修改宿管信息','修改','SET_SUGUAN_POST','suguanStore','getSuguan')
let DelSuGuan = SureAgainFn('suguanStore','getSuguan')
//搜索的函数
const onSearch = value => console.log(value);
const columns = [
  {
    title: '宿管人员编号',
    width: 50,
    dataIndex: 'id',
    fixed: 'left',
    align:"center"
  },
  {
    title: '宿管姓名',
    width: 50,
    dataIndex: 'xingMing',
    align:"center"
  },
  {
    title: '宿管人员账号',
    dataIndex: 'zhangHao',
    width: 50,
    align:"center"
  },
  {
    title: '宿管人员创建时间',
    dataIndex: 'shiJian',
    width: 50,
    align:"center"
  },
  {
    title: '操作',
    width: 100,
    align:"center",
    render: (col) => {
      let {id} = col
      return (
          <div>
            <span className='btnText'><DelSuGuan id={id} requestURL='DEL_SUGUAN_POST'/></span>
            <span className='btnText'><SetSuGuan thisInfo={col}/></span>
          </div>
      )
    }
  },
];
function SuGuanGuanLi(props) {
  //初始化宿管表格信息
  let suguanData = toJS(props.suguanStore.suguan).map(v => ({...v,key:v.id}))
  useEffect(()=>{
    toJS(props.suguanStore.suguan).length<1&&props.suguanStore.getSuguan()
  },[])// eslint-disable-line
  return(
      <div>
        <div>
          <Search
              placeholder="请输入宿管账号"
              allowClear
              enterButton
              size="large"
              onSearch={onSearch}
              style={{ width: 250 }}
          />
          <Button type="primary" size='large'><AddSuGuan/></Button>
        </div>
        <br/>
        <Table
            columns={columns}
            dataSource={suguanData}
            pagination={{pageSize:5}}
        />
      </div>
  )
}
export default inject('suguanStore')(observer(SuGuanGuanLi))