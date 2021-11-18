import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/bootservice/api/login',
    method: 'post',
    data
  })
}

export function logout(token) {
  return request({
    url: '/bootservice/api/logout',
    method: 'get'
  })
}

export function getInfo(token) {
  return request({
    url: '/bootservice/api/current',
    method: 'get',
    params: { token }
  })
}

/*获取当前用户菜单 */
export function getRoutes(token) {
  return request({
    url: '/bootservice/api/menus',
    method: 'get',
    params: { token }
  })
}

/*
获取用户分页列表
*/
export function getUserPageList(data) {
  return request({
    url: '/bootservice/api/parkSysUsers',
    method: 'get',
    params: data
  })
}
/*
新增用户
*/
export function addUser(data) {
  return request({
    url: '/bootservice/api/parkSysUsers',
    method: 'post',
    data: data
  })
}
/**
 * 
 * @param {修改用户} data 
 * @returns 
 */
export function updateUser(data) {
  return request({
    url: '/bootservice/api/parkSysUsers',
    method: 'put',
    data: data
  })
}
/*
删除用户
*/
export function delUserById(id) {
  return request({
    url: '/bootservice/api/parkSysUsers/'+id,
    method: 'delete'
  })
}

/**
 * 修改其他用户的密码
 * @param {id,password,loginId} data 
 * @returns 
 */
export function changeOtherPsd(data) {
  return request({
    url: '/bootservice/api/parkSysUsers/password/change/other',
    method: 'post',
    data: data
  })
}

/**
 * 获取用户详情
 * @param {*} id 
 * @returns 
 */
export function getUserInfo(id) {
  return request({
    url: '/bootservice/api/parkSysUsers/' + id,
    method: 'get'
  })
}
