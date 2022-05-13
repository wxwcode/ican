import { request } from 'umi';
/** Update an existing pet PUT /pet */

export async function getList(id = 0) {
  return request(`/api/sitemap/sitemap/list/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(({ data }) => {
    // const { list, pageNum, total } = rep.data;
    // if (rep.status === 0)
    return data;
  });
}
export async function saveMenu(data) {
  const { id } = data;

  return request(`/api/sitemap/${id ? 'update' : 'create'}`, {
    method: id ? 'PUT' : 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  });
}
export async function updateRole(data) {
  return request(`/api/sitemap/role`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  });
}
export async function deleteMenu(id) {
  return request(`/api/sitemap/delete/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
