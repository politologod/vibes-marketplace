// Exportar todos los servicios desde un solo punto
export { authService, AuthService } from './auth.service'
export { productsService, ProductsService } from './products.service'
export { usersService, UsersService } from './users.service'
export { apiClient, ApiClient, ApiError } from './api-client'

export type {
  RequestConfig,
} from './api-client'

