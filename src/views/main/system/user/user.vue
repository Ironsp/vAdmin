<template>
  <div class="user">
    <user-search @queryClick="handleQueryClick" @resetClick="handleResetClick" />
    <user-contant
      ref="contentRef"
      @NewUserClick="NewUserClick"
      @EditBtnClick="EditBtnClick"
    ></user-contant>
    <user-modal ref="modalRef"></user-modal>
  </div>
</template>

<script setup lang="ts" name="user">
// 引入组件
import { ref } from 'vue'
import userSearch from './c-cpns/user-search.vue'
import userModal from './c-cpns/user-modal.vue'
import userContant from './c-cpns/user-contant.vue'

const contentRef = ref<any>()
const modalRef = ref<any>()

/** search页面方法 */
function handleQueryClick(formData: any) {
  console.log('数据:', formData)

  contentRef.value?.fetchUserListData(formData)
}
function handleResetClick() {
  contentRef.value?.fetchUserListData()
}
/** contant页面方法 */
function NewUserClick() {
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
