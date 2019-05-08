import http from '@/utils/http'
export function getComments(data) {
  return http.get('/api/comment/getList', data)
}
export function saveComment(data) {
  return http.post('/api/comment/saveList', data)
}
