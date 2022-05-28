/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
const roleMap = {
  admin: 1, // 超级管理员
  admin1: 2, // 普通管理
  server: 3, // 服务老师
  customer: 4, // 客户经理

}
export default function access(initialState) {
  const { currentUser } = initialState || {};
  let canAdmin = false
  let canAdmin1 = false
  let canServer = false
  let canCustomer = false
  if (currentUser && currentUser.roleIds && currentUser.roleIds.length) {
    const { roleIds } = currentUser
    canAdmin = roleIds.some(id => id === roleMap['admin'])
    canAdmin1 = roleIds.some(id => id === roleMap['admin'] || id === roleMap['admin1'])
    canServer = roleIds.some(id => id === roleMap['admin'] || id === roleMap['server'] || id === roleMap['admin1'])
    canCustomer = roleIds.some(id => id === roleMap['admin'] || id === roleMap['customer'] || id === roleMap['admin1'])
  }
  return {
    canAdmin,
    canAdmin1,
    canServer,
    canCustomer
  };
}
