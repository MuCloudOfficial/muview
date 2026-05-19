import { createRouter, createWebHistory } from 'vue-router'
import { canAccessRole, fetchSession, type UserRole } from '@/api/auth'

declare module 'vue-router' {
  interface RouteMeta {
    plainLayout?: boolean
    requiredRoles?: UserRole[]
  }
}

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Overview.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue'),
      meta: {
        plainLayout: true,
      },
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/AboutView.vue'),
    },
  ],
})

const isPublicRoute = (path: string) => path === '/login'

const hasSession = async () => {
  try {
    const response = await fetchSession()
    return response?.authenticated === true ? response.user : undefined
  } catch {
    return undefined
  }
}

// router.beforeEach(async (to) => {
//   if (isPublicRoute(to.path)) {
//     return true
//   }

//   const user = await hasSession()
//   if (!user) {
//     return {
//       path: '/login',
//       query: {
//         page: to.fullPath,
//       },
//     }
//   }

//   if (canAccessRole(user.role, to.meta.requiredRoles)) {
//     return true
//   }

//   return {
//     path: '/',
//     query: {
//       restricted: to.fullPath,
//     },
//   }
// })

export default router
