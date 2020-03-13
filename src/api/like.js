import request from '@/utils/request'


/**
 * @description 是否已点赞
 * @param {Object} articleId
 */
export function isLiked(articleId) {
  return request.get(`/article/like/liked/${articleId}`)
}

/**
 * @description 新增点赞
 * @param {Object} params
 */
export function addLike(params){
  return request({
    url: '/article/like/add',
    method: 'post',
    params: params
  })
}

/**
 * @description 取消点赞
 * @param {Object} params
 */
export function cancelLiked(params) {
  return request.delete('/article/like/cancel', { params })
}

