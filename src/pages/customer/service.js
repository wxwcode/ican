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
export async function getCustomerById(params) {
  return request(`/api/student/detail`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    params,
  });
}
export async function createCustomer(data) {
  return request(`/api/student/save`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
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
export async function getStudentHeadInfo(params) {
  return request(`/api/estimate/getStudentHeadInfo`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    params,
  });
}
export async function queryEstimateList(params) {
  const { current, pageSize } = params;
  return request(`/api/estimate/queryEstimateList/${current}/${pageSize}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    params,
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

export async function createReport(data) {
  return request(`/api/estimate/saveEstimate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  });
}
