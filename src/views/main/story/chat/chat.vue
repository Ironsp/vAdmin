<template>
  <editor />
  <div class="editor">
    <button @click="reSet">重置</button>
    <button @click="getDate">保存</button>
  </div>
</template>

<script setup lang="ts">
import editor from './c-cpns/editor.vue'
const reSet = () => {
  console.log('重置')
}

function getDate() {
  console.log('保存')
}
</script>

<style scoped>
.editor {
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 30px;

  /* border: 1px solid red; */
  height: 50px;
}
</style>
