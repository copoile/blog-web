import request from '@/utils/request'

/**
 * 分页获取归档
 * @data {Object} data
 */
export function pageArchives(params) {
  return request.get('/article/archives/page', { params })
}