import type { IAccount } from '@/types'
import hyRequest from '@/service'
//import { localCache } from '@/utils/cache'
//import { LOGIN_TOKEN } from '@/global/constants'

/**
 * 发送用户登录请求
 * @param account - 用户登录信息
 * @returns 返回一个Promise，包含登录结果
 */
export function accountLoginRequest(account: IAccount) {
  return hyRequest.post({
    url: '/login',
    data: account
  })
}

/**
 * 根据用户ID获取用户信息
 * @param id - 用户ID
 * @returns 返回一个Promise，包含用户信息
 */
export function getUserInfoById(id: number) {
  return hyRequest.get({
    url: `/users/${id}`
    // headers: {
    //   Authorization: localCache.getCache(LOGIN_TOKEN)
    // }
  })
}

/**
 * 根据角色ID获取用户权限(菜单menus)
 * @param id - 角色ID
 * @returns 返回一个Promise，包含用户权限
 */
export function getUserMenusByRoleId(id: number) {
  return hyRequest.get({
    url: `/role/${id}/menu`
  })
}
