import request from '@/utils/request'

/**
 * 新增分类
 * @data {Object} data
 */
export function addCategory(data) {
  return request.post('/category/add', data)
}

/**
 * 分页获取分类列表
 * @param {Object} params
 */
export function pageCategory(params) {
  return request.get('/category/page', { params })
}
/**
 * 获取分类列表
 */
export function categoryList() {
	return request.get('/category/list')
}
