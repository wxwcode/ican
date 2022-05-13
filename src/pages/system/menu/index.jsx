import React, { useEffect, useRef, useState, useCallback } from 'react';
import TreeList, { updata, formatData } from './components/TreeList';
import ProForm, {
  ProFormText,
  ProFormSelect,
  ProFormSwitch,
  ModalForm,
} from '@ant-design/pro-form';
import { getList, saveMenu, deleteMenu } from './service';
import { EditOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { Tree, Tooltip, Button } from 'antd';
import { confirm } from '@/utils';
import { PageContainer } from '@ant-design/pro-layout';
import styles from './index.less';

function updateTreeData(list, id, children) {
  return list.map((node) => {
    if (node.id === id) {
      return {
        ...node,
        children,
      };
    }
    if (node.children) {
      return {
        ...node,
        children: updateTreeData(node.children, id, children),
      };
    }
    return node;
  });
}

export default function Menu(props) {
  const [menuList, setMenuList] = useState([]); // 菜单列表
  const [currentEditrMenu, setCurrentEditrMenu] = useState(null); // 当前编辑的菜单，null为编辑顶级菜单
  const [editType, setEditType] = useState('add'); // 编辑类型
  const [createModalVisible, handleModalVisible] = useState(false); // 是否显示创建编辑窗口
  const formRef = useRef();
  useEffect(() => {
    getList().then((data) => {
      setMenuList(data);
    });
  }, []);
  const [selectMenuKeys, setSelectMenuKeys] = useState([]);
  const onLoadData = useCallback(async (item) => {
    let data = await getList(item?.id);
    if (item?.id) {
      // 非顶层菜单更新
      setMenuList((origin) => updateTreeData(origin, item.id, data));
    } else {
      // 添加顶层菜单
      let ids = menuList.map((item) => item.id);
      let addItems = data.filter((item) => !ids.includes(item.id));
      setMenuList([...menuList, ...addItems]);
    }
  }, []);
  // 添加 ｜ 编辑菜单
  useEffect(() => {
    if (createModalVisible && currentEditrMenu && editType === 'updata') {
      formRef?.current?.setFieldsValue({
        displayText: currentEditrMenu?.displayText || '',
        url: currentEditrMenu?.url || '',
        icon: currentEditrMenu?.icon || '',
        orderNo: currentEditrMenu?.sort || '',
        status: !!currentEditrMenu?.status,
      });
    } else if (createModalVisible && editType === 'add') {
      formRef.current.resetFields();
    }
  }, [editType, currentEditrMenu, createModalVisible]);
  return (
    <>
      <PageContainer
        className={`ant-perfect ${styles.pageContainer}`}
        extraContent={
          <Tooltip title="添加顶级菜单">
            <Button
              type="primary"
              onClick={(e) => {
                e.stopPropagation();
                setEditType('add');
                setCurrentEditrMenu(null);
                handleModalVisible(true);
              }}
            >
              添加菜单
            </Button>
          </Tooltip>
        }
      >
        <div className={styles.menuPage}>
          <div className={styles.pageLeft}>
            <Tree
              blockNode
              defaultExpandAll={true}
              className={styles.treeList}
              titleRender={(data) => (
                <div className={styles.treeTitle}>
                  <div className={styles.flex_1}>{data.displayText || data.name}</div>
                  <div className={styles.operation}>
                    {data.type !== 2 && (
                      <>
                        <Tooltip title="编辑菜单">
                          <EditOutlined
                            className={styles.iconBtn}
                            title="编辑菜单"
                            onClick={(e) => {
                              e.stopPropagation();
                              setCurrentEditrMenu(data);
                              handleModalVisible(true);
                              setEditType('updata');
                              setSelectMenuKeys([data.key]);
                            }}
                          />
                        </Tooltip>
                        <Tooltip title="添加子菜单">
                          <PlusOutlined
                            className={styles.iconBtn}
                            title="添加子菜单"
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditType('add');
                              setCurrentEditrMenu(data);
                              setSelectMenuKeys([data.key]);
                              handleModalVisible(true);
                            }}
                          />
                        </Tooltip>
                      </>
                    )}
                    <Tooltip title="删除当前菜单">
                      <DeleteOutlined
                        className={styles.iconBtn}
                        title="删除当前菜单"
                        onClick={async (e) => {
                          e.stopPropagation();
                          if (await confirm('删除不可回复请确认是否删除')) {
                            let response = await deleteMenu(data.id);
                            if (response.status === 0) {
                              let newList = updata(menuList, 'id', data, data, 'delete');
                              setMenuList(newList);
                            }
                          }
                        }}
                      />
                    </Tooltip>
                  </div>
                </div>
              )}
              treeData={menuList}
              selectedKeys={selectMenuKeys}
              loadData={onLoadData}
            />
          </div>
        </div>
      </PageContainer>
      <ModalForm
        formRef={formRef}
        title={
          <>
            {editType === 'updata' ? '编辑' : '添加'}
            <span style={{ color: 'red' }}>{currentEditrMenu?.displayText || '第一层'}</span>
            {editType === 'add' && currentEditrMenu?.displayText ? '子' : ''}菜单
          </>
        }
        visible={createModalVisible}
        onVisibleChange={handleModalVisible}
        width="600px"
        layout="horizontal"
        labelAlign="right"
        labelCol={{ span: 5 }}
        style={{ minWidth: 500 }}
        submitter={{
          resetButtonProps:
            editType === 'updata'
              ? {
                  style: {
                    // 隐藏重置按钮
                    display: 'none',
                  },
                }
              : {},
        }}
        onFinish={async (value) => {
          let response = await saveMenu({
            ...value,
            sort: Number(value.sort) || 0,
            status: value.status ? 1 : 0,
            id: editType === 'updata' ? currentEditrMenu.id : null,
            parentId:
              editType === 'updata'
                ? currentEditrMenu.parentId
                : currentEditrMenu
                ? currentEditrMenu.id
                : 0,
          });
          if (response.status === 0 && editType !== 'add') {
            let newItem = {
              ...value,
              id: currentEditrMenu.id,
              key: currentEditrMenu.id + Date.now(),
            };
            if (editType === 'updata') {
              setCurrentEditrMenu(newItem);
            }
            setMenuList(updata(menuList, 'id', currentEditrMenu, newItem, editType));
            handleModalVisible(false);
          } else if (response.status === 0 && editType === 'add') {
            onLoadData(currentEditrMenu);
            handleModalVisible(false);
          }
        }}
      >
        <ProFormText
          label="菜单名称"
          rules={[
            {
              required: true,
              message: '请填写菜单名称',
            },
          ]}
          placeholder="请填写菜单名称"
          width="md"
          name="displayText"
        />
        <ProFormText
          label="菜单地址"
          rules={[
            {
              required: true,
              message: '请填写菜单地址',
            },
          ]}
          placeholder="请填写菜单地址"
          width="md"
          name="url"
        />
        <ProFormText label="菜单图标" placeholder="请填写菜单图标" width="md" name="icon" />
        <ProFormText
          label="菜单排序"
          initialValue={0}
          placeholder="请填写菜单排序"
          width="md"
          name="orderNo"
        />
        <ProFormSwitch label="是否显示菜单" name="status" initialValue={false} />
      </ModalForm>
    </>
  );
}
