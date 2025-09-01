import { ApiResponse } from '@/types/api'

export interface RequestConfig extends RequestInit {
  timeout?: number
}

export class ApiClient {
  private baseURL: string
  private defaultTimeout: number = 10000

  constructor(baseURL: string = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001') {
    this.baseURL = baseURL
  }

  private async request<T>(
    endpoint: string, 
    config: RequestConfig = {}
  ): Promise<T> {
    const { timeout = this.defaultTimeout, ...requestConfig } = config

    const defaultHeaders: Record<string, string> = {}

    const token = this.getAuthToken()
    if (token) {
      defaultHeaders.Authorization = `Bearer ${token}`
    }

    const headers = { ...defaultHeaders }
    
    if (config.headers) {
      Object.entries(config.headers).forEach(([key, value]) => {
        if (value !== undefined) {
          headers[key] = value
        }
      })
    }
    
    if (!headers['Content-Type'] && !(requestConfig.body instanceof FormData)) {
      headers['Content-Type'] = 'application/json'
    }
    
    if (requestConfig.body instanceof FormData && headers['Content-Type']) {
      delete headers['Content-Type']
    }

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), timeout)

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        ...requestConfig,
        headers,
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({
          message: `HTTP Error: ${response.status}`,
          success: false
        }))
        throw new ApiError(errorData.message || 'Error en la petición', response.status, errorData)
      }

      const data = await response.json()
      return data
    } catch (error) {
      clearTimeout(timeoutId)
      
      if (error instanceof ApiError) {
        throw error
      }
      
      if (error instanceof Error && error.name === 'AbortError') {
        throw new ApiError('Timeout: La petición tardó demasiado', 408)
      }
      
      throw new ApiError('Error de red o conexión', 0, error)
    }
  }

  async get<T>(endpoint: string, config?: RequestConfig): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: 'GET' })
  }

  async post<T>(endpoint: string, data?: any, config?: RequestConfig): Promise<T> {
    return this.request<T>(endpoint, {
      ...config,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async put<T>(endpoint: string, data?: any, config?: RequestConfig): Promise<T> {
    return this.request<T>(endpoint, {
      ...config,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async delete<T>(endpoint: string, config?: RequestConfig): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: 'DELETE' })
  }

  async postFormData<T>(endpoint: string, formData: FormData, config?: RequestConfig): Promise<T> {
    return this.request<T>(endpoint, {
      ...config,
      method: 'POST',
      headers: {
        ...config?.headers
      },
      body: formData,
    })
  }

  private getAuthToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('authToken') || sessionStorage.getItem('authToken')
    }
    return null
  }

  setAuthToken(token: string, persistent: boolean = true): void {
    if (typeof window !== 'undefined') {
      if (persistent) {
        localStorage.setItem('authToken', token)
        sessionStorage.removeItem('authToken')
      } else {
        sessionStorage.setItem('authToken', token)
        localStorage.removeItem('authToken')
      }
    }
  }

  removeAuthToken(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('authToken')
      sessionStorage.removeItem('authToken')
    }
  }

  hasAuthToken(): boolean {
    return !!this.getAuthToken()
  }
}

export class ApiError extends Error {
  public status: number
  public data?: any

  constructor(message: string, status: number = 0, data?: any) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.data = data
  }

  get isNetworkError(): boolean {
    return this.status === 0
  }

  get isTimeout(): boolean {
    return this.status === 408
  }

  get isUnauthorized(): boolean {
    return this.status === 401
  }

  get isForbidden(): boolean {
    return this.status === 403
  }

  get isNotFound(): boolean {
    return this.status === 404
  }

  get isServerError(): boolean {
    return this.status >= 500
  }

  get isClientError(): boolean {
    return this.status >= 400 && this.status < 500
  }
}

export const apiClient = new ApiClient()
