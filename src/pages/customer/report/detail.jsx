import { customerStatusMap } from '@/utils/config';
import { ManOutlined, WomanOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { Button, Card, Descriptions, Divider } from 'antd';
import dayjs from 'dayjs';
import React, { useRef, useState } from 'react';
import { useParams, useRequest } from 'umi';
import AddForm from '../components/AddReport';
import styles from '../detail/index.less';
import { getCustomerById, queryEstimateList } from '../service';

const columns = [
  {
    title: '序号',
    valueType: 'index',
  },
  {
    title: '评估时间',
    valueType: 'date',
    dataIndex: 'estimateDate',
    render: (d) => (d ? dayjs(d).format('YYYY-MM-DD') : ''),
  },
  {
    title: '评估形式',
    dataIndex: 'estimateSource',
  },
  {
    title: '评估类型',
    dataIndex: 'estimateType',
    with: 200,
  },
  {
    title: '服务中心',
    dataIndex: 'servicePlace',
  },
  {
    title: '评估督导',
    dataIndex: 'estimateSupervisor',
  },
  {
    title: '报告',
    dataIndex: 'file',
    search: false,
    render: (file, row) => (
      <Button
        type="primary"
        onClick={() => {
          //TODO
        }}
      >
        查看报告
      </Button>
    ),
  },
];

const BaseView = () => {
  const actionRef = useRef();
  const { id } = useParams();
  /** 新建窗口的弹窗 */
  const [createVisible, handleVisible] = useState(false);
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
                {customerStatusMap()[customerInfo.customerStatus] || ''}
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
            actionRef={actionRef}
            bordered
            search={false}
            rowKey="estimateId"
            params={{ studentId: id }}
            request={queryEstimateList}
            columns={columns}
            toolBarRender={() => [
              <Button
                type="primary"
                key="primary"
                onClick={() => {
                  handleVisible(true);
                }}
              >
                创建报告
              </Button>,
            ]}
          />
        </Card>
      )}
      <AddForm
        visible={createVisible}
        studentId={id}
        handleVisible={handleVisible}
        reload={() => {
          actionRef?.current?.reload();
        }}
      />
    </PageContainer>
  );
};

export default BaseView;
