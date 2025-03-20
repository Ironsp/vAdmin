import {
  postUsersListDate,
  deleteUserById,
  newUserData,
  editUserData,
  postPageListDate,
  deletePageById,
  newPageData,
  editPageData
} from '@/service/main/system/system'
import { defineStore } from 'pinia'
import type { ISystemState } from './type'

const useSystemStore = defineStore('system', {
  state: (): ISystemState => ({
    usersList: [],
    usersTotalCount: 0,
    pageList: [],
    pageTotalCount: 0
  }),
  actions: {
    /** 用户的网络请求状态 */
    //1.获取用户列表
    async postUsersListAction(queryInfo: any) {
      const usersListResult = await postUsersListDate(queryInfo)
      const { list, totalCount } = usersListResult.data
      this.usersList = list
      this.usersTotalCount = totalCount
    },
    //2.删除用户
    async deleteUserByIdAction(id: number) {
      //删除数据
      const res = await deleteUserById(id)
      console.log(res)
      //重新请求数据
      this.postUsersListAction({ offset: 0, size: 10 })
    },
    //3.创建用户
    async createUserAction(data: any) {
      //创建数据
      const res = await newUserData(data)
      //重新请求数据
      this.postUsersListAction({ offset: 0, size: 10 })
    },
    //4.编辑用户
    async editUserAction(id: number, userInfo: any) {
      //编辑数据
      // const res = await editUserData(data)
      const editResult = await editUserData(id, userInfo)
      console.log(editResult)
      //重新请求数据
      this.postUsersListAction({ offset: 0, size: 10 })
    },

    /** 页面的网络请求状态 */
    //1.获取页面列表
    async postPageListAction(pageName: string, queryInfo: any) {
      const pageListResult = await postPageListDate(pageName, queryInfo)
      const { list, totalCount } = pageListResult.data
      this.pageList = list
      this.pageTotalCount = totalCount
    },
    //2.删除页面
    async deletePageByIdAction(pageName: string, id: number) {
      //删除数据
      const res = await deletePageById(pageName, id)
      console.log(res)
      //重新请求数据
      this.postPageListAction(pageName, { offset: 0, size: 10 })
    },
    //3.创建页面
    async createPageAction(pageName: string, pageInfo: any) {
      //创建数据
      const res = await newPageData(pageName, pageInfo)
      //重新请求数据
      this.postPageListAction(pageName, { offset: 0, size: 10 })
    },
    //4.编辑页面
    async editPageAction(pageName: string, id: number, pageInfo: any) {
      //编辑数据
      const res = await editPageData(pageName, id, pageInfo)
      //重新请求数据
      this.postPageListAction(pageName, { offset: 0, size: 10 })
    }
  },
  getters: {}
})

export default useSystemStore
