<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useDark, useToggle } from '@vueuse/core'
import { canAccessRole, fetchSession, type SessionUser } from '@/api/auth'
import { AppInfo } from '@/main'
import FeatherIcon from '@/components/FeatherIcon.vue'

const route = useRoute()
const isCollapse = ref(true)
const isDark = useDark()
const toggleDark = useToggle(isDark)
const sessionUser = ref<SessionUser>()
const isPlainLayout = computed(() => route.meta.plainLayout === true)
const canViewSettings = computed(() => canAccessRole(sessionUser.value?.role, ['admin']))

const linkToDoc = () => {
  if(AppInfo.docLink != undefined){
    window.open(AppInfo.docLink, "_blank")
  }
}

onMounted(async () => {
  try {
    const response = await fetchSession()
    if (response.authenticated === true) {
      sessionUser.value = response.user
    }
  } catch {
    sessionUser.value = undefined
  }
})
</script>

<template>
  <el-config-provider :namespace="'el'">
    <el-container v-if="!isPlainLayout" class="h-lvh">
      <el-header class="main-nav" height="64px">
        <el-row class="main-nav-row h-full" align="middle">
          <el-icon
            size="32"
            @click="isCollapse = !isCollapse"
            class="mx-5"
          >
            <FeatherIcon :name="isCollapse ? 'menu' : 'collapse-menu'" aria-label="折叠菜单图标" />
          </el-icon>
          <p class="mx-5 text-2xl">RS-AnimeLand</p>
          <div class="top-actions">
            <button
              class="theme-toggle"
              type="button"
              :aria-label="isDark ? '切换到浅色模式' : '切换到深色模式'"
              @click="toggleDark()"
            >
              <FeatherIcon v-if="isDark" name="sun" class="theme-icon" />
              <FeatherIcon v-else name="moon" class="theme-icon" />
            </button>
          </div>
        </el-row>
      </el-header>
      <el-container class="main-view">
        <el-menu :default-active="$route.path" class="left-menu" :collapse="isCollapse" router>
          <el-menu-item index="/">
            <el-icon size="32">
              <FeatherIcon name="home" aria-label="总览图标" />
            </el-icon>
            <template #title><span class="mx-4">总览</span></template>
          </el-menu-item>
          <el-divider />
          <el-menu-item index="undefined" @click="linkToDoc">
            <el-icon size="32">
              <FeatherIcon name="book" aria-label="文档图标" />
            </el-icon>
            <template #title>
              <span class="mx-4">
                项目文档
                <el-icon size="15">
                  <FeatherIcon name="external-link" aria-label="外部链接图标" class="menu-feather-secondary" />
                </el-icon>
              </span>
            </template>
          </el-menu-item>
          <el-menu-item index="/about">
            <el-icon size="32">
              <FeatherIcon name="info" aria-label="关于图标" />
            </el-icon>
            <template #title><span class="mx-4">关于</span></template>
          </el-menu-item>
        </el-menu>
        <el-main class="p-0!">
          <el-scrollbar>
            <router-view v-slot="{ Component }" class="p-5">
              <transition name="slide-fade">
                <component :is="Component" />
              </transition>
            </router-view>
          </el-scrollbar>
        </el-main>
      </el-container>
    </el-container>
    <router-view v-else />
  </el-config-provider>
</template>

<style scoped>
.el-menu--collapse {
  box-shadow: var(--el-box-shadow);
  border: 0;
  flex-shrink: 0 !important;
}

.left-menu:not(.el-menu--collapse) {
  width: 200px;
  box-shadow: var(--el-box-shadow);
  border: 0;
  flex-shrink: 0 !important;
}

.main-nav {
  padding: 0;
  box-shadow: var(--el-box-shadow);
}

.main-nav-row {
  width: 100%;
}

.top-actions {
  margin-left: auto;
  margin-right: 20px;
  display: flex;
  align-items: center;
}

.theme-toggle {
  border: 0;
  background: transparent;
  padding: 6px;
  border-radius: 8px;
  color: var(--el-text-color-primary);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.theme-toggle:hover {
  background: var(--el-fill-color-light);
}

.theme-toggle:focus-visible {
  outline: 2px solid var(--el-color-primary);
  outline-offset: 2px;
}

.theme-icon {
  width: 20px;
  height: 20px;
  stroke-width: 2;
}

.menu-feather-secondary {
  opacity: 0.75;
}

.main-view {
  height: calc(100dvh - 64px);
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(-20px);
  opacity: 0;
}
</style>
