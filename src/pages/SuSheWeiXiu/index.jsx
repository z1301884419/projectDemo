import React,{useEffect} from 'react'
import { Table } from 'antd';
import {inject,observer} from "mobx-react";
import {toJS} from "mobx";
import SureAgainFn from '../../components/SureAgain'
const columns = [
  {
    title: '宿舍编号',
    width: 50,
    dataIndex: 'id',
    fixed: 'left',
    align:"center"
  },
  {
    title: '宿舍名称',
    width: 50,
    dataIndex: 'susheMingcheng',
    align:"center"
  },
  {
    title: '报修详情',
    dataIndex: 'baoXiuNeiRong',
    width: 50,
    align:"center"
  },
  {
    title: '维修状态',
    dataIndex: 'weixiuZhuangtai',
    key: 'id',
    width: 50,
    align:"center"
  },
  {
    title: '宿舍报修人',
    dataIndex: 'baoXiuRen',
    key: 'id',
    width: 50,
    align:"center"
  },
  {
    title: '操作',
    align:"center",
    width: 100,
    render: (col) =>{
      let {id} = col
      return(
          <div>
            <span className='btnText'><DelWeiXiu  id={id} requestURL='DEL_SUSHEWEIXIU_POST'/></span>
          </div>
      )
    }
  },
];
let DelWeiXiu = SureAgainFn('susheweixiuStore','getSusheWeixiu','维修完毕')
function SuSheWeiXiu(props) {
  //初始化后勤表格信息
  let susheweixiuData = toJS(props.susheweixiuStore.susheweixiu).map(v => (
      {
        ...v,
        key:v.id,
        susheMingcheng:v.suShe.mingCheng,
        weixiuZhuangtai:v.suShe.baoXiuZhuangTai,
        baoXiuRen:v.suGuanRenYuan.xingMing
      }))
  useEffect(()=>{
    toJS(props.susheweixiuStore.susheweixiu).length<1&&props.susheweixiuStore.getSusheWeixiu()
  },[])// eslint-disable-line
  return(
      <div>
        <Table
            columns={columns}
            dataSource={susheweixiuData}
            pagination={{pageSize:5}}
        />
      </div>
  )
}
export default inject('susheweixiuStore')(observer(SuSheWeiXiu))