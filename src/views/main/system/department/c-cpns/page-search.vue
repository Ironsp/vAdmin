<template>
  <div class="search">
    <!-- 1.输入搜索关键的表单 -->
    <el-form ref="formRef" label-width="70px" size="large" :model="searchForm">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="部门名称" prop="name">
            <el-input v-model="searchForm.name" placeholder="请输入查询的部门名称" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="部门领导" prop="realname">
            <el-input v-model="searchForm.leader" placeholder="请输入查询的部门领导" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="创建时间" prop="createAt">
            <el-date-picker
              v-model="searchForm.createAt"
              type="daterange"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!-- 2.重置和搜索按钮 -->
    <div class="btns">
      <el-button @click="handleResetClick">重置</el-button>
      <el-button type="primary" @click="handleQueryClick">搜索</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

const searchForm = reactive({
  name: '',
  leader: '',
  createAt: ''
})

const emit = defineEmits(['resetClick', 'queryClick'])

const formRef = ref<any>()
function handleResetClick() {
  formRef.value?.resetFields()
  emit('resetClick')
}

function handleQueryClick() {
  console.log('searchForm')

  emit('queryClick', searchForm)
}

defineExpose({
  handleResetClick,
  handleQueryClick
})
</script>

<style lang="less" scoped>
.search {
  background-color: #fff;
  padding: 20px;

  .el-form-item {
    padding: 20px 30px;
    margin-bottom: 0;
  }
  .btns {
    text-align: right;
    padding: 0 45px 10px 0;
  }
}
</style>
