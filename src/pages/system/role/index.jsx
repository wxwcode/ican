import { PlusOutlined } from '@ant-design/icons';
import { Button, Switch } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import AddForm from './components/AddForm';
import { getRoleList, updateRole } from './service';

const TableList = () => {
  /** 新建窗口的弹窗 */
  const [createVisible, handleVisible] = useState(false);
  const actionRef = useRef();
  const [currentRow, setCurrentRow] = useState();
  /** 国际化配置 */
  async function statusChange(record, action, v) {
    const { status } = await updateRole({ id: record.id, status: v ? 0 : 1 });
    if (status === 0) action?.reload();
  }
  return (
    <PageContainer waterMarkProps={{ gapX: 120, gapY: 100 }}>
      <ProTable
        headerTitle="查询表格"
        actionRef={actionRef}
        rowKey="id"
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              setCurrentRow(null);
              handleVisible(true);
            }}
          >
            <PlusOutlined /> 新建
          </Button>,
        ]}
        request={getRoleList}
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
            title: '序号',
            dataIndex: 'index',
            valueType: 'index',
            width: 48,
          },
          {
            title: '角色名称',
            dataIndex: 'name',
            copyable: true,
            ellipsis: true,
            formItemProps: {
              rules: [
                {
                  required: true,
                  message: '此项为必填项',
                },
              ],
            },
          },
          {
            title: '描述',
            search: false,
            dataIndex: 'description',
            ellipsis: true,
          },
          {
            title: '创建时间',
            search: false,
            key: 'showTime',
            dataIndex: 'creationDate',
            valueType: 'dateTime',
            sorter: true,
            hideInSearch: true,
            editable: false,
          },
          {
            title: '是否启用',
            search: false,
            dataIndex: 'status',
            render: (text, record, _, action) => {
              return (
                <Switch
                  size="small"
                  checked={record.status === 0}
                  onChange={(v) => statusChange(record, action, v)}
                />
              );
            },
            editable: false,
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
