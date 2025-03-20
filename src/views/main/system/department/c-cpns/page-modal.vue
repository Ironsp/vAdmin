<template>
  <div class="modal">
    <el-dialog
      v-model="dialogVisible"
      :title="isNewRef ? '新建部门' : '编辑部门'"
      width="30%"
      center
    >
      <!-- 表单 -->
      <div class="form">
        <el-form :model="formData" label-width="auto" size="large">
          <el-form-item label="部门名称">
            <el-input v-model="formData.name" placeholder="请输入部门名称" />
          </el-form-item>
          <el-form-item label="部门领导">
            <el-input v-model="formData.leader" placeholder="请输入部门领导" />
          </el-form-item>
          <el-form-item label="选择部门">
            <el-select v-model="formData.parentId" placeholder="请选择部门">
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
const isNewRef = ref(true)

const formData = reactive<any>({
  name: '',
  leader: '',
  parentId: ''
})

function handleConfirmClick() {
  dialogVisible.value = false

  if (!isNewRef.value && editData.value) {
    // 编辑用户的数据
    console.log('编辑用户的数据', formData)
    systemStore.editPageAction('department', editData.value.id, formData)
  } else {
    // 创建新的用户
    console.log('新用户数据', formData)
    systemStore.createPageAction('department', formData)
  }
}
function handleCancelClick() {
  dialogVisible.value = false
}

function handleModalClick(isNew: boolean = true, itemData?: any) {
  dialogVisible.value = true
  isNewRef.value = isNew
  console.log('itemData', itemData)
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
