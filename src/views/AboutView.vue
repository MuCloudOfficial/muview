<script setup lang="ts">
import { AppInfo } from '@/main'
</script>

<template>
  <el-space fill class="w-full">
    <el-card>
      <el-row>
        <el-col :span="50">
          <div class="text-5xl font-bold underline">{{ AppInfo.appName }}</div>
          <div class="text-xl -mt-0.5">Ver.{{ AppInfo.version }}</div>
        </el-col>
        <el-icon size="48" class="my-auto mx-5">
          <FeatherIcon name="x" />
        </el-icon>
        <el-col :span="50">
          <div class="text-5xl font-bold underline">MuView</div>
          <div class="text-xl -mt-0.5">Ver.TinyNova Beta V0</div>
        </el-col>
      </el-row>
      <div>Author: {{ AppInfo.dev.devName }}</div>
      <div>Not OpenSource.</div>
    </el-card>
  </el-space>
</template>

<style scoped>
.about-feather {
  stroke-width: 2;
  color: var(--el-text-color-secondary);
}

:deep(.el-divider__text) {
  background-color: var(--el-fill-color-blank);
}
</style>
