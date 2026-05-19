import axios, { type AxiosRequestConfig } from 'axios'

const http = axios.create({
  timeout: 10000,
  withCredentials: true,
})

http.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => Promise.reject(error),
)

http.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error),
)

export const request = <T = unknown>(config: AxiosRequestConfig) => http.request<T, T>(config)

export const get = <T = unknown>(url: string, config?: AxiosRequestConfig) =>
  request<T>({ ...config, method: 'GET', url })

export const post = <T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
  request<T>({ ...config, method: 'POST', url, data })

export const put = <T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
  request<T>({ ...config, method: 'PUT', url, data })

export const del = <T = unknown>(url: string, config?: AxiosRequestConfig) =>
  request<T>({ ...config, method: 'DELETE', url })
