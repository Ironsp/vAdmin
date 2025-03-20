<template>
  <div class="contant">
    <!-- 1.头部 -->
    <div class="header">
      <h3>用户列表</h3>
      <el-button type="primary" @click="handleNewUserClick">新增用户</el-button>
    </div>
    <!-- 2. 表格 -->
    <div class="table">
      <el-table :data="usersList" border style="width: 100%">
        <el-table-column align="center" type="selection" width="45" />
        <el-table-column align="center" type="index" label="序号" width="55" />
        <el-table-column align="center" prop="name" label="用户名" width="120" />
        <el-table-column align="center" prop="realname" label="真实名" width="100" />
        <el-table-column align="center" prop="cellphone" label="手机号码" width="150" />
        <el-table-column align="center" prop="enable" label="状态" width="80">
          <template #default="scope">
            <el-button size="small" :type="scope.row.enable ? 'primary' : 'danger'" round>
              <span v-if="scope.row.enable === 2">禁用</span>
              <span v-else>启用</span>
            </el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="createAt" label="创建时间">
          <template #default="scope">
            {{ formatUTC(scope.row.createAt) }}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="updateAt" label="更新时间">
          <template #default="scope">
            {{ formatUTC(scope.row.updateAt) }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="150">
          <template #default="scope">
            <el-button
              size="small"
              icon="Edit"
              type="primary"
              @click="handleEditBtnClick(scope.row)"
              text
            >
              编辑
            </el-button>
            <el-button
              size="small"
              icon="Delete"
              type="danger"
              @click="handleDeleteBtnClick(scope.row.id)"
              text
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 3. 分页器 -->
    <div class="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30, 40]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="usersTotalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import useSystemStore from '@/stores/main/system/system'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { formatUTC } from '@/utils/format'

// 1. 发起Action, 请求usersList的数据
const systemStore = useSystemStore()
const currentPage = ref(1)
const pageSize = ref(10)
fetchUserListData()
// 2.获取usersList的数据.进行展示
const { usersList, usersTotalCount } = storeToRefs(systemStore)

/** 页码逻辑代码集 */
function handleSizeChange(val: number) {
  fetchUserListData()
}
function handleCurrentChange(val: number) {
  fetchUserListData()
}
/** page网络请求 */
function fetchUserListData(formData: any = {}) {
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  const pageInfo = { offset, size }
  const queryInfo = { ...formData, ...pageInfo }
  systemStore.postUsersListAction(queryInfo)
}

/** 表格操作 */
const emit = defineEmits(['NewUserClick', 'EditBtnClick'])
function handleDeleteBtnClick(id: number) {
  console.log('删除', id)
  systemStore.deleteUserByIdAction(id)
}
function handleEditBtnClick(itemDate: any) {
  emit('EditBtnClick', itemDate)
}
function handleNewUserClick() {
  emit('NewUserClick')
}

defineExpose({
  fetchUserListData
})
</script>

<style lang="less" scoped>
.contant {
  margin-top: 20px;
  padding: 20px;
  background-color: #fff;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}
.table {
  margin-top: 12px;
  .el-button {
    margin-left: 0;
    padding: 5px 8px;
  }
}
.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>
