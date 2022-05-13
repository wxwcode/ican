import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

export function confirm(content) {
  return new Promise((resolve) => {
    Modal.confirm({
      title: '请确认',
      icon: <ExclamationCircleOutlined />,
      content: content,
      okText: '确认',
      cancelText: '取消',
      onOk: () => resolve(true),
      onCancel: () => resolve(false),
    });
  });
}
