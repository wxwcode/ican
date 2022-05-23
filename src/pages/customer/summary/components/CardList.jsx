import { Avatar, Card } from 'antd';
import React from 'react';
import { history } from 'umi';
import styles from './styles.less';

const { Meta } = Card;

const MyCard = () => (
  <Card
    style={{
      width: 260,
      margin: '20px',
    }}
    cover={
      <img
        alt="example"
        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
      />
    }
    actions={[<a>预览查看</a>]}
  >
    <Meta
      avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
      title="第一周小结"
      description="上传时间： 2022-09-23"
    />
  </Card>
);
const CardList = () => {
  const goPath = (row) => {
    history.push(`/crm/reportdetail/${row.id}`);
  };
  const onChange = (key) => {
    console.log(key);
  };

  return (
    <div className={styles.cardBox}>
      <MyCard />
      <MyCard />
      <MyCard />
      <MyCard />
    </div>
  );
};

export default CardList;
