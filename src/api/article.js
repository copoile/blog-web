import request from '@/utils/request'

/**
 * 保存文章
 * @data {Object} data
 */
export function saveArticle(data) {
  return request.post('/article/save', data)
}

/**
 * 文章详情（后台）
 * @param {Object} id
 */
export function articleDetail(id) {
  return request.get(`/article/detail/${id}`)
}

/**
 * 分页获取文章（后台）
 * @param {Object} params
 */
export function pageArticle(params) {
  return request.get('/article/page', { params })
}

/**
 * 分页获取已发布文章（前台）
 * @param {Object} params
 */
export function pagePublishedArticle(params) {
  return request.get('/article/published/page', { params })
}

/**
 * @description 推荐列表
 */
export function recommendList() {
  return request.get('/article/recommend/list')
}

