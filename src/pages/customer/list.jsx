import { PlusOutlined } from '@ant-design/icons';
import { Button, Image } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { getCustomerList } from './service';

const TableList = () => {
  const actionRef = useRef();
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
              // TODO: 新建客户
            }}
          >
            <PlusOutlined /> 创建客户
          </Button>,
        ]}
        request={getCustomerList}
        columns={[
          {
            title: '操作',
            width: 60,
            valueType: 'option',
            render: (_, record) => [
              <a
                key="config"
                onClick={() => {
                  // formRef.current.edit(data)
                  setCurrentRow({ ...record });
                  handleVisible(true);
                }}
              >
                编辑
              </a>,
            ],
          },
          {
            title: '头像',
            search: false,
            dataIndex: 'avatar',
            render: (dom, entity) =>
              entity.avatar && entity?.avatar?.startsWith('http') ? (
                <Image src={entity.avatar} width={20} height={20} />
              ) : (
                '-'
              ),
          },
          {
            title: '客户名称',
            dataIndex: 'searchKey',
            valueType: 'text',
            hideInTable: true,
          },
          {
            title: '客户名称',
            dataIndex: 'name',
            valueType: 'text',
            search: false,
          },
          {
            title: '客户经理',
            dataIndex: 'customerManager',
            search: false,
          },
          {
            title: '手机号',
            dataIndex: 'linePhone',
            search: false,
          },
          {
            title: '服务老师',
            search: false,
            dataIndex: 'serviceTeacher',
          },
          {
            title: '客户状态',
            dataIndex: 'customerStatusDesc',
            search: false,
          },
          {
            title: '注册时间',
            dataIndex: 'registerDate',
            search: false,
            valueType: 'date',
          },
        ]}
      />
    </PageContainer>
  );
};

export default TableList;
