import React,{useEffect} from 'react'
import {Button, Table ,Input ,message} from 'antd';
import {inject,observer} from "mobx-react";
import {toJS} from "mobx";
import SureAgainFn from '../../components/SureAgain'
import AddOrSetSuSheFn from '../../components/AddOrSetSuShe'
import AddSuSheBaoXiu from '../../components/AddSuSheBaoXiu'
import {getStorage} from "../../utils/storage";
import * as request from '../../utils/request'

const { Search } = Input;

const onSearch = value => console.log(value);

//从storage中获取当前宿管的信息，在添加宿舍报修是要用
let suGuanRenYuanId = getStorage('user').user.id
let suGuanName = getStorage('user').user.xingMing

const susheColumns = [
  {
    title: '宿舍编号',
    width: 60,
    ellipsis: true,
    dataIndex: 'bianHao',
    fixed: 'left',
    align:'center',
  },
  {
    title: '宿舍名称',
    width: 60,
    ellipsis: true,
    dataIndex: 'mingCheng',
    fixed: 'left',
  },
  {
    title: '宿舍最大人数',
    dataIndex: 'renShu',
    width: 60,
    ellipsis: true,
    align:'center',
  },
  {
    title: '实际人数',
    dataIndex: 'shiJiRenShu',
    width: 60,
    ellipsis: true,
    align:'center',
  },
  {
    title: '财产配置',
    dataIndex: 'caiChanPeiZhi',
    width: 60,
  },
  {
    title: '宿舍报修状态',
    dataIndex: 'baoXiuZhuangTai',
    width: 60,
    ellipsis: true,
  },
  {
    title: '操作',
    width: 100,
    ellipsis: true,
    render: (col) => {
      let {id} = col
      return (
          <div>
            <span className='btnText'><DelSuShe id={id} requestURL='DEL_SUSHE_POST'/></span>
            <span className='btnText'><SetSuShe thisInfo={col}/></span>
            <span className='btnText'>{
              col.baoXiuZhuangTai==='正常使用'?
                  <AddSuSheBaoXiu thisInfo={{suSheId:col.id,suGuanRenYuanId,suGuanName}}/>
                  :'查看维修记录'
            }</span>
          </div>
      )
    }
  },
];
//定义HuanqinJiluFn来接收组件的props中的mobx的查询换寝记录的方法
let HuanqinJiluFn = ()=>{}
//同意或驳回换寝记录的函数（在这里发起请求）
let changeZhuangTai=(id,shenPiZhuangTai,updateFn)=>{
  console.log(id,shenPiZhuangTai,updateFn);
  let setInfo = {
    id,
    shenPiZhuangTai,
  }
  request.ADDORSET('SET_HUANQIN_POST',setInfo).then(res=>{
    if(res.data.code===200){
      //在这里重新查一下数据（更新页面）
      updateFn().then(()=>{
        message.success('操作成功！')
      })
    }
  }).catch(()=>{
    message.error('操作失败！')
  })
}
const huanqinjiluColumns = [
  {
    title: '换寝记录编号',
    width: 60,
    ellipsis: true,
    dataIndex: 'id',
    fixed: 'left',
    align:'center',
  },
  {
    title: '学生姓名',
    width: 60,
    ellipsis: true,
    dataIndex: 'xingMing',
    fixed: 'left',
  },
  {
    title: '现居住寝室',
    dataIndex: 'xianSuShe',
    width: 60,
    ellipsis: true,
    align:'center',
  },
  {
    title: '调配寝室',
    dataIndex: 'wantToSuShe',
    width: 60,
    ellipsis: true,
    align:'center',
  },
  {
    title: '调换寝室理由',
    dataIndex: 'huanQinLiYou',
    width: 60,
  },
  {
    title: '审批状态',
    dataIndex: 'shenPiZhuangTai',
    width: 60,
    ellipsis: true,
  },
  {
    title: '操作',
    width: 100,
    ellipsis: true,
    render: (col) => {
      return(
          <div>
            <span className='btnText' onClick={()=>{col.shenPiZhuangTai==='待审批'&&changeZhuangTai(col.id,'同意',HuanqinJiluFn)}}>同意</span>
            <span className='btnText' onClick={()=>{col.shenPiZhuangTai==='待审批'&&changeZhuangTai(col.id,'驳回',HuanqinJiluFn)}}>驳回</span>
          </div>
      )
    }
  },
];

let AddSuShe = AddOrSetSuSheFn('添加宿舍','添加','ADD_SUSHE_POST')
let SetSuShe = AddOrSetSuSheFn('修改宿舍','修改','SET_SUSHE_POST')
let DelSuShe = SureAgainFn('susheStore','getSushe')
function SuSheGuanLi(props) {
  //页面挂载时，初始化宿舍信息
  useEffect(()=>{
    !props.susheStore.sushe.length>0&&props.susheStore.getSushe()
  },[])// eslint-disable-line
  let susheData = toJS(props.susheStore.sushe).map(v => ({...v,key:v.id}))

  //页面挂载时，初始化换寝记录信息
  useEffect(()=>{
    !props.huanqinStore.huanqinJilu.length>0&&props.huanqinStore.getHuanqinJilu()
  },[])// eslint-disable-line

  //页面挂载时，初始化HuanqinJiluFn函数
  useEffect(()=>{
    HuanqinJiluFn = props.huanqinStore.getHuanqinJilu
  },[])// eslint-disable-line

  let huanqinJiluData = toJS(props.huanqinStore.huanqinJilu).map(v => (
      {
        ...v,
        key:v.id,
        xingMing:v.xueSheng.xingMing,
        xianSuShe:v.yuanYouSuShe.mingCheng,
        wantToSuShe:v.diaoHuanSuShe.mingCheng,
      }
      ))
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
          <Button type="primary" size='large'><AddSuShe/></Button>
        </div>
        <br/>
        <Table
            columns={susheColumns}
            dataSource={susheData}
            pagination={{pageSize:2}}
        />
        换寝申请记录
        <Table
            columns={huanqinjiluColumns}
            dataSource={huanqinJiluData}
            pagination={{pageSize:2}}
        />
      </div>
  )
}
export default inject('susheStore','huanqinStore')(observer(SuSheGuanLi))