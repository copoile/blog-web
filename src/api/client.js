import request from '@/utils/request'

/**
 * 
 * @data {Object} data
 */
export function pageClient(params) {
  return request.get('/client/page', { params })
}

/**
 * 保存客户端
 * @param {Object} data
 */
export function saveClient(data) {
  return request.post('/client/save', data)
}

/**
 * 删除客户端
 * @param {Object} id
 */
export function deleteClient(id) {
  return request.delete('/client/delete/' + id)
}