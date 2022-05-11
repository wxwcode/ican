import { request } from 'umi';
/** Update an existing pet PUT /pet */

export async function getRoleList(data) {
  const { pageSize, current, searchKey } = data
  return request(`/api/security/role/list/page/${current}/${pageSize}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    params: {
      searchKey
    }
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
export async function addRole(data) {
  return request(`/api/security/role`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data
  })
}
export async function updateRole(data) {
  return request(`/api/security/role`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data
  })
}
export async function deleteRole(roleId) {
  return request(`/api/security/role/${roleId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
