import request from '@/utils/request'

/**
 * 新增标签
 * @params {Object} params
 */
export function addTag(params) {
  return request({
    url: '/tag/add',
    method: 'post',
    params: params
  })
}

/**
 * 分页获取标签列表
 * @param {Object} params
 */
export function pageTag(params) {
  return request.get('/tag/page', { params })
}

/**
 * 获取标签列表
 */
export function tagList() {
  return request.get('/tag/list')
}