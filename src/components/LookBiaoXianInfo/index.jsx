import React, { useState } from 'react';
import {message, Modal, Table } from 'antd';
import * as request from '../../utils/request'


const columns =[
  {
    title: '学生姓名',
    dataIndex: ['xueSheng','xingMing'],
  },
  {
    title: '学生学号',
    dataIndex: ['xueSheng','xueHao'],
  },
  {
    title: '记录类型',
    dataIndex: 'leiXing',
  },
  {
    title: '时间',
    dataIndex: 'shiJian',
  },
]
const LookBiaoXianInfo = (props) => {
  //读取传来的学生id
  let {id} = props
  //设置学生表现信息状态
  let [BiaoXianInfo,setBiaoXianInfo] = useState([])

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    //在这里通过id发起请求查询该学生的表现记录
    console.log(id);
    request.ONESTUJILU(id).then(res=>{
      console.log(res);
      if(res.data.code===200){
        setBiaoXianInfo([...res.data.list])
        setIsModalVisible(true);
      }
    }).catch(()=>{
      message.error('操作失败！');
    })

  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
      <>
        <span onClick={showModal}>查看表现记录</span>
        <Modal
            title="表现记录"
            cancelText='取消'
            okText='确定'
            width = {800}
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
        >
        {/*  渲染的表格数据*/}
          <Table
              columns={columns}
              dataSource={BiaoXianInfo}
              pagination={{pageSize:3}}
              size="middle"
          />
        </Modal>
      </>
  );
}
export default LookBiaoXianInfo