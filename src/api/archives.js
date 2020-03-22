import request from '@/utils/request'

/**
 * 保存文章
 * @data {Object} data
 */
export function pageArchives(params) {
  return request.get('/article/archives/page', { params })
}