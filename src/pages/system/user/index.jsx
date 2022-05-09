import { PlusOutlined } from '@ant-design/icons';
import { Button, Image } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import AddForm from './components/AddForm';
import { getUserList } from '@/services/system/user/';


const TableList = () => {
  /** 新建窗口的弹窗 */
  const [createVisible, handleVisible] = useState(false);
  const actionRef = useRef();
  const [currentRow, setCurrentRow] = useState();
  /** 国际化配置 */

  return (
    <PageContainer waterMarkProps={{ gapX: 120, gapY: 100}}>
      <ProTable
        headerTitle="查询表格"
        actionRef={actionRef}
        rowKey="id"
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              setCurrentRow(null)
              handleVisible(true);
            }}
          >
            <PlusOutlined /> 新建
          </Button>,
        ]}
        request={getUserList}
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
                  setCurrentRow({...record })
                  handleVisible(true);
                }}
              >
                编辑
              </a>
            ],
          },
          {
            title: '用户名称',
            dataIndex: 'searchKey',
            valueType: 'text',
            hideInTable: true
          },
          {
            title: '用户名称',
            dataIndex: 'name',
            valueType: 'text',
            search: false,
          },
          {
            title: '头像',
            search: false,
            dataIndex: 'avatar',
            render: (dom, entity) => entity.avatar && entity?.avatar?.startsWith('http') ? (<Image src={entity.avatar
} width={20} height={20} />) : '-'
          },
          {
            title: '性别',
            dataIndex: 'gender',
            search: false,
          },
          {
            title: '手机号',
            dataIndex: 'mobile',
            search: false,
          },
          {
            title: '昵称',
            dataIndex: 'nickname',
            search: false,
          },
          {
            title: '邮箱',
            search: false,
            dataIndex: 'email',
          },
          {
            title: '状态',
            dataIndex: 'status',
            search: false,
            valueEnum: {
              0: {
                text: '禁用',
                status: 'Error',
              },
              1: {
                text: '启用',
                status: 'Processing',
              },
            },
          },
          {
            title: '创建时间',
            dataIndex: 'createTime',
            search: false,
            render: (dom, entity) => entity.createTime ? dayjs(entity.createTime).format('YYYY-MM-DD HH:mm:ss') : '-'
          },
          {
            title: '最后登录时间',
            dataIndex: 'loginTime',
            search: false,
            render: (dom, entity) => entity.loginTime ? dayjs(entity.loginTime).format('YYYY-MM-DD HH:mm:ss') : '-'
          },
        ]}
      />
      <AddForm
        visible={createVisible}
        currentData={currentRow}
        handleVisible={handleVisible}
        reload={() => {
          actionRef?.current?.reload();
        }}
      />
    </PageContainer>
  );
};

export default TableList;
