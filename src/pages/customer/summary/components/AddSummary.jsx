import {
  ModalForm,
  ProFormDatePicker,
  ProFormSelect,
  ProFormDependency,
  ProFormUploadButton,
} from '@ant-design/pro-form';
import { message } from 'antd';
import React, { useRef } from 'react';
import { saveSummary } from '../../service';

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
    const success = await saveSummary(send);
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
      title="创建小结"
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
            value: 0,
            label: '月总结',
          },
          {
            value: 1,
            label: '周总结',
          },
        ]}
        width="md"
        name="summaryType"
        label="总结类型"
        rules={[
          {
            required: true,
            message: '请选择总结类型',
          },
        ]}
      />
      <ProFormDependency name={['summaryType']}>
        {({ summaryType }) => {
          if (summaryType === 1) {
            return (
              <ProFormSelect
                options={[
                  {
                    value: '1',
                    label: '第1周',
                  },
                  {
                    value: '2',
                    label: '第2周',
                  },
                  {
                    value: '3',
                    label: '第3周',
                  },
                  {
                    value: '4',
                    label: '第4周',
                  },
                ]}
                width="md"
                name="week"
                label="周"
                rules={[
                  {
                    required: true,
                    message: '请选择周',
                  },
                ]}
              />
            );
          }
        }}
      </ProFormDependency>
      <ProFormDatePicker.Month
        width="md"
        required
        colProps={{ md: 12, xl: 8 }}
        name="estimateDate"
        transform={(v) => ({
          year: new Date(v).getFullYear() + '',
          month: new Date(v).getMonth() + 1 + '',
        })}
        placeholder="年-月"
        label="总结时间"
        rules={[
          {
            required: true,
            message: '请选择总结时间',
          },
        ]}
      />
      <ProFormUploadButton
        name="attachmentId"
        label="上传小结"
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
