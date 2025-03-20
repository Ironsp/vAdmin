<template>
  <div class="contant">
    <!-- 1.头部 -->
    <div class="header">
      <h3>{{ contentConfig?.header?.title ?? '数据列表' }}</h3>
      <template v-if="!!contentConfig.header.btnTitle">
        <el-button type="primary" @click="handleNewUserClick">
          {{ contentConfig.header?.btnTitle }}
        </el-button>
      </template>
    </div>
    <!-- 2. 表格 -->
    <div class="table">
      <el-table :data="pageList" border style="width: 100%" v-bind="contentConfig.childrenTree">
        <template v-for="item in contentConfig?.propsList ?? []" :key="item.prop">
          <template v-if="item.type === 'timer'">
            <el-table-column align="center" v-bind="item">
              <template #default="scope">
                {{ formatUTC(scope.row[item.prop]) }}
              </template>
            </el-table-column>
          </template>
          <template v-else-if="item.type === 'handler'">
            <el-table-column align="center" v-bind="item">
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
          </template>
          <template v-else-if="item.type === 'images'">
            <el-table-column align="center" v-bind="item">
              <template #default="scope">
                <slot name="images" :row="scope.row"></slot>
              </template>
            </el-table-column>
          </template>
          <template v-else>
            <el-table-column align="center" v-bind="item" show-overflow-tooltip />
          </template>
        </template>
      </el-table>
    </div>
    <!-- 3. 分页器 -->
    <div class="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30, 40]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageTotalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import useSystemStore from '@/stores/main/system/system'
import { storeToRefs } from 'pinia'
import { ref, defineProps, defineEmits } from 'vue'
import { formatUTC } from '@/utils/format'
import useLoginStore from '@/stores/main/login/login'

const loginStore = useLoginStore()
const { permission } = storeToRefs(loginStore)
const isCreate = ref(permission.value.)
const isUpdate = ref(false)
const isDelete = ref(false)
const isQuery = ref(false)

interface IProps {
  contentConfig: {
    pageName: string
    header?: {
      title?: string
      btnTitle?: string
    }
    propsList: any[]
    childrenTree?: any
  }
}
const props = defineProps<IProps>()

// 1. 发起Action, 请求usersList的数据
const systemStore = useSystemStore()
const currentPage = ref(1)
const pageSize = ref(10)
fetchpageistData()

// 2.获取usersList的数据.进行展示
const { pageList, pageTotalCount } = storeToRefs(systemStore)

/** 页码逻辑代码集 */
function handleSizeChange(val: number) {
  fetchpageistData()
}
function handleCurrentChange(val: number) {
  fetchpageistData()
}

/** page列表网络请求 */
function fetchpageistData(formData: any = {}) {
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  const pageInfo = { offset, size }
  const queryInfo = { ...formData, ...pageInfo }
  systemStore.postPageListAction(props.contentConfig.pageName, queryInfo)
}
/** 表格操作 */
const emit = defineEmits(['NewUserClick', 'EditBtnClick'])
function handleDeleteBtnClick(id: number) {
  console.log('删除', id)
  // 发起删除请求
  systemStore.deletePageByIdAction(props.contentConfig.pageName, id)
}
function handleEditBtnClick(itemDate: any) {
  emit('EditBtnClick', itemDate)
  //console.log('handleEditBtnClick', itemDate)
}
function handleNewUserClick() {
  emit('NewUserClick')
}

defineExpose({
  fetchpageistData
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
  .imgs {
    width: 50px;
    height: 50px;
  }
}
.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>
