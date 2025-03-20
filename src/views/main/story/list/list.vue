<template>
  <div class="role">
    <page-content ref="contentRef" :content-config="contentConfig" />
  </div>
</template>

<script setup lang="ts" name="role">
import contentConfig from './config/content.config.ts'
</script>

<style scoped>
.role {
  margin-top: 10px;
}
.slot {
  display: flex;
  justify-content: start;
  align-items: center;
}
</style>
