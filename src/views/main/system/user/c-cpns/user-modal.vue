<template>
  <div class="modal">
    <el-dialog
      v-model="dialogVisible"
      :title="isNewRef ? '新建用户' : '编辑用户'"
      width="30%"
      center
    >
      <!-- 表单 -->
      <div class="form">
        <el-form :model="formData" label-width="auto" size="large">
          <el-form-item label="用户名">
            <el-input v-model="formData.name" placeholder="请输入用户名" />
          </el-form-item>
          <el-form-item label="真实姓名">
            <el-input v-model="formData.realname" placeholder="请输入真实姓名" />
          </el-form-item>
          <el-form-item v-if="isNewRef" label="密码">
            <el-input v-model="formData.password" placeholder="请输入密码" />
          </el-form-item>
          <el-form-item label="手机号码">
            <el-input v-model="formData.cellphone" placeholder="请输入手机号码" />
          </el-form-item>
          <el-form-item label="选择角色">
            <el-select v-model="formData.roleId" placeholder="请选择角色">
              <template v-for="item in entireRoles" :key="item.id">
                <el-option :label="item.name" :value="item.id" />
              </template>
            </el-select>
          </el-form-item>
          <el-form-item label="选择部门">
            <el-select v-model="formData.departmentId" placeholder="请选择部门">
              <template v-for="item in entireDepartments" :key="item.id">
                <el-option :label="item.name" :value="item.id" />
              </template>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="handleCancelClick">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick"> 确认 </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, defineExpose } from 'vue'
import useMainStore from '@/stores/main/main'
import useSystemStore from '@/stores/main/system/system'
import { storeToRefs } from 'pinia'

const systemStore = useSystemStore()
const mainStore = useMainStore()
mainStore.fetchEntireDataAction()
const { entireDepartments, entireRoles } = storeToRefs(mainStore)
const dialogVisible = ref(false)
const editData = ref()

const formData = reactive<any>({
  name: '',
  realname: '',
  password: '',
  cellphone: '',
  roleId: '',
  departmentId: ''
})

function handleConfirmClick() {
  // // 调用创建用户的接口
  // systemStore.createUserAction(formData)
  // // 重置表单
  // dialogVisible.value = false
  // // 重置表单数据
  // // 使用 Object.assign 来重置 formData 的值，因为 formData 是一个常量
  // Object.assign(formData, {
  //   name: '',
  //   realname: '',
  //   password: '',
  //   cellphone: '',
  //   roleId: '',
  //   departmentId: ''
  // })
  dialogVisible.value = false
  if (!isNewRef.value && editData.value) {
    // 编辑用户的数据
    console.log('编辑用户的数据', formData)
    systemStore.editUserAction(editData.value.id, formData)
  } else {
    // 创建新的用户
    systemStore.createUserAction(formData)
  }
}
function handleCancelClick() {
  dialogVisible.value = false
}

const isNewRef = ref(true)
// const editData = ref()
function handleModalClick(isNew: boolean = true, itemData?: any) {
  dialogVisible.value = true
  isNewRef.value = isNew
  if (!isNew && itemData) {
    for (const key in formData) {
      formData[key] = itemData[key]
    }
    editData.value = itemData
  } else {
    for (const key in formData) {
      formData[key] = ''
    }
    editData.value = null
  }
}

defineExpose({ handleModalClick })
</script>

<style lang="less" scoped>
.form {
  padding: 0 20px;
}
</style>
