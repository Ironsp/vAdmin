<template>
  <div class="role">
    <page-search
      :search-config="searchConfig"
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    />
    <page-content
      ref="contentRef"
      :content-config="contentConfig"
      @NewUserClick="NewUserClick"
      @EditBtnClick="EditBtnClick"
    >
      <template #images="scope">
        <el-image
          style="width: 50px; height: 50px"
          :src="scope.row.imgUrl"
          :preview-src-list="[scope.row.imgUrl]"
          :preview-teleported="true"
        >
        </el-image>
      </template>
    </page-content>
    <page-modal :modal-config="modalConfig" ref="modalRef" />
  </div>
</template>

<script setup lang="ts" name="role">
/** 外部引入 */
import { ref, nextTick } from 'vue'
import { storeToRefs } from 'pinia'

import PageSearch from '@/components/page-search/page-search.vue'
import searchConfig from './config/search.config'
import usePageSearch from '@/hooks/usePageSearch'

import PageContent from '@/components/page-content/page-content.vue'
import contentConfig from './config/content.config'

import PageModal from '@/components/page-modal/page-modal.vue'
import modalConfig from './config/modal.config'

import useMainStore from '@/stores/main/main'

import type { ElTree } from 'element-plus'

const treeRef = ref<InstanceType<typeof ElTree>>()

/** search组件 */

const { contentRef, handleQueryClick, handleResetClick } = usePageSearch()

/** contant组件 */
const modalRef = ref<any>()

function NewUserClick() {
  //console.log('新建用户')
  modalRef.value?.handleModalClick()
}
function EditBtnClick(itemData: any) {
  //console.log('完整的itemData:', itemData) // 先查看完整数据结构
  modalRef.value?.handleModalClick(false, itemData)

  // 拿取itemDate中的menuList的权限id
  const menuIds = mapMenuListToIds(itemData.menuList)
  function mapMenuListToIds(menuList: any[]) {
    const ids: number[] = []
    function recurseGetId(menus: any[]) {
      for (const item of menus) {
        if (item.children) {
          recurseGetId(item.children)
        } else {
          ids.push(item.id)
        }
      }
    }
    recurseGetId(menuList)
    return ids
  }
  console.log('menuIds:', menuIds)

  // 如果需要设置选中的菜单节点
  nextTick(() => {
    // 设置选中的菜单节点
    treeRef.value?.setCheckedKeys(menuIds)
  })
}

/** modal组件 */
// const mainStore = useMainStore()
// const { entireMenus } = storeToRefs(mainStore)

// const otherInfo = ref({})
// function handleEltreeCheck(data1: any, data2: any) {
//   const menuList = [...data2.checkedKeys, ...data2.halfCheckedKeys]
//   otherInfo.value = { menuList }
//   console.log(otherInfo.value)
// }
</script>

<style scoped>
.role {
  margin-top: 10px;
  .images {
    margin: 0 auto;
    position: relative;
    z-index: 999;
  }
}
.slot {
  display: flex;
  justify-content: start;
  align-items: center;
}
</style>
