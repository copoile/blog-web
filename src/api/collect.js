import request from '@/utils/request'


/**
 * @description 是否已收藏
 * @param {Object} articleId
 */
export function isCollected(articleId) {
  return request.get(`/article/collect/collected/${articleId}`)
}

/**
 * @description 新增收藏
 * @param {Object} params
 */
export function addCollect(params){
  return request({
    url: '/article/collect/add',
    method: 'post',
    params: params
  })
}

/**
 * @description 取消收藏
 * @param {Object} params
 */
export function cancelCollected(params) {
  return request.delete('/article/collect/delete', { params })
}
