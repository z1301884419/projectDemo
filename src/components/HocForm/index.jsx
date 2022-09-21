import React, { useState } from 'react';
import { Modal, Form ,message } from 'antd';
import newDate from "../../utils/Time";
import * as request from '../../utils/request'
import {inject, observer} from "mobx-react"

const CollectionCreateForm = ({ title,visible, onCreate, onCancel,Component,thisInfo }) => {
  const [form] = Form.useForm();
  return (
      <Modal
          visible={visible}
          title={title}
          okText='确认'
          cancelText="取消"
          onCancel={()=>{onCancel();form.resetFields()}}
          maskClosable={false}
          onOk={() => {
            form
                .validateFields()
                .then((values) => {
                  form.resetFields();
                  onCreate({...thisInfo,...values});
                })
                .catch((info) => {
                  message.error('操作失败！');
                });
          }}
      >
        {/*通过参数接收的Form组件*/}
        <Component form={form} thisInfo={thisInfo}/>

      </Modal>
  );
};

//这是一个高阶组件
const HocForm = (title,btnText,requestURL,updateStore='stuStore',updateFn)=>{
  return (component)=>{
    //返回的组件
    return inject(updateStore)(observer( function CollectionsPage(props){
      const [visible, setVisible] = useState(false);
      //确认按钮触发的事件
      const onCreate = (values) => {
        console.log(values);
        //将时间转成YYYY-MM-DD H-M-S格式
        if(values.shiJian) values.shiJian = newDate(values.shiJian._d)
        //发起请求的地方
        if(requestURL){//如果要请求，则走这里
          request.ADDORSET(requestURL,values).then(res => {
            console.log(res);
            if(res.data.code===200){
              if(title==='宿舍报修'){
                //如果是宿舍报修请求则先修改宿舍状态，再获取数据
                request.ADDORSET('SET_SUSHE_POST',{id:values.suSheId,baoXiuZhuangTai:'维修中'}).then((res2)=>{
                  console.log(res2);
                  if(res2.data.code===200){
                    //获取最新的数据
                    console.log(props[updateStore]);
                    props[updateStore][updateFn]().then(()=>{
                      message.success('操作成功！');
                      //setVisible(false);
                    })
                  }
                })
              }else {
                //如果时其他，获取最新的数据
                props[updateStore][updateFn]().then(()=>{
                  message.success('操作成功！');
                  setVisible(false);
                })
                //setVisible(false);
              }
            }else{
              message.error('操作失败！');
            }
          }).catch(()=>{
            message.error('操作失败！');
          })
        }else {//如果没请求，则直接关闭弹窗，如查看寝室信息
          setVisible(false);
        }


      };
      //返回的组件结构
      return (
          <div>
            <span
                onClick={() => {
                  setVisible(true);
                }}
            >
              {btnText}
            </span>
            {/*这是一个组件，上面的创建的组件*/}
            <CollectionCreateForm
                title={title}
                visible={visible}
                onCreate={onCreate}
                onCancel={() => {
                  setVisible(false);
                }}
                Component={component}
                thisInfo={props.thisInfo}
            />
          </div>
      );
    }));
  }
}

export default HocForm