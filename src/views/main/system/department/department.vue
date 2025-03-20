<template>
  <div class="department">
    <page-search @queryClick="handleQueryClick" @resetClick="handleResetClick" />
    <page-modal ref="modalRef" />
    <page-contant ref="contentRef" @NewUserClick="NewUserClick" @EditBtnClick="EditBtnClick" />
  </div>
</template>

<script setup lang="ts" name="department">
import PageSearch from './c-cpns/page-search.vue'
//import PageSearch from '@/components/page-search/page-search.vue'
import { ref } from 'vue'
import PageModal from './c-cpns/page-modal.vue'
import PageContant from './c-cpns/page-contant.vue'

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
