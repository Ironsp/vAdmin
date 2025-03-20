import { defineStore } from 'pinia'
import { accountLoginRequest, getUserInfoById, getUserMenusByRoleId } from '@/service/login/login'
import type { IAccount } from '@/types'
import { localCache } from '@/utils/cache'
import { mapMenusToRoutes } from '@/utils/map-menus'
import router from '@/router'
import { LOGIN_TOKEN } from '@/global/constants'
import { get } from 'vant/lib/utils'
import { ITEM_RENDER_EVT } from 'element-plus/es/components/virtual-list/src/defaults.mjs'

interface ILoginState {
  token: string
  userInfo: any
  userMenus: any
  permission: any
}

const useLoginStore = defineStore('login', {
  // 如何制定state的类型
  state: (): ILoginState => ({
    token: '',
    userInfo: {},
    userMenus: [],
    permission: []
  }),
  actions: {
    async loginAccountAction(account: IAccount) {
      // 1.账号登录, 获取token等信息
      const loginResult = await accountLoginRequest(account)
      const id = loginResult.data.id
      this.token = loginResult.data.token
      localCache.setCache(LOGIN_TOKEN, this.token)

      // 2.获取登录用户的详细信息(role信息)
      const userInfoResult = await getUserInfoById(id)
      const userInfo = userInfoResult.data
      this.userInfo = userInfo

      // 3.根据角色请求用户的权限(菜单menus)
      const userMenusResult = await getUserMenusByRoleId(this.userInfo.role.id)
      const userMenus = userMenusResult.data
      this.userMenus = userMenus
      console.log('userMenus菜单: ', userMenus)

      // 获取角色权限标识 permission
      function menuMapToPermissions(userMenus: any[]) {
        const permission: string[] = []

        function getMenuPermission(menus: any[]) {
          for (const menu of menus) {
            if (menu.type === 1 || menu.type === 2) {
              getMenuPermission(menu.children ?? [])
            } else if (menu.type === 3) {
              permission.push(menu.permission)
            }
          }
        }
        getMenuPermission(userMenus)
        return permission
      }
      const permission = menuMapToPermissions(userMenus)
      this.permission = permission
      console.log('permission权限: ', permission)

      // 4.进行本地缓存
      localCache.setCache('userInfo', userInfo)
      localCache.setCache('userMenus', userMenus)

      // 重要: 动态的添加路由
      const routes = mapMenusToRoutes(userMenus)
      routes.forEach((route) => router.addRoute('main', route))

      // 5.页面跳转(main页面)
      router.push('/main')
    },
    /** 刷新时候加载本地缓存的数据 */
    loadLocalCacheAction() {
      // 1.加载本地缓存的数据
      const token = localCache.getCache(LOGIN_TOKEN)
      const userInfo = localCache.getCache('userInfo')
      const userMenus = localCache.getCache('userMenus')
      if (token && userInfo && userMenus) {
        this.token = token
        this.userInfo = userInfo
        this.userMenus = userMenus

        // 2.动态添加路由
        const routes = mapMenusToRoutes(userMenus)
        routes.forEach((route) => router.addRoute('main', route))
      }
    }
  }
})

export default useLoginStore
