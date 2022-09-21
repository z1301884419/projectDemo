import React,{useEffect} from 'react'
import {Table} from 'antd';
import { Input } from 'antd';
import { Button } from 'antd';
import {inject,observer} from "mobx-react";
import {toJS} from "mobx";
import AddOrSetStu from '../../components/AddOrSetStu'
import ShenQingHuanQin from '../../components/ShenQingHuanQin'
import SureAgainFn from '../../components/SureAgain'
import LookQinShi from '../../components/LookQinShiInfo'
import LookBiaoXianInfo from '../../components/LookBiaoXianInfo'
import AddBiaoXianJiLu from '../../components/AddBiaoXianInfo'
const { Search } = Input;

const onSearch = value => console.log(value);
const columns = [
  {
    title: '学号',
    width: 50,
    dataIndex: 'xueHao',
    align:"center"
  },
  {
    title: '学生姓名',
    width: 50,
    dataIndex: 'xingMing',
    align:"center"

  },
  {
    title: '学生账号',
    dataIndex: 'zhangHao',
    width: 50,
    align:"center"
  },
  {
    title: '学生院系信息',
    dataIndex: 'yuanXi',
    key: 'id',
    width: 50,
    align:"center"
  },
  {
    title: '班级',
    dataIndex: 'banJi',
    width: 50,
    align:"center"
  },
  {
    title: '操作',
    width: 150,
    align:"center",
    render: (col) => {
      let {id} = col
      return (
        <div>
           <span className='btnText'><DelStu id={id} requestURL='DEL_STU_POST'/></span>
           <span className='btnText'><SetBtn thisInfo={col}/></span>
           <span className='btnText'><LookQinShi thisInfo={col.suShe}/></span>
           <span className='btnText'><ShenQingHuanQin thisInfo={{
             xingMing:col.xingMing,
             qinShiMingCheng:col.suShe.mingCheng,
             xueShengId:col.id,
             yuanYouSuSheId:col.suShe.id,
           }}/></span>
          <span className='btnText'><LookBiaoXianInfo id={col.id}/></span>
          <span className='btnText'><AddBiaoXianJiLu thisInfo={{
            xingMing:col.xingMing,
            xueHao:col.xueHao,
            xueShengId:col.id
          }}/></span>

        </div>
      )
    }
  },
];
let AddBtn = AddOrSetStu('添加学生信息','添加','ADD_STU_POST')
let SetBtn = AddOrSetStu('修改学生信息','修改','SET_STU_POST')
let DelStu = SureAgainFn('stuStore','getStudents')
function StuInfo(props) {
  //初始化学生表格信息
  let stuData = toJS(props.stuStore.students).map(v => ({...v,key:v.id}))
  useEffect(()=>{
    toJS(props.stuStore.students).length<1&&props.stuStore.getStudents()
  },[])// eslint-disable-line
  return(
      <div>
        <div>
          <Search
              placeholder="请输入学生账号"
              allowClear
              enterButton
              size="large"
              onSearch={onSearch}
              style={{ width: 250 }}
          />
          <Button type="primary" size='large'><AddBtn/></Button>
        </div>
        <br/>
        <Table
            columns={columns}
            dataSource={stuData}
            pagination={{pageSize:4}}
        />
      </div>
  )
}
export default inject('stuStore')(observer(StuInfo))
