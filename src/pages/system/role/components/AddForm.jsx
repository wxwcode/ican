import React, { useEffect, useState, useRef } from 'react';
import {
  ModalForm,
  ProFormText,
  ProFormTextArea,
  ProFormRadio,
  ProFormSwitch,
} from '@ant-design/pro-form';
import { updateRole, addRole } from '../service';
import { message } from 'antd';


export default (props) => {
  const restFormRef = useRef();
  const [title, setTitle] = useState('新建角色');
  useEffect(() => {
    if (props.currentData && props.visible) {
      setTitle('编辑角色');
      restFormRef.current?.setFieldsValue({ ...props.currentData });
    }
    if (!props.currentData && props.visible) {
      setTitle('新建角色');
      restFormRef.current?.resetFields();
    }
  }, [props]);
  const onFinish = async (value) => {
    const request = props.currentData && props.currentData.id ? updateRole : addRole
    const success = await request({
      ...value,
      status: value.status ? 1 : 0,
      id: props.currentData ? props.currentData.id : undefined,
    });
    if (success) {
      message.success('成功！')
      props.handleVisible(false);
      if (props.reload) {
        props.reload();
      }
    }
  };
  return (
    <ModalForm
      formRef={restFormRef}
      title={title}
      width="560px"
      layout="horizontal"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      visible={props.visible}
      onVisibleChange={props.handleVisible}
      onFinish={onFinish}
    >
      <ProFormText
        label="角色名称"
        rules={[
          {
            required: true,
            message: '必填',
          },
        ]}
        width="md"
        name="name"
      />
      <ProFormTextArea width="md" name="description" label="描述" />
      <ProFormSwitch initialValue={false} label="是否启用" name="status" />
    </ModalForm>
  );
};
