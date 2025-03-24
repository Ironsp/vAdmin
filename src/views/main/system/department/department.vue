<template>
  <div class="department">
    <page-search
      :search-config="searchConfig"
      @queryClick="handleQueryClick"
      @resetClick="handleResetClick"
    />
    <page-modal :modal-config="modalConfig" ref="modalRef" />
    <page-contant
      :content-config="contentConfig"
      ref="contentRef"
      @NewUserClick="NewUserClick"
      @EditBtnClick="EditBtnClick"
    />
  </div>
</template>

<script setup lang="ts" name="department">
import { ref } from 'vue'

import PageSearch from '@/components/page-search/page-search.vue'
import searchConfig from './config/search.config'

import PageModal from '@/components/page-modal/page-modal.vue'
import modalConfig from './config/modal.config'

import PageContant from '@/components/page-content/page-content.vue'
import contentConfig from './config/content.config'

const contentRef = ref<any>()
const modalRef = ref<any>()

/** search页面方法 */
function handleQueryClick(formData: any) {
  console.log('数据:', formData)
  contentRef.value?.fetchpageistData(formData)
}
function handleResetClick() {
  contentRef.value?.fetchpageistData()
}
/** contant页面方法 */
function NewUserClick() {
  console.log('新建用户')
  modalRef.value?.handleModalClick()
}
function EditBtnClick(itemData: any) {
  modalRef.value?.handleModalClick(false, itemData)
}
</script>

<style scoped>
.user {
  border-radius: 10px;
  overflow: hidden;
}
</style>
