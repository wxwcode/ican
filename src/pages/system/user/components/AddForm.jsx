import React, { useEffect, useState, useRef } from 'react';
import { ModalForm, ProFormText, ProFormRadio, ProFormSwitch } from '@ant-design/pro-form';
import { updateUser, addUser } from '@/services/system/user';
import { message } from 'antd';

export default (props) => {
  const restFormRef = useRef();
  const [title, setTitle] = useState('新建用户');
  useEffect(() => {
    if (props.currentData && props.visible) {
      setTitle('编辑用户');
      restFormRef.current?.setFieldsValue({ ...props.currentData });
    }
    if (!props.currentData && props.visible) {
      setTitle('新建用户');
      restFormRef.current?.resetFields();
    }
  }, [props]);
  const onFinish = async (value) => {
    const request = props.currentData && props.currentData.id ? updateUser : addUser;
    const success = await request({
      ...value,
      status: value.status ? 0 : 1,
      id: props.currentData ? props.currentData.id : undefined,
    });
    if (success) {
      message.success('成功！');
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
        label="姓名"
        rules={[
          {
            required: true,
            message: '必填',
          },
        ]}
        width="md"
        name="name"
      />
      <ProFormText
        label="邮箱"
        rules={[
          {
            required: true,
            message: '必填',
          },
        ]}
        width="md"
        name="email"
      />
      <ProFormText label="昵称" width="md" name="nickname" />
      <ProFormText
        label="手机号"
        width="md"
        rules={[
          {
            required: true,
            message: '必填',
          },
        ]}
        name="mobile"
      />
      <ProFormRadio.Group
        name="gender"
        width="md"
        label="性别"
        rules={[
          {
            required: true,
            message: '必填',
          },
        ]}
        options={[
          {
            label: '男',
            value: '男',
          },
          {
            label: '女',
            value: '女',
          },
        ]}
      />
      <ProFormText
        label="职位"
        width="md"
        rules={[
          {
            required: true,
            message: '必填',
          },
        ]}
        name="jobtitle"
      />
      {/* <ProFormTextArea width="md" name="description" label="描述" /> */}
      <ProFormSwitch initialValue={true} label="是否启用" name="status" />
    </ModalForm>
  );
};
