import { createRouter, createWebHistory } from 'vue-router'
import { canAccessRole, fetchSession, type UserRole } from '@/api/auth'
import {Home, Info} from "@lucide/vue";

declare module 'vue-router' {
  interface RouteMeta {
    plainLayout?: boolean
    requiredRoles?: UserRole[]
  }
}

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/HomeView.vue'),
    },
  ],
})

export const MuSidebarMenus = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "About",
    url: "/about",
    icon: Info,
  },
]
