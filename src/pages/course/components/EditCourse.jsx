import React, { useEffect, useRef } from 'react';
import {
  ModalForm,
  ProFormDigit,
} from '@ant-design/pro-form';
import { updateStudentHour } from '../service';
import { message } from 'antd';


export default (props) => {
  const restFormRef = useRef();
  useEffect(() => {
    if (props.currentData && props.visible) {
      restFormRef.current?.setFieldsValue({ ...props.currentData });
    }
  }, [props]);
  const onFinish = async (value) => {
    const {studentNo} = props.currentData
    if (studentNo) return false
    const success = await updateStudentHour({
      ...value,
      studentNo
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
      title="更新课时"
      width="560px"
      layout="horizontal"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      visible={props.visible}
      onVisibleChange={props.handleVisible}
      onFinish={onFinish}
    >
      <ProFormDigit
        width="md"
        colProps={{ md: 12, xl: 8 }}
        name="availableClassHours"
        label="剩余课时"
        fieldProps={{ precision: 0 }}
        rules={[
          {
            required: true,
            message: '必填',
          },
        ]}
      />
      <ProFormDigit
        width="md"
        colProps={{ md: 12, xl: 8 }}
        name="totalClassHours"
        label="总课时"
        fieldProps={{ precision: 0 }}
        rules={[
          {
            required: true,
            message: '必填',
          },
        ]}
      />
    </ModalForm>
  );
};
