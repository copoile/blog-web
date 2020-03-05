import request from '@/utils/request'

/**
 * @param {Object} params
 * @description 分页获取留言
 */
export function pageMessage(params) {
  return request.get('/leave/message/page', { params })
}

/**
 * @description 新增留言
 * @param {Object} params
 */
export function addMessage(params) {
  return request({
    url: '/leave/message/add',
    method: 'post',
    params: params
  })
}

/**
 * @description 新增回复
 * @param {Object} params
 */
export function addReply(params) {
  return request({
    url: '/leave/message/reply',
    method: 'post',
    params: params
  })
}

/**
 * @description 删除留言或回复
 * @param {Object} id
 */
export function deleteO(id) {
  return request.delete('/leave/message/delete/' + id)
}
