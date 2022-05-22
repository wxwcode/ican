export const genderList = [
  {
    label: '男',
    value: '0',
  },
  {
    label: '女',
    value: '1',
  },
];
export const evaluationLevelList = [
  {
    label: '工作体验（L1）',
    desc: '工作体验',
    value: 'L1',
  },
  {
    label: '工作体验（L2）',
    desc: '工作体验',
    value: 'L2',
  },
  {
    label: '工作体验（L3）',
    desc: '工作体验',
    value: 'L3',
  },
  {
    label: '工作体验（L4）',
    desc: '工作体验',
    value: 'L4',
  },
  {
    label: '实习生（L5）',
    desc: '实习生',
    value: 'L5',
  },
  {
    label: '员工（L6）',
    desc: '员工',
    value: 'L6',
  },
];
export const studentSourceList = [
  {
    label: '家长转介',
    value: '家长转介',
  },
  {
    label: '机构转介',
    value: '机构转介',
  },
  {
    label: '直访到家',
    value: '直访到家',
  },
  {
    label: '美团大众',
    value: '美团大众',
  },
];
export const customerStatusList = [
  {
    label: '观摩',
    value: 1,
  },
  {
    label: '测评',
    value: 2,
  },
  {
    label: '体验',
    value: 3,
  },
  {
    label: '实习1',
    value: 4,
  },
  {
    label: '实习2',
    value: 5,
  },
  {
    label: '就业',
    value: 6,
  },
  {
    label: '结课',
    value: 7,
  },
];
export const guardianRelationList = [
  {
    label: '父亲',
    value: '父亲',
  },
  {
    label: '母亲',
    value: '母亲',
  },
  {
    label: '兄弟姐妹',
    value: '兄弟姐妹',
  },
  {
    label: '亲戚',
    value: '亲戚',
  },
  {
    label: '其他',
    value: '其他',
  },
];
export const servicePlaceList = [
  {
    label: 'Ican深圳',
    value: 'Ican深圳',
  },
  {
    label: 'Ican广州',
    value: 'Ican广州',
  },
];
const payStatusList = [
  {
    label: '正常',
    value: 0,
    color: '#eee',
  },
  {
    label: '评估',
    value: 1,
    color: 'green',
  },
  {
    label: '续费',
    value: 2,
    color: 'red',
  },
];
function setMap(v) {
  const map = {};
  v.forEach((item) => {
    map[item.value] = item.label;
  });
  return map;
}
export const servicePlaceMap = () => {
  const map = {};
  servicePlaceList.forEach((item) => {
    map[item.value] = item.label;
  });
  return map;
};
export const customerStatusMap = () => {
  const map = {};
  customerStatusList.forEach((item) => {
    map[item.value] = item.label;
  });
  return map;
};
export const payStatusMap = () => {
  return setMap(payStatusList);
};
export const getPayColor = (status) => {
  const obj = payStatusList.find((item) => item.value === status);
  if (obj && obj.color) return obj.color;
  return '';
};
