<template>
  <div class="modal">
    <el-dialog
      v-model="dialogVisible"
      :title="isNewRef ? modalConfig.header?.newTitle : modalConfig.header?.editTitle"
      width="30%"
      center
    >
      <!-- 表单 -->
      <div class="form">
        <el-form :model="formData" label-width="auto" size="large">
          <template v-for="item in modalConfig.formItems" :key="item.prop">
            <template v-if="item.type === 'custom'">
              <slot :name="item.slotName"></slot>
            </template>
            <template v-else>
              <el-form-item :label="item.label">
                <el-input v-model="formData[item.prop]" :placeholder="item.placeholder" />
              </el-form-item>
            </template>
          </template>
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

interface Iprops {
  modalConfig: {
    pageName: string
    header?: {
      newTitle: string
      editTitle: string
    }
    formItems: any[]
  }
  otherInfo?: any
}
const props = defineProps<Iprops>()

const formData = reactive<any>({})
//formData添加数据
for (const item of props.modalConfig.formItems) {
  formData[item.prop] = ''
}

function handleConfirmClick() {
  dialogVisible.value = false

  let infoData = formData
  if (props.otherInfo) {
    infoData = { ...infoData, ...props.otherInfo }
  }

  if (!isNewRef.value && editData.value) {
    // 编辑用户的数据
    //console.log('编辑用户的数据', formData)
    systemStore.editPageAction(props.modalConfig.pageName, editData.value.id, infoData)
  } else {
    // 创建新的用户
    //console.log('新用户数据', formData)
    systemStore.createPageAction(props.modalConfig.pageName, infoData)
  }
}
function handleCancelClick() {
  dialogVisible.value = false
}

function handleModalClick(isNew: boolean = true, itemData?: any) {
  dialogVisible.value = true
  isNewRef.value = isNew
  //console.log('itemData', itemData)
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
