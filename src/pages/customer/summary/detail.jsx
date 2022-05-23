import { customerStatusMap } from '@/utils/config';
import { getAge } from '@/utils/index';
import { LeftOutlined, ManOutlined, WomanOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Descriptions, Divider } from 'antd';
import dayjs from 'dayjs';
import React from 'react';
import { history, useParams, useRequest } from 'umi';
import styles from '../detail/index.less';
import { getCustomerById } from '../service';
import SummaryDetail from './components/SummaryDetail';

const BaseView = () => {
  const { id } = useParams();
  const { data: customerInfo, loading } = useRequest(() => {
    if (id) {
      return getCustomerById({ id });
    } else {
      return Promise.resolve({});
    }
  });

  return (
    <PageContainer waterMarkProps={{ gapX: 120, gapY: 120 }}>
      <div
        className={styles.back}
        onClick={() => {
          history.goBack();
        }}
      >
        <LeftOutlined />
        返回
      </div>
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
              <Descriptions.Item label="姓名">
                {customerInfo?.name || ''}
                {customerInfo?.baseInfoBo?.petName ? `(${customerInfo?.baseInfoBo?.petName})` : ''}
              </Descriptions.Item>
              <Descriptions.Item label="学号">{customerInfo?.studentNo || ''}</Descriptions.Item>
              <Descriptions.Item label="客户状态">
                {customerStatusMap()[customerInfo.customerStatus] || ''}
              </Descriptions.Item>
              <Descriptions.Item label="客户经理">
                {customerInfo?.customerManager || ''}
              </Descriptions.Item>
              <Descriptions.Item label="出生日期">
                {customerInfo?.birthDate ? dayjs(customerInfo?.birthDate).format('YYYY-MM-DD') : ''}
                {customerInfo?.birthDate ? `（${getAge(customerInfo?.birthDate)}）` : ''}
              </Descriptions.Item>
              <Descriptions.Item label="注册时间">
                {customerInfo?.registerDate
                  ? dayjs(customerInfo?.registerDate).format('YYYY-MM-DD')
                  : ''}
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
          <SummaryDetail />
        </Card>
      )}
    </PageContainer>
  );
};

export default BaseView;
