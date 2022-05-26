import { Avatar, Card, message } from 'antd';
import React from 'react';
import { history } from 'umi';
import yue from '@/asstes/yue.jpg';
import zhou from '@/asstes/zhou.jpg';
import styles from './styles.less';
import dayjs from 'dayjs';
import { deleteSummary } from '../../service';

const { Meta } = Card;

const MyCard = ({
  type,
  week,
  createDate,
  attachmentUrl,
  summaryId,
  weekList,
  summaryInfo,
  onChange,
}) => (
  <Card
    style={{
      width: 260,
      margin: '20px',
    }}
    cover={<img style={{ border: '1px solid #eee' }} alt="example" src={type ? yue : zhou} />}
    actions={[
      <a
        key="config"
        onClick={() => {
          if (attachmentUrl) window.open(attachmentUrl);
        }}
      >
        预览查看
      </a>,
      <a
        key="config1"
        style={{ color: 'red' }}
        onClick={() => {
          deleteSummary(summaryId).then(({ status }) => {
            if (status === 0) {
              message.success('已删除');
              onChange();
            }
          });
        }}
      >
        删除
      </a>,
    ]}
  >
    <Meta
      avatar={<Avatar src="/logo.png" />}
      title={type ? '月小结' : `第${week || '_'}周小结`}
      description={`上传时间： ${createDate ? dayjs(createDate).format('YYYY-MM-DD') : '未知'}`}
    />
  </Card>
);
const CardList = ({ weekList, summaryInfo, onChange }) => {
  return (
    <div className={styles.cardBox}>
      {!!weekList &&
        weekList.map((week, ind) => (
          <MyCard
            key={week.summaryId}
            week={week.week}
            onChange={onChange}
            {...week.summaryInfoVO}
          />
        ))}
      {!!summaryInfo && <MyCard onChange={onChange} type={1} {...summaryInfo} />}
    </div>
  );
};

export default CardList;
