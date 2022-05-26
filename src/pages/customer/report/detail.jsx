import { customerStatusMap, evaluationLevelList } from '@/utils/config';
import { ManOutlined, WomanOutlined, LeftOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { Button, Card, Descriptions, Divider } from 'antd';
import React, { useRef, useState } from 'react';
import { useRequest, history } from 'umi';
import dayjs from 'dayjs';
import { getAge } from '@/utils/index';
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
          if (row.estimateUrl) window.open(row.estimateUrl);
        }}
      >
        查看报告
      </Button>
    ),
  },
];

const BaseView = (props) => {
  const actionRef = useRef();
  const { id } = props.location.query;
  /** 新建窗口的弹窗 */
  const [createVisible, handleVisible] = useState(false);
  const { data: customerInfo, loading } = useRequest(() => {
    if (id) {
      return getCustomerById({ id });
    } else {
      return Promise.resolve({});
    }
  });

  const t = (v) => {
    if (!v) return '';
    const o = evaluationLevelList.find((item) => item.value === v);
    return o ? o.label : '';
  };
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
              <img src={customerInfo?.baseInfoBo.avatar || '/logo.png'} alt="图像" />
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
              <Descriptions.Item label="评估等级">
                {t(customerInfo?.baseInfoBo?.evaluationLevel)}
              </Descriptions.Item>
              <Descriptions.Item label="评估督导">
                {customerInfo?.baseInfoBo?.assessmentTeacher || ''}
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
