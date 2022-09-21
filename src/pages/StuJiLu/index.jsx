import React,{useEffect} from 'react'
import { Table } from 'antd';
import {inject,observer} from "mobx-react";
import {toJS} from "mobx";
import SureAgainFn from '../../components/SureAgain'
const columns = [
  {
    title: '学号',
    dataIndex: 'xueHao',
    align:"center"
  },
  {
    title: '学生姓名',
    dataIndex: 'xingMing',
    align:"center"
  },
  {
    title: '学生记录类型',
    dataIndex: 'leiXing',
    align:"center"
  },
  {
    title: '记录时间',
    dataIndex: 'shiJian',
    align:"center"
  },
  {
    title: '操作',
    align:"center",
    render: (col) => {
      let {id} = col
      return(
          <div>
            <span className='btnText'><DelJiLu id={id} requestURL='DEL_BIAOXIAN_POST'/></span>
          </div>
      )
    }
  },
];
let DelJiLu = SureAgainFn('stujiluStore','getStuJiLu')
function StuJiLu(props) {
  //初始化学生记录表格信息
  let stujiluData = toJS(props.stujiluStore.stujilu).map(v => (
      {
        ...v,
        key:v.id,
        xueHao:v.xueSheng.xueHao,
        xingMing: v.xueSheng.xingMing,
      }))
  useEffect(()=>{
    toJS(props.stujiluStore.stujilu).length<1&&props.stujiluStore.getStuJiLu()
  },[])// eslint-disable-line
  return(
      <div>
        <Table
            columns={columns}
            dataSource={stujiluData}
            pagination={{pageSize:5}}
        />
      </div>
  )
}
export default inject('stujiluStore')(observer(StuJiLu))