import request from '@/utils/request'

/**
 * @param {Object} params
 * @description 分页获取评论回复列表
 */
export function pageComment(params) {
  return request.get('/article/comment/page', { params })
}

/**
 * @description 新增评论
 * @param {Object} params
 */
export function addComment(params) {
  return request({
    url: '/article/comment/add',
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
    url: '/article/reply/add',
    method: 'post',
    params: params
  })
}

/**
 * @description 删除评论
 * @param {Object} params
 */
export function deleteComment(params) {
  return request.delete('/article/comment/delete', { params })
}

/**
 * @description 删除回复
 * @param {Object} params
 */
export function deleteReply(params) {
  return request.delete('/article/reply/delete', { params })
}

/**
 * @description 最新评论
 * @param {Object} params
 */
export function latestCommentList(params) {
  return request.get('/article/comment/latest', { params })
}
