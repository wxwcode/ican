import React, { useState, useRef, useEffect } from 'react';
import { history, useLocation } from 'umi'
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Descriptions, Divider, Table } from 'antd';
import { ManOutlined, WomanOutlined } from '@ant-design/icons';
import { useRequest } from 'umi';
import { createCustomer, getCustomerById } from "../service";
import { genderList, evaluationLevelList, studentSourceList, customerStatusList, guardianRelationList, servicePlaceList } from '@/utils/config'
import styles from './index.less';
import dayjs from 'dayjs'

const { Meta } = Card


const columns = [
  {
    title: '就读时间',
    valueType: 'date',
    dataIndex: 'attendSchoolStartDate',
    render: d => d ? dayjs(d).format('YYYY-MM-DD') : ''
  },
  {
    title: '就读学校/机构',
    dataIndex: 'mechanism',
  },
  {
    title: '就读时长（年）',
    dataIndex: 'studyYear',
    with: 200,
  }
];

const BaseView = () => {
  const location = useLocation()
  const { data: customerInfo, loading } = useRequest(() => {
    const { userId } = location.query
    if (userId) {
      return getCustomerById({ id: userId });
    } else {
      return Promise.resolve({})
    }
  });

  return (
    <PageContainer waterMarkProps={{ gapX: 120, gapY: 120 }}>
      {
        loading || !customerInfo  ? null :
          <Card bordered={false}>
            <div className={styles.info}>
              <div className={styles.avatar}>
                <img src={customerInfo?.baseInfoBo.avatar} alt="图像" />
                {
                  customerInfo?.baseInfoBo?.gender === '1' ? <WomanOutlined style={{ color: 'red' }} className={styles.sex}/> :
                  <ManOutlined style={{ color: 'blue' }} className={styles.sex} />
                }
              </div>
              <Descriptions
                title=""
                className={styles.contentInfo}
              >
                <Descriptions.Item label="姓名">{customerInfo?.name || ''}</Descriptions.Item>
                <Descriptions.Item label="学号">{customerInfo?.baseInfoBo?.studentId || ''}</Descriptions.Item>
                <Descriptions.Item label="客户状态">{customerInfo.customerStatus || ''}</Descriptions.Item>
                <Descriptions.Item label="客户经理">{customerInfo?.customerManager || ''}</Descriptions.Item>
                <Descriptions.Item label="出生日期">{customerInfo?.birthDate || ''}</Descriptions.Item>
                <Descriptions.Item label="注册时间">{customerInfo?.registerDate || ''}</Descriptions.Item>
                <Descriptions.Item label="服务中心">{customerInfo?.servicePlace || ''}</Descriptions.Item>
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
              <Descriptions.Item label="小名">付小小</Descriptions.Item>
              <Descriptions.Item label="性别">18100000000</Descriptions.Item>
              <Descriptions.Item label="身高">180cm</Descriptions.Item>
              <Descriptions.Item label="体重">56kg</Descriptions.Item>
              <Descriptions.Item label="评估等级">无</Descriptions.Item>
              <Descriptions.Item label="临床诊断">无</Descriptions.Item>
              <Descriptions.Item label="服务老师">无</Descriptions.Item>
              <Descriptions.Item label="评估督导">无</Descriptions.Item>
              <Descriptions.Item label="招生来源">无</Descriptions.Item>
              <Descriptions.Item label="推荐人">无</Descriptions.Item>
              <Descriptions.Item label="雇主责任险">无</Descriptions.Item>
              <Descriptions.Item label="剩余课时">35/56</Descriptions.Item>
            </Descriptions>
            <Descriptions
              title="家庭情况"
              style={{
                marginBottom: 32,
              }}
            >
              <Descriptions.Item label="联系人">付小小</Descriptions.Item>
              <Descriptions.Item label="固定电话">18100000000</Descriptions.Item>
              <Descriptions.Item label="联系方式">180cm</Descriptions.Item>
              <Descriptions.Item label="微信号">56kg</Descriptions.Item>
              <Descriptions.Item label="监护人">无</Descriptions.Item>
              <Descriptions.Item label="监护人关系">无</Descriptions.Item>
              <Descriptions.Item label="监护人联系方式">无</Descriptions.Item>
              <Descriptions.Item label="家庭成员1姓名">无</Descriptions.Item>
              <Descriptions.Item label="家庭成员1年龄">无</Descriptions.Item>
              <Descriptions.Item label="家庭成员1关系">无</Descriptions.Item>
              <Descriptions.Item label="联系地址">广东省深圳市南山区桃园路219号567</Descriptions.Item>
            </Descriptions>
            <Divider
              style={{
                marginBottom: 32,
              }}
            />
            <div className={styles.title}>教育情况</div>
            <Table
              bordered
              rowKey='id'
              pagination={false}
              dataSource={customerInfo?.educationBoList || []}
              columns={columns}
            />
            <div className={styles.title}>家庭与生活调查表</div>
            <Table
              bordered
              rowKey='id'
              pagination={false}
              dataSource={customerInfo?.educationBoList || []}
              columns={columns}
            />
          </Card>
      }
    </PageContainer>
  );
};

export default BaseView;
