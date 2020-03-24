import request from '@/utils/request'

/**
 * 保存友链
 * @data {Object} data
 */
export function saveFriendLink(data) {
  return request.post('/friend/link/save', data)
}

/**
 * 分页获取友链
 * @param {Object} params
 */
export function pageFriendLink(params) {
  return request.get('/friend/link/page', { params })
}

/**
 * 友链列表
 */
export function listFriendLink() {
  return request.get('/friend/link/list')
}

/**
 * 删除友链
 * @param {Number} id
 */
export function deleteFriendLink(id) {
  return request.delete(`/friend/link/delete/${id}`)
}
