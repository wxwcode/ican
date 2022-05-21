import { request } from 'umi';
/** Update an existing pet PUT /pet */

export async function getCustomerList(data) {
  return request(`/api/student/studentList`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  }).then((rep) => {
    const { list, pageNum, total } = rep.data;
    return {
      success: true,
      data: list,
      page: pageNum,
      total,
    };
  });
}
export async function getRenewalList(data) {
  return request(`/api/student/queryRenewalPayList`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  }).then((rep) => {
    const { list, pageNum, total } = rep.data;
    return {
      success: true,
      data: list,
      page: pageNum,
      total,
    };
  });
}
export async function updateCustomer(data) {
  return request(`/api/student/update`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  });
}
