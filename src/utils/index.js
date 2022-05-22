import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

export function confirm(content) {
  return new Promise((resolve) => {
    Modal.confirm({
      title: '请确认',
      icon: <ExclamationCircleOutlined />,
      content: content,
      okText: '确认',
      cancelText: '取消',
      onOk: () => resolve(true),
      onCancel: () => resolve(false),
    });
  });
}
export function getAge(birthday) {
  const b = new Date(birthday)
  const birArr = [b.getFullYear(), b.getMonth() + 1, b.getDate()]
  // 新建日期对象
  let date = new Date()
  // 今天日期，数组，同 birthday
  let today = [date.getFullYear(), date.getMonth() + 1, date.getDate()]
  // 分别计算年月日差值
  let age = today.map((value, index) => {
      return value - birArr[index]
  })
  // 当天数为负数时，月减 1，天数加上月总天数
  if (age[2] < 0) {
      // 简单获取上个月总天数的方法，不会错
      let lastMonth = new Date(today[0], today[1], 0)
      age[1]--
      age[2] += lastMonth.getDate()
  }
  // 当月数为负数时，年减 1，月数加上 12
  if (age[1] < 0) {
      age[0]--
      age[1] += 12
  }
  return `${age[0]}岁${age[1]}月${age[2]}天 `
}