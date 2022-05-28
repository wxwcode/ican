import React, { useEffect, useState, useRef } from 'react';
import {
  ModalForm,
  ProFormCheckbox
} from '@ant-design/pro-form';
import { saveRole, queryUserRoles, getAllRoles } from '@/services/system/user';
import { message } from 'antd';
import { defaultFormat } from 'moment';

export default (props) => {
  const restFormRef = useRef();
  useEffect(() => {
    if (props.userId && props.visible) {
      queryUserRoles(props.userId).then(({data, status}) => {
        if (status === 0 && data.userRoleList && data.userRoleList.length) {
          const ids = data.userRoleList.map(item => item.id)
          restFormRef.current?.setFieldsValue({ userRoleList: ids });
        }
      })
    }
  }, [props]);
  const onFinish = async (value) => {
    const success = await saveRole({
      ...value,
      id: props.userId,
    });
    if (success) {
      message.success('成功！')
      props.handleVisible(false);
      restFormRef.current?.resetFields();
      if (props.reload) {
        props.reload();
      }
    }
  };
  return (
    <ModalForm
      formRef={restFormRef}
      title="配置角色"
      width="560px"
      layout="horizontal"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      visible={props.visible}
      onVisibleChange={props.handleVisible}
      onFinish={onFinish}
    >
      <ProFormCheckbox.Group
        name="userRoleList"
        label="角色"
        transform={(arr) => ({
          userRoleList: arr.map(id => ({roleId: id}))
        })}
        request={getAllRoles}
      />
    </ModalForm>
  );
};
