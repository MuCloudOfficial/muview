import { get } from '@/api/http'

export type UserRole = 'admin' | 'user' | string

export interface SessionUser {
  username: string
  role: UserRole
}

export interface SessionResponse {
  authenticated?: boolean
  user?: SessionUser
}

export const fetchSession = () => get<SessionResponse>('/auth/session')

export const canAccessRole = (userRole: UserRole | undefined, requiredRoles?: readonly UserRole[]) => {
  if (!requiredRoles?.length) {
    return true
  }

  return userRole != null && requiredRoles.includes(userRole)
}
