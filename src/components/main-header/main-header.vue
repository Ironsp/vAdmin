<template>
  <div class="main-header">
    <div class="meun-icon" @click="handleMenuIconClick">
      <el-icon size="21px">
        <component :is="isFold ? 'Expand' : 'Fold'" />
      </el-icon>
    </div>
    <div class="content">
      <HeaderCrumb />
      <HeaderInfo />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import HeaderCrumb from './c-cpns/header-crumb.vue'
import HeaderInfo from './c-cpns/header-info.vue'

//内部自定义事件
const emit = defineEmits(['foldChange'])

const isFold = ref(false)
function handleMenuIconClick() {
  //alert('点击了菜单图标')
  isFold.value = !isFold.value

  // 触发自定义事件
  emit('foldChange', isFold.value)
}
</script>

<style lang="less" scoped>
.main-header {
  display: flex;
  align-items: center;
  flex: 1;
  height: 100%;

  .menu-icon {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 18px;
  }

  // .breadcrumb,
  // .info {
  //   display: flex;
  //   align-items: center; // 确保图片和文字垂直居中对齐
  // }
}
</style>
