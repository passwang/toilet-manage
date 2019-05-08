import http from '@/utils/http'
export function login(data) {
  return http.post('/api/admin/login', data)
}
export function logout() {
  return http.post('/api/user/logout')
}
