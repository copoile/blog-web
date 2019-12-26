import request from '@/utils/request'

/**
 * @param {Object} params
 * @description 删除文件
 */
export function deleteFile(params) {
  return request.delete('/file/delete', { params })
}