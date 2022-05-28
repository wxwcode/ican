import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Alert, Typography } from 'antd';
import { useModel } from 'umi';
import styles from './Welcome.less';

const CodePreview = ({ children }) => (
  <pre className={styles.pre}>
    <code>
      <Typography.Text copyable>{children}</Typography.Text>
    </code>
  </pre>
);

export default () => {
  const { initialState, setInitialState } = useModel('@@initialState');
  return (
    <PageContainer waterMarkProps={{ content: '' }}>
      <div className={styles.welcome}>
        {/* <h1>ICAN客户电子系统</h1> */}
        <div className={styles.desc}><span>{initialState?.currentUser?.name || '管理员'}</span>, 欢迎使用！</div>
      </div>
    </PageContainer>
  );
};
