import { servicePlaceList } from '@/utils/config';
import {
  ModalForm,
  ProFormDatePicker,
  ProFormSelect,
  ProFormText,
  ProFormUploadButton,
} from '@ant-design/pro-form';
import { message } from 'antd';
import dayjs from 'dayjs';
import React, { useRef } from 'react';
import { createReport } from '../service';

export default (props) => {
  const restFormRef = useRef();

  const onFinish = async (value) => {
    const send = {
      ...value,
      studentId: props.studentId,
    };
    if (send.attachmentId && send.attachmentId[0]) {
      send.attachmentId = send.attachmentId[0].response.data.id;
    }
    const success = await createReport(send);
    if (success) {
      message.success('成功！');
      restFormRef.current?.resetFields();
      props.handleVisible(false);
      if (props.reload) {
        props.reload();
      }
    }
  };
  return (
    <ModalForm
      formRef={restFormRef}
      title="创建报告"
      width="560px"
      layout="horizontal"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      visible={props.visible}
      onVisibleChange={props.handleVisible}
      onFinish={onFinish}
    >
      <ProFormSelect
        options={[
          {
            value: '线上',
            label: '线上',
          },
          {
            value: '线下',
            label: '线下',
          },
        ]}
        width="md"
        name="estimateSource"
        label="评估形式"
        rules={[
          {
            required: true,
            message: '请选择评估形式',
          },
        ]}
      />
      <ProFormSelect
        options={[
          {
            value: '首次评估',
            label: '首次评估',
          },
          {
            value: '阶段评估',
            label: '阶段评估',
          },
        ]}
        width="md"
        name="estimateType"
        label="评估类型"
        rules={[
          {
            required: true,
            message: '请选择评估类型',
          },
        ]}
      />
      <ProFormDatePicker
        width="md"
        required
        colProps={{ md: 12, xl: 8 }}
        name="estimateDate"
        transform={(v) => ({ estimateDate: new Date(v).getTime() })}
        placeholder="年-月-日"
        label="评估时间"
        rules={[
          {
            required: true,
            message: '请输入评估时间',
          },
        ]}
      />
      <ProFormSelect
        options={servicePlaceList}
        width="md"
        name="servicePlace"
        label="服务中心"
        rules={[
          {
            required: true,
            message: '请选择服务中心',
          },
        ]}
      />
      <ProFormText label="评估督促人" width="md" name="estimateSupervisor" />
      <ProFormUploadButton
        name="attachmentId"
        label="评估报告"
        max={1}
        accept=".doc,.docx,.pdf"
        fieldProps={{
          name: 'file',
          listType: 'picture-card',
        }}
        defaultFileList={[]}
        action="/api/attachment/upload"
        extra="请上传5M以内的word/pdf文档"
        rules={[
          {
            required: true,
            message: '请选上传评估报告',
          },
        ]}
      />
    </ModalForm>
  );
};
