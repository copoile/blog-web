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
 * 删除文章
 * @param {Number} id
 */
export function deleteArticle(id) {
  return request.delete(`/article/delete/${id}`)
}

/**
 * 添加或更新推荐
 * @param {Object} params
 */
export function addRecommend(params) {
  return request({
    url: '/article/recommend/save',
    method: 'post',
    params: params
  })
}

/**
 * @description 推荐列表
 */
export function recommendList() {
  return request.get('/article/recommend/list')
}

/**
 * 移除推荐
 * @param {Number} id
 */
export function deleteRecommend(id) {
  return request.delete('/article/recommend/delete/' + id)
}

/**
 * @description 浏览文章
 * @param {Object} id
 */
export function viewArtilce(id) {
  return request.get('/article/view/' + id)
}

/**
 * 自增浏览次数
 * @param {Object} id
 */
export function incrementView(id) {
  return request.put('/article/increment_view/' + id)
}

/**
 * @description 相关文章
 * @param {Object} params
 */
export function interrelated(params) {
  return request.get('/article/interrelated/list', { params } )
}
