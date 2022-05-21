import React from 'react';
import { history, useParams } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Descriptions, Divider, Button } from 'antd';
import { ManOutlined, WomanOutlined } from '@ant-design/icons';
import { useRequest } from 'umi';
import { getCustomerById } from '../service';
import ProTable from '@ant-design/pro-table';
import styles from '../detail/index.less';
import dayjs from 'dayjs';

const columns = [
  {
    title: '就读时间',
    valueType: 'date',
    dataIndex: 'attendSchoolStartDate',
    render: (d) => (d ? dayjs(d).format('YYYY-MM-DD') : ''),
  },
  {
    title: '就读学校/机构',
    dataIndex: 'mechanism',
  },
  {
    title: '就读时长（年）',
    dataIndex: 'studyYear',
    with: 200,
  },
];

const BaseView = () => {
  const { id } = useParams();
  const { data: customerInfo, loading } = useRequest(() => {
    if (id) {
      return getCustomerById({ id });
    } else {
      return Promise.resolve({});
    }
  });

  const downloadFile = () => {
    const url = customerInfo?.baseInfoBo?.questionnaireFile?.downloadLocation || '';
    if (url) window.open(url);
  };
  return (
    <PageContainer waterMarkProps={{ gapX: 120, gapY: 120 }}>
      {loading || !customerInfo ? null : (
        <Card bordered={false}>
          <div className={styles.info}>
            <div className={styles.avatar}>
              <img src={customerInfo?.baseInfoBo.avatar} alt="图像" />
              {customerInfo?.baseInfoBo?.gender === '1' ? (
                <WomanOutlined style={{ color: 'red' }} className={styles.sex} />
              ) : (
                <ManOutlined style={{ color: 'blue' }} className={styles.sex} />
              )}
            </div>
            <Descriptions title="" className={styles.contentInfo}>
              <Descriptions.Item label="姓名">{customerInfo?.name || ''}</Descriptions.Item>
              <Descriptions.Item label="学号">
                {customerInfo?.baseInfoBo?.studentId || ''}
              </Descriptions.Item>
              <Descriptions.Item label="客户状态">
                {customerInfo.customerStatus || ''}
              </Descriptions.Item>
              <Descriptions.Item label="客户经理">
                {customerInfo?.customerManager || ''}
              </Descriptions.Item>
              <Descriptions.Item label="出生日期">
                {customerInfo?.baseInfoBo?.birthDate || ''}
              </Descriptions.Item>
              <Descriptions.Item label="注册时间">
                {customerInfo?.registerDate || ''}
              </Descriptions.Item>
              <Descriptions.Item label="服务中心">
                {customerInfo?.servicePlace || ''}
              </Descriptions.Item>
            </Descriptions>
          </div>
          <Divider
            style={{
              marginBottom: 20,
            }}
          />
          <ProTable
            bordered
            search={false}
            rowKey="id"
            pagination={false}
            dataSource={customerInfo?.educationBoList || []}
            columns={columns}
            toolBarRender={() => [
              <Button type="primary" key="primary">
                创建报告
              </Button>,
            ]}
          />
        </Card>
      )}
    </PageContainer>
  );
};

export default BaseView;
