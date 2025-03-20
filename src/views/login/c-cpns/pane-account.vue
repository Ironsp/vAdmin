<template>
  <div class="pane-account">
    <el-form
      :model="account"
      :rules="accountrules"
      label-width="60px"
      size="large"
      status-icon
      ref="formRef"
    >
      <el-form-item label="帐号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
//引入集
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import type { IAccount } from '@/types/index'
import type { FormRules, ElForm } from 'element-plus'
import useLoginStore from '@/stores/login/login'
import { localCache } from '@/utils/cache'

//数据集
const CACHE_NAME = 'name'
const CACHE_PASSWORD = 'password'

const account = reactive<IAccount>({
  name: localCache.getCache(CACHE_NAME) ?? '',
  password: localCache.getCache(CACHE_PASSWORD) ?? ''
})

const accountrules: FormRules = {
  name: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{6,20}$/,
      message: '必须是6~20数字或字母组成~',
      trigger: 'blur'
    }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{3,}$/,
      message: '必须是3位以上数字或字母组成',
      trigger: 'blur'
    }
  ]
}

//执行账号的登录逻辑验证
const formRef = ref<InstanceType<typeof ElForm>>()
const loginStore = useLoginStore()
function loginAction(isRempwd: boolean) {
  //console.log(account.name, account.password)
  //console.log(isRempwd)
  formRef.value?.validate((valid) => {
    if (valid) {
      //console.log('验证成功')
      //像服务器发送请求
      //console.log(account.name, account.password)
      const { name, password } = account

      // 2.向服务器发送网络请求(携带账号和密码)
      loginStore.loginAccountAction({ name, password }).then((res) => {
        //3.判断是否需要记住密码
        //console.log(isRempwd)

        if (isRempwd == true) {
          localCache.setCache(CACHE_NAME, name)
          localCache.setCache(CACHE_PASSWORD, password)
        } else {
          localCache.removeCache(CACHE_NAME)
          localCache.removeCache(CACHE_PASSWORD)
        }
      })
    } else {
      console.log('验证失败')
      ElMessage.error('请输入正确的格式后再操作~~.')
    }
  })
}

defineExpose({
  loginAction
})
</script>

<style lang="less" scoped></style>
@/types/index
