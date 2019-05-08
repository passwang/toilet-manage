import http from '@/utils/http'
export function getReads(data) {
  return http.get('/api/read/getList', data)
}
export function addReads(data) {
  return http.post('/api/read/addList', data)
}
export function editReads(data) {
  return http.post('/api/read/editList', data)
}
export function deleteReads(data) {
  return http.get('/api/read/deleteList', data)
}
