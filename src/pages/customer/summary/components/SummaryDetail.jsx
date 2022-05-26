import React, { useEffect, useState } from 'react';
import { useParams } from 'umi';
import { PlusOutlined } from '@ant-design/icons';
import { Collapse, Menu, Button } from 'antd';
import CardList from './CardList';
import AddSummary from './AddSummary';
import { queryWeekMenuList } from '../../service';

const { Panel } = Collapse;
const { Item } = Menu;

const TableList = () => {
  const [selectKey, setSelectKey] = useState('2022');
  const [defaultActiveKey, setDefaultActiveKey] = useState([]);
  const [list, setList] = useState([]);
  const [years, setYears] = useState([]);
  const [months, setMonths] = useState([]);
  const { id } = useParams();

  /** 新建窗口的弹窗 */
  const [createVisible, handleVisible] = useState(false);

  useEffect(() => {
    queryWeekMenuList(id).then(({ data, status }) => {
      if (status === 0 && data && data.length) {
        setList(data);
        const yl = data.map((item) => item.year); // 设置年列表
        setYears(yl);
        setSelectKey(data[0].year); // 设置默认选择年份
        const ms = data[0].summaryMonthList;
        setDefaultActiveKey(ms ? [ms[0].month + ''] : []);
        setMonths(ms || []);

        console.log(ms[0].month, 'ms[0].month');
      }
    });
  }, []);
  const refresh = () => {
    queryWeekMenuList(id).then(({ data, status }) => {
      if (status === 0 && data && data.length) {
        setList(data);
        const yl = data.map((item) => item.year); // 设置年列表
        const ys = data.find((item) => item.year === selectKey);
        if (ys) {
          setMonths(ys.summaryMonthList || []);
        }
      }
    });
  };
  const clickMenu = (key) => {
    const ys = list.find((item) => item.year === key);
    setSelectKey(key);
    if (ys) {
      setMonths(ys.summaryMonthList || []);
      setDefaultActiveKey(ys.summaryMonthList[0] ? [ys.summaryMonthList[0].month] : []);
    }
  };
  const onChange = (key) => {
    console.log(key);
  };
  const getMenu = () => {
    return years.map((key) => <Item key={key}>{key}</Item>);
  };
  // const genExtra = () => (
  //   <PlusOutlined
  //     onClick={(event) => {
  //       event.stopPropagation();
  //     }}
  //   />
  // );
  return (
    <div>
      <Button
        style={{ float: 'right', marginBottom: '20px' }}
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => handleVisible(true)}
        size="small"
      >
        创建小结
      </Button>
      <div style={{ display: 'flex', width: '100%' }}>
        <div style={{ width: '100px', marginRight: '20px' }}>
          <Menu
            mode="inline"
            selectedKeys={[selectKey]}
            onClick={({ key }) => {
              clickMenu(key);
            }}
          >
            {getMenu()}
          </Menu>
        </div>
        {!!months && !!months.length ? (
          <Collapse
            style={{ flex: 1 }}
            defaultActiveKey={defaultActiveKey}
            onChange={onChange}
            expandIconPosition="right"
          >
            {months.map((month) => (
              <Panel
                header={`${month.month}月份`}
                key={month.month}
                // extra={genExtra()}
                forceRender={true}
              >
                <CardList
                  weekList={month.summaryWeekList}
                  summaryInfo={month.summaryInfoVO}
                  onChange={refresh}
                />
              </Panel>
            ))}
          </Collapse>
        ) : (
          <div>无数据</div>
        )}
      </div>
      <AddSummary
        visible={createVisible}
        studentId={id}
        handleVisible={handleVisible}
        reload={() => refresh()}
      />
    </div>
  );
};

export default TableList;
