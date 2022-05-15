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
export async function addUser(data) {
  return request(`/api/manager/user/createUser`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  });
}
export async function updateUser(data) {
  return request(`/api/manager/user/updateUser`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  });
}
