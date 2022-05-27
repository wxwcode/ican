import { PlusOutlined } from '@ant-design/icons';
import { Button, Image, Tag } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { getCustomerList } from './service';
import { servicePlaceMap, customerStatusMap } from '@/utils/config';
import { history } from 'umi';

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
    color: '#a0e769',
  },
  4: {
    label: '实习1',
    value: 4,
    color: '#fadb14',
  },
  5: {
    label: '实习2',
    value: 5,
    color: '#817e3a',
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
  /** 国际化配置 */
  const goPath = (row) => {
    // history.push(`/crm/reportdetail/${row.id}`);
    history.push({
      pathname: '/crm/reportdetail',
      query: {
        id: row.id,
      },
    });
  };
  return (
    <PageContainer waterMarkProps={{ gapX: 120, gapY: 100 }}>
      <ProTable
        headerTitle="查询表格"
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
        }}
        actionRef={actionRef}
        rowKey="id"
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              history.push('/crm/create');
            }}
          >
            <PlusOutlined /> 创建客户
          </Button>,
        ]}
        request={getCustomerList}
        columns={[
          {
            title: '序号',
            dataIndex: 'index',
            valueType: 'index',
            width: 48,
          },
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
            title: '服务老师',
            dataIndex: 'serviceTeacher',
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
            title: '客户状态',
            dataIndex: 'customerStatus',
            filters: true,
            onFilter: true,
            hideInTable: true,
            valueType: 'select',
            valueEnum: customerStatusMap(),
          },
          {
            title: '客户经理',
            dataIndex: 'customerManager',
            valueType: 'text',
          },
          {
            title: '客户状态',
            dataIndex: 'customerStatus',
            search: false,
            render: (key, record) => (
              <Tag style={{ width: '60px', textAlign: 'center' }} color={colorMap[key].color}>
                {colorMap[key].label}
              </Tag>
            ),
          },
          {
            title: '报告',
            dataIndex: 'file',
            search: false,
            render: (file, row) => (
              <Button size="small" type="primary" onClick={() => goPath(row)}>
                查看报告
              </Button>
            ),
          },
          {
            title: '操作',
            width: 160,
            valueType: 'option',
            render: (_, record) => [
              <a
                key="config2"
                onClick={() => {
                  history.push({
                    pathname: '/crm/detail',
                    query: {
                      userId: record.id,
                    },
                  });
                }}
              >
                详情
              </a>,
              <a
                key="config"
                onClick={() => {
                  history.push({
                    pathname: '/crm/create',
                    query: {
                      userId: record.id,
                    },
                  });
                }}
              >
                编辑
              </a>,
            ],
          },
        ]}
      />
    </PageContainer>
  );
};

export default TableList;
