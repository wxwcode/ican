import { getPayColor, payStatusMap, servicePlaceMap } from '@/utils/config';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { VerticalAlignBottomOutlined } from '@ant-design/icons';
import { Button, Image, Tag } from 'antd';
import UploadExport from './components/UploadExport'
import EditCourse from './components/EditCourse'
import React, { useRef, useState } from 'react';
import { history } from 'umi';
import { getRenewalList } from './service';

const colorMap = {
  1: {
    label: '观摩',
    value: 1,
    color: '#a0bdd8',
  },
  2: {
    label: '测评',
    value: 2,
    color: '#88b0d5',
  },
  3: {
    label: '体验',
    value: 3,
    color: 'green',
  },
  4: {
    label: '实习1',
    value: 4,
    color: '#cddc39',
  },
  5: {
    label: '实习2',
    value: 5,
    color: 'yellow',
  },
  6: {
    label: '就业',
    value: 6,
    color: '#f44336',
  },
  7: {
    label: '结课',
    value: 7,
    color: '#2196f3',
  },
};
const TableList = () => {
  const actionRef = useRef();
  const [ visible, handleVisible ] = useState(false)
  const [ editVisible, handleEditVisible ] = useState(false)
  const [ currentData, setCurrentData ] = useState(null)

  
  /** 国际化配置 */

  return (
    <PageContainer waterMarkProps={{ gapX: 120, gapY: 100 }}>
      <ProTable
        headerTitle="查询表格"
        actionRef={actionRef}
        rowKey="id"
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleVisible(true)
            }}
          >
            <VerticalAlignBottomOutlined /> 导入更新
          </Button>,
        ]}
        request={getRenewalList}
        columns={[
          {
            title: '头像',
            search: false,
            dataIndex: 'avatar',
            render: (dom, entity) =>
              entity.avatar && entity?.avatar?.startsWith('http') ? (
                <Image src={entity.avatar || '/logo.png'} width={20} height={20} />
              ) : (
                <Image src="/logo.png" width={24} height={24} />
              ),
          },
          {
            title: '注册时间',
            dataIndex: 'created_at',
            valueType: 'dateRange',
            hideInTable: true,
            search: {
              transform: (value) => {
                return {
                  registerDateStart: value[0] ? new Date(value[0]).getTime() : null,
                  registerDateEnd: value[1] ? new Date(value[1]).getTime() : null,
                };
              },
            },
          },
          {
            title: '客户姓名',
            dataIndex: 'name',
            valueType: 'text',
          },
          {
            title: '注册时间',
            dataIndex: 'registerDate',
            search: false,
            valueType: 'date',
          },
          {
            title: '客户经理',
            dataIndex: 'customerManager',
            valueType: 'text',
          },
          {
            title: '服务中心',
            dataIndex: 'servicePlace',
            filters: true,
            onFilter: true,
            hideInTable: true,
            valueType: 'select',
            valueEnum: servicePlaceMap(),
          },
          {
            title: '服务中心',
            dataIndex: 'servicePlace',
            search: false,
            valueType: 'text',
          },
          {
            title: '续费状态',
            dataIndex: 'payStatus',
            filters: true,
            onFilter: true,
            hideInTable: true,
            valueType: 'select',
            valueEnum: payStatusMap(),
          },
          {
            title: '续费状态',
            dataIndex: 'renewalPayStatusDesc',
            search: false,
            render: (key, record) => <Tag color={getPayColor(record.payStatus)}>{key}</Tag>,
          },
          {
            title: '剩余课时',
            dataIndex: 'totalClassHours',
            search: false,
            render: (key, record) => (
              <Tag color={getPayColor(record.payStatus)}>
                {record.availableClassHours}/{record.totalClassHours}
              </Tag>
            ),
          },
          {
            title: '档案',
            dataIndex: 'totalClassHours',
            search: false,
            render: (file, record) => (
              <Button
                type="primary"
                onClick={() => {
                  history.push({
                    pathname: '/crm/detail',
                    query: {
                      userId: record.id,
                    },
                  });
                }}
              >查看档案</Button>
            ),
          },
          {
            title: '操作',
            width: 100,
            valueType: 'option',
            render: (_, record) => [
              <a
              key="config"
              onClick={() => {
                setCurrentData({...record})
                handleEditVisible(true)
              }}
            > 
              更新课时
            </a>,
            ],
          },
        ]}
      />
      <UploadExport
        visible={visible}
        reload={() => {
          actionRef?.current?.reload();
        }}
        handleVisible={handleVisible}
      />
      <EditCourse
        visible={editVisible}
        reload={() => {
          actionRef?.current?.reload();
        }}
        handleVisible={handleEditVisible}
        currentData={currentData}
      />
    </PageContainer>
  );
};

export default TableList;
