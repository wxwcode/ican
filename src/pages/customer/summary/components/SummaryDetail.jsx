import { PlusOutlined } from '@ant-design/icons';
import { Collapse, Menu } from 'antd';
import React, { useRef, useState } from 'react';
import CardList from './CardList';

const { Panel } = Collapse;
const { Item } = Menu;
const menuMap = ['2022', '2021', '2020', '2019'];

const TableList = () => {
  const actionRef = useRef();
  const [selectKey, setSelectKey] = useState('2022');
  const onChange = (key) => {
    console.log(key);
  };
  const getMenu = () => {
    return menuMap.map((key) => <Item key={key}>{key}</Item>);
  };
  const genExtra = () => (
    <PlusOutlined
      onClick={(event) => {
        event.stopPropagation();
      }}
    />
  );
  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: '100px', marginRight: '20px' }}>
        <Menu
          mode="inline"
          selectedKeys={[selectKey]}
          onClick={({ key }) => {
            setSelectKey(key);
          }}
        >
          {getMenu()}
        </Menu>
      </div>
      <Collapse defaultActiveKey={['1']} onChange={onChange} expandIconPosition="right">
        <Panel header="5月份" key="1" extra={genExtra()}>
          <CardList />
        </Panel>
        <Panel header="4月份" key="2" extra={genExtra()}>
          <CardList />
        </Panel>
        <Panel header="3月份" key="3" extra={genExtra()}>
          <CardList />
        </Panel>
      </Collapse>
    </div>
  );
};

export default TableList;
