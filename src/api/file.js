import request from '@/utils/request'

/**
 * @param {Object} params
 * @description 删除文件
 */
export function deleteFile(params) {
  return request.delete('/file/delete', { params })
}

/**
 * 分页获取文件
 * @param {Object} params
 */
export function pageFile(params) {
  return request.get('/file/page', { params })
}