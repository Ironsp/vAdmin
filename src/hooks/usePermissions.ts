import useLoginStore from '@/stores/login/login'
import { storeToRefs } from 'pinia'

function usePermissions(permissionID: string) {
  const loginStore = useLoginStore()
  const { permission } = storeToRefs(loginStore)
  return !!permission.value.find((item) => item.includes(permissionID))
}

export default usePermissions
