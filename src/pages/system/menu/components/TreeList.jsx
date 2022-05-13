import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Tree } from 'antd';
import styles from './index.less';

/**
 * 更新菜单（含： 新增、插入、更新、删除）
 * @param treeData 树结构数据
 * @param idKey 要判断数据是否相等的字段
 * @param currentData 当前要操作的菜单数据, 没有时候表示插入顶层数据
 * @param newData 新数据
 * @param type 操作类型 'delete'：删除， 'add': 添加， 'updata'： 更新
 */
export function updata(treeData, idKey = 'id', currentData, newData, type) {
  let newTreeData = [...treeData];
  function loop(data) {
    for (let i = 0, len = data.length; i < len; i++) {
      let item = data[i];
      if (item[idKey] === currentData[idKey]) {
        if (type === 'add') {
          item.children = item.children || [];
          item.children.push(newData);
        } else if (type === 'delete') {
          data.splice(i, 1);
          len--;
        } else if (type === 'updata') {
          data[i] = newData;
        }
        break;
      } else if (item.children) {
        loop(item.children);
      }
    }
  }
  if (type === 'add' && !currentData) {
    newTreeData.push(newData);
  } else {
    loop(newTreeData);
  }
  return newTreeData;
}
/**
 * 根据扁平化列表数据 格式化 出树结构数据
 * @param list 列表数据
 * @param idKey
 * @param parentIdKey
 */
export function formatData(list, idKey = 'id', parentIdKey = 'parentId') {
  let newList = [];
  let oMenuList = {};
  list.forEach((item) => {
    // 将当前菜单数据进行初始化
    item.key = item[idKey];
    item.title = item.title || item.name;
    item.children = item.children || [];
    // 先将当前对象进行缓存
    if (oMenuList[item[idKey]]) {
      // 如果已经有子菜单依赖进行缓存过则进行合并
      oMenuList[item[idKey]] = { ...item, ...oMenuList[item[idKey]] }; // 因为缓存的只有children，且缓存有最新的数据，所以要用缓存的数据覆盖当前的数据
    } else {
      oMenuList[item[idKey]] = item;
    }
    // 层级依赖关系处理
    if (!item[parentIdKey]) {
      // 如果当前菜单没有父级依赖则表示为顶级
      newList.push(item);
    } else {
      // 非顶级则缓存到缓存对象中
      let parentItem = oMenuList[item[parentIdKey]];
      if (!parentItem) {
        // 如果当前父级未遍历到，则进行缓存
        parentItem = oMenuList[item[parentIdKey]] = { children: [] };
      }
      parentItem.children.push(item); // 将当前菜单放到父级中的子集队列中
    }
  });
  return newList;
}

// 树列表组件
export default function TreeList(props) {
  const titleRender = (data) => (
    <div className={styles.treeTitle}>
      <div className={styles.flex_1}>{data.title || data.name}</div>
      <div className={styles.operation}>
        {props.treeProps.renderOperation ? props.treeProps.renderOperation(data, styles) : null}
      </div>
    </div>
  );
  return (
    <PageContainer className="ant-perfect">
      <div className={styles.menuPage}>
        <div className={styles.pageLeft}>
          <Tree
            blockNode
            defaultExpandAll={true}
            className={styles.treeList}
            titleRender={props.titleRender || titleRender}
            {...props.treeProps}
          />
        </div>
        <div className={styles.pageRight}>
          <div className={styles.pageBorder} />
          <div className={styles.form}>{props.children}</div>
        </div>
      </div>
    </PageContainer>
  );
}
