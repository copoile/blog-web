import request from '@/utils/request'

/**
 * 
 * @data {Object} data
 */
export function pageClient(params) {
  return request.get('/client/page', { params })
}