<script setup lang="ts">
import { computed, reactive } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const loginForm = reactive({
  username: '',
  password: '',
})

const page = computed(() => {
  const value = route.query.page
  if (typeof value !== 'string') {
    return ''
  }
  return value
})

const authAction = computed(() => {
  const path = '/auth'
  const query = page.value ? `?page=${encodeURIComponent(page.value)}` : ''
  return `${path}${query}`
})
</script>

<template>
  <div class="flex min-h-dvh items-center justify-center bg-(--el-bg-color-page) p-6">
    <el-card class="w-full max-w-105">
      <template #header>
        <div class="text-center text-xl font-semibold">用户登录</div>
      </template>
      <el-form :model="loginForm" :action="authAction" method="post" class="grid gap-2">
        <el-form-item>
          <template #label>
            <span class="w-15">用户名</span>
          </template>
          <el-input
            v-model="loginForm.username"
            name="username"
            placeholder="请输入用户名"
            autocomplete="username"
            required
          />
        </el-form-item>
        <el-form-item>
          <template #label>
            <span class="w-15">密码</span>
          </template>
          <el-input
            v-model="loginForm.password"
            name="password"
            type="password"
            placeholder="请输入密码"
            autocomplete="current-password"
            show-password
            required
          />
        </el-form-item>
        <el-button class="mt-2" type="primary" native-type="submit">登录</el-button>
      </el-form>
    </el-card>
  </div>
</template>
