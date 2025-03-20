import { getEntireRoles, getEntireDepartments, getEntireMenu } from '@/service/main/main'
import { defineStore } from 'pinia'
interface IMainState {
  entireRoles: any[]
  entireDepartments: any[]
  entireMenus: any[]
}
const useMainStore = defineStore('main', {
  state: (): IMainState => ({
    entireRoles: [],
    entireDepartments: [],
    entireMenus: []
  }),
  actions: {
    // 获取所有的角色和部门
    async fetchEntireDataAction() {
      const rolesResult = await getEntireRoles()
      const departmentsResult = await getEntireDepartments()
      const meunsResult = await getEntireMenu()
      const roles = rolesResult.data.list
      const departments = departmentsResult.data.list
      const menus = meunsResult.data.list
      this.entireRoles = roles
      this.entireDepartments = departments
      this.entireMenus = menus
    }
  }
})
export default useMainStore
