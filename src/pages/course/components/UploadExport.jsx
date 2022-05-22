import { Modal, message, Upload } from 'antd'
import React, { useRef } from 'react';
import { InboxOutlined } from '@ant-design/icons';
const { Dragger } = Upload
export default (props) => {
  const onCancel = () => {
    props.handleVisible(false)
  }
  return (
    <Modal
      title="续费管理"
      width="560px"
      destroyOnClose
      visible={props.visible}
      onVisibleChange={props.handleVisible}
      footer={null}
      onCancel={onCancel}
    >
      <Dragger
        name="file"
        label="批量导入"
        accept="'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
        action="/api/student/importExcel"
        extra="请上传5M以内的word/pdf文档"
        onChange= {(info) => {
          const { status } = info.file;
          if (status === 'error') {
            message.error(`${info.file.name} 上传失败`);
          }
          if (status === 'done') {
            props.reload()
            message.success(`${info.file.name} 导入成功`);
          }
        }}
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">请点击或者拖拽文件上传</p>
        <p className="ant-upload-hint">
          请上传 10M以内的/pdf文档
        </p>
      </Dragger>
      <p style={{margin: '30px 0'}}> </p>
    </Modal>
  );
};
