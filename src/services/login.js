import { request } from 'umi';
/** Update an existing pet PUT /pet */

export async function login(params) {
  return request(`/api/sso/login`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    params,
  });
}
export async function updatePw(data) {
  return request(`/api/manager/reset/pass`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
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
