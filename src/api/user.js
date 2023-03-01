import request1 from '@/utils/user_request'
// 登录
export function login(data) {
  return request1({
    url: '/admin/acl/index/login',
    method: 'post',
    data
  })
}
// 获取用户信息
export function getInfo(token) {
  return request1({
    url: '/admin/acl/index/info',
    method: 'get',
    params: { token }
  })
}
// 退出登录
export function logout() {
  return request1({
    url: '/admin/acl/index/logout',
    method: 'post'
  })
}
