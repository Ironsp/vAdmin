<template>
  <div></div>
  <div style="border: 1px solid #ccc; margin-top: 10px">
    <Toolbar
      :editor="editorRef"
      :defaultConfig="toolbarConfig"
      :mode="mode"
      style="border-bottom: 1px solid #ccc"
    />
    <Editor
      :defaultConfig="editorConfig"
      :mode="mode"
      v-model="valueHtml"
      style="height: 400px; overflow-y: hidden"
      @onCreated="handleCreated"
    />
  </div>
</template>

<script setup lang="ts">
import '@wangeditor/editor/dist/css/style.css'
import { onBeforeUnmount, ref, shallowRef, onMounted } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

// 编辑器实例，必须用 shallowRef，重要！
const editorRef = shallowRef()

// 内容 HTML
const valueHtml = ref('')

// 模拟 ajax 异步获取内容
onMounted(() => {
  setTimeout(() => {
    valueHtml.value = ''
    console.log('valueHtml', valueHtml.value)
  }, 1500)
})
console.log('valueHtml', valueHtml.value)

const toolbarConfig = {}
const editorConfig = { placeholder: '请输入内容...' }

// 组件销毁时，也及时销毁编辑器，重要！
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return

  editor.destroy()
})

// 编辑器回调函数
const handleCreated = (editor) => {
  console.log('created', editor)
  editorRef.value = editor // 记录 editor 实例，重要！
}
</script>

<style scoped>
.handlEditorActive {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid red;
  height: 200px;

  margin-top: 900px;
}
</style>
