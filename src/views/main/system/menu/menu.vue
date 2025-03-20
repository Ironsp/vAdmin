<template>
  <div class="role">
    <page-content
      ref="contentRef"
      :content-config="contentConfig"
      @NewUserClick="NewUserClick"
      @EditBtnClick="EditBtnClick"
    />
    <page-modal :modal-config="modalConfig" ref="modalRef" />
  </div>
</template>

<script setup lang="ts" name="role">
/** 外部引入 */
import { ref } from 'vue'

import PageContent from '@/components/page-content/page-content.vue'
import contentConfig from './config/content.config'

import PageModal from '@/components/page-modal/page-modal.vue'
import modalConfig from './config/modal.config'

/** contant组件 */
const modalRef = ref<any>()
console.log(modalRef)

function NewUserClick() {
  console.log('新建用户')
  modalRef.value?.handleModalClick()
}
function EditBtnClick(itemData: any) {
  console.log('编辑用户')
  modalRef.value?.handleModalClick(false, itemData)
}

/** modal组件 */
</script>

<style scoped>
.role {
  margin-top: 10px;
}
</style>
