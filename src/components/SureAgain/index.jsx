import { Popconfirm, message } from 'antd';
import React from "react";
import * as request from '../../utils/request'
import {inject,observer} from 'mobx-react'


function SureAgainFn(updateStore,updateFn,btnText='删除'){
  //返回的删除组件
  return inject(updateStore)(observer(function DelCmp(props){
    //点击确认的函数
    function confirm(id,requestURL){
      //点击确认按钮发起删除的请求
      console.log(id,requestURL,updateStore,updateFn);

      request.DELECTED(requestURL,id).then(res=>{
        if(res.data.code===200){
          props[updateStore][updateFn]().then(()=>{
            message.success('操作成功！');
          })
        }else {
          message.error('操作失败！');
        }
      }).catch(()=>{
        message.error('服务器异常！');
      })
    }
    //取消的函数
    function cancel() {
      message.info('已取消');
    }
    return(
        <Popconfirm
            title="你确定要进行该操作吗?"
            onConfirm={()=>confirm(props.id,props.requestURL)}
            onCancel={cancel}
            okText="确认"
            cancelText="取消"
        >
          <span>{btnText}</span>
        </Popconfirm>
    )
  }))
}
export default SureAgainFn
