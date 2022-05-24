import { Avatar, Card } from 'antd';
import React from 'react';
import { history } from 'umi';
import yue from '@/asstes/yue.jpg'
import zhou from '@/asstes/zhou.jpg'
import styles from './styles.less';

const { Meta } = Card;

const MyCard = ({type}) => (
  <Card
    style={{
      width: 260,
      margin: '20px',
    }}
    cover={
      <img
        style={{border: '1px solid #eee'}}
        alt="example"
        src={type ? yue : zhou}
      />
    }
    actions={[<a>预览查看</a>]}
  >
    <Meta
      avatar={<Avatar src="/logo.png" />}
      title={type ? '月小结' : "第X周小结"}
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
      <MyCard type={1}/>
    </div>
  );
};

export default CardList;
