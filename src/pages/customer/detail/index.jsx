import { customerStatusMap, evaluationLevelList } from '@/utils/config';
import {
  FileWordOutlined,
  ManOutlined,
  WomanOutlined,
  LeftOutlined,
  FilePdfOutlined,
} from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Descriptions, Divider, Table } from 'antd';
import dayjs from 'dayjs';
import React from 'react';
import { useLocation, useRequest, history } from 'umi';
import { getCustomerById } from '../service';
import { getAge } from '@/utils/index';
import styles from './index.less';

const { Meta } = Card;

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
  const location = useLocation();
  const { data: customerInfo, loading } = useRequest(() => {
    const { userId } = location.query;
    if (userId) {
      return getCustomerById({ id: userId });
    } else {
      return Promise.resolve({});
    }
  });
  const s = (v) => {
    const keyMap = {
      L1: '否',
      L2: '否',
      L3: '否',
      L4: '否',
      L5: '是',
      L6: '是',
    };
    return keyMap[v] || '';
  };
  const t = (v) => {
    if (!v) return '';
    const o = evaluationLevelList.find((item) => item.value === v);
    return o ? o.label : '';
  };
  const downloadFile = () => {
    const url = customerInfo?.baseInfoBo?.questionnaireFile?.downloadLocation || '';
    if (url) window.open(url);
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
              marginBottom: 32,
            }}
          />
          <Descriptions
            title="基本信息"
            style={{
              marginBottom: 32,
            }}
          >
            <Descriptions.Item label="小名">
              {customerInfo?.baseInfoBo?.petName || ''}
            </Descriptions.Item>
            <Descriptions.Item label="性别">
              {customerInfo?.baseInfoBo?.gender === '1' ? '女' : '男'}
            </Descriptions.Item>
            <Descriptions.Item label="身高">
              {customerInfo?.baseInfoBo?.height || ''}cm
            </Descriptions.Item>
            <Descriptions.Item label="体重">
              {customerInfo?.baseInfoBo?.weight || ''}kg
            </Descriptions.Item>
            <Descriptions.Item label="临床诊断">
              {customerInfo?.baseInfoBo?.clinicalDiagnosis || ''}
            </Descriptions.Item>
            <Descriptions.Item label="服务老师">
              {customerInfo?.baseInfoBo?.serviceTeacher || ''}
            </Descriptions.Item>
            <Descriptions.Item label="工服尺码">
              {customerInfo?.baseInfoBo?.workClotheSize || ''}
            </Descriptions.Item>
            <Descriptions.Item label="招生来源">
              {customerInfo?.baseInfoBo?.studentSource || ''}
            </Descriptions.Item>
            <Descriptions.Item label="推荐人">
              {customerInfo?.baseInfoBo?.recommend || ''}
            </Descriptions.Item>
            <Descriptions.Item label="雇主责任险">
              {s(customerInfo?.baseInfoBo?.evaluationLevel)}
            </Descriptions.Item>
            <Descriptions.Item label="剩余课时">
              {customerInfo?.availableClassHours || ''}/{customerInfo?.totalClassHours || ''}
            </Descriptions.Item>
          </Descriptions>
          <Descriptions
            title="家庭情况"
            style={{
              marginBottom: 32,
            }}
          >
            <Descriptions.Item label="联系人">
              {customerInfo?.familyInfoBo?.linkName || ''}
            </Descriptions.Item>
            <Descriptions.Item label="固定电话">
              {customerInfo?.familyInfoBo?.lineFixed || ''}
            </Descriptions.Item>
            <Descriptions.Item label="联系方式">
              {customerInfo?.familyInfoBo?.linePhone || ''}
            </Descriptions.Item>
            <Descriptions.Item label="微信号">
              {customerInfo?.familyInfoBo?.weChat || ''}
            </Descriptions.Item>
            <Descriptions.Item label="监护人">
              {customerInfo?.familyInfoBo?.guardianName || ''}
            </Descriptions.Item>
            <Descriptions.Item label="监护人关系">
              {customerInfo?.familyInfoBo?.guardianRelation || ''}
            </Descriptions.Item>
            <Descriptions.Item label="监护人联系方式">
              {customerInfo?.familyInfoBo?.guardianPhone || ''}
            </Descriptions.Item>
            <Descriptions.Item label="家庭成员1姓名">
              {customerInfo?.familyInfoBo?.familyMemberName || ''}
            </Descriptions.Item>
            <Descriptions.Item label="家庭成员1年龄">
              {customerInfo?.familyInfoBo?.familyMemberAge || ''}
            </Descriptions.Item>
            <Descriptions.Item label="家庭成员1关系">
              {customerInfo?.familyInfoBo?.familyMemberRelation || ''}
            </Descriptions.Item>
            <Descriptions.Item label="联系地址">
              {customerInfo?.familyInfoBo?.linkProvinceName || '__'}省
              {customerInfo?.familyInfoBo?.linkCityName || '__'}市
              {customerInfo?.familyInfoBo?.linkCountyName || '__'}区
              {customerInfo?.familyInfoBo?.linkAddrName || '__'}
            </Descriptions.Item>
          </Descriptions>
          <Divider
            style={{
              marginBottom: 32,
            }}
          />
          <div className={styles.title}>教育情况</div>
          <Table
            bordered
            rowKey="id"
            pagination={false}
            dataSource={customerInfo?.educationBoList || []}
            columns={columns}
          />
          <Divider
            style={{
              marginBottom: 32,
            }}
          />
          {customerInfo?.baseInfoBo?.questionnaireFile ? (
            <>
              <div className={styles.title}>家庭与生活调查表</div>
              <Card
                hoverable
                onClick={downloadFile}
                style={{ width: 240 }}
                cover={
                  customerInfo?.baseInfoBo?.questionnaireFile?.extension === 'pdf' ? (
                    <FilePdfOutlined
                      style={{
                        textAlign: 'center',
                        fontSize: '56px',
                        margin: '30px 0',
                        color: 'blue',
                      }}
                    />
                  ) : (
                    <FileWordOutlined
                      style={{
                        textAlign: 'center',
                        fontSize: '56px',
                        margin: '30px 0',
                        color: 'blue',
                      }}
                    />
                  )
                }
              >
                <Meta
                  title="家庭与生活调查表"
                  description={customerInfo?.baseInfoBo?.questionnaireFile?.downloadLocation || ''}
                />
              </Card>
              <Divider
                style={{
                  marginBottom: 32,
                }}
              />
            </>
          ) : null}

          <Descriptions
            title="备注"
            style={{
              marginBottom: 32,
            }}
          >
            <Descriptions.Item label="">{customerInfo?.baseInfoBo?.remark || ''}</Descriptions.Item>
          </Descriptions>
        </Card>
      )}
    </PageContainer>
  );
};

export default BaseView;
