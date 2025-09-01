import { apiClient, ApiError } from './api-client'
import { 
  Product, 
  ProductSimple, 
  CreateProductRequest, 
  ProductSearchParams, 
  PaginatedResponse,
  ApiResponse,
  UploadImageResponse,
  UploadImagesResponse
} from '@/types/api'

export class ProductsService {

  /**
   * Obtener productos con filtros y paginación
   */
  async getProducts(params: ProductSearchParams = {}): Promise<PaginatedResponse<Product>> {
    try {
      const searchParams = new URLSearchParams()
      
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          searchParams.append(key, String(value))
        }
      })

      const endpoint = `/api/products${searchParams.toString() ? `?${searchParams.toString()}` : ''}`
      
      return await apiClient.get<PaginatedResponse<Product>>(endpoint)
    } catch (error) {
      if (error instanceof ApiError) {
        throw new Error(error.data?.message || 'Error al obtener productos')
      }
      throw new Error('Error de conexión al servidor')
    }
  }

  /**
   * Obtener productos en formato simple (compatible con componentes actuales)
   */
  async getProductsSimple(params: ProductSearchParams = {}): Promise<ProductSimple[]> {
    try {
      const searchParams = new URLSearchParams()
      
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          searchParams.append(key, String(value))
        }
      })

      const endpoint = `/api/products/simple${searchParams.toString() ? `?${searchParams.toString()}` : ''}`
      
      return await apiClient.get<ProductSimple[]>(endpoint)
    } catch (error) {
      if (error instanceof ApiError) {
        throw new Error(error.data?.message || 'Error al obtener productos')
      }
      throw new Error('Error de conexión al servidor')
    }
  }

  /**
   * Obtener producto por ID
   */
  async getProductById(id: string): Promise<Product> {
    try {
      const response = await apiClient.get<ApiResponse<Product>>(`/api/products/${id}`)
      
      if (!response.success || !response.data) {
        throw new Error('Producto no encontrado')
      }
      
      return response.data
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.isNotFound) {
          throw new Error('Producto no encontrado')
        }
        throw new Error(error.data?.message || 'Error al obtener producto')
      }
      throw new Error('Error de conexión al servidor')
    }
  }

  /**
   * Obtener producto por ID en formato simple
   */
  async getProductByIdSimple(id: string): Promise<ProductSimple> {
    try {
      return await apiClient.get<ProductSimple>(`/api/products/simple/${id}`)
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.isNotFound) {
          throw new Error('Producto no encontrado')
        }
        throw new Error(error.data?.message || 'Error al obtener producto')
      }
      throw new Error('Error de conexión al servidor')
    }
  }

  /**
   * Crear nuevo producto
   */
  async createProduct(productData: CreateProductRequest): Promise<Product> {
    try {
      const response = await apiClient.post<ApiResponse<Product>>('/api/products', productData)
      
      if (!response.success || !response.data) {
        throw new Error('Error al crear producto')
      }
      
      return response.data
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.isUnauthorized) {
          throw new Error('Debes iniciar sesión para crear productos')
        }
        throw new Error(error.data?.message || 'Error al crear producto')
      }
      throw new Error('Error de conexión al servidor')
    }
  }

  /**
   * Actualizar producto existente
   */
  async updateProduct(id: string, productData: Partial<CreateProductRequest>): Promise<Product> {
    try {
      const response = await apiClient.put<ApiResponse<Product>>(`/api/products/${id}`, productData)
      
      if (!response.success || !response.data) {
        throw new Error('Error al actualizar producto')
      }
      
      return response.data
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.isUnauthorized) {
          throw new Error('Debes iniciar sesión para actualizar productos')
        }
        if (error.isForbidden) {
          throw new Error('No tienes permisos para actualizar este producto')
        }
        if (error.isNotFound) {
          throw new Error('Producto no encontrado')
        }
        throw new Error(error.data?.message || 'Error al actualizar producto')
      }
      throw new Error('Error de conexión al servidor')
    }
  }

  /**
   * Eliminar producto
   */
  async deleteProduct(id: string): Promise<void> {
    try {
      const response = await apiClient.delete<ApiResponse>(`/api/products/${id}`)
      
      if (!response.success) {
        throw new Error('Error al eliminar producto')
      }
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.isUnauthorized) {
          throw new Error('Debes iniciar sesión para eliminar productos')
        }
        if (error.isForbidden) {
          throw new Error('No tienes permisos para eliminar este producto')
        }
        if (error.isNotFound) {
          throw new Error('Producto no encontrado')
        }
        throw new Error(error.data?.message || 'Error al eliminar producto')
      }
      throw new Error('Error de conexión al servidor')
    }
  }

  /**
   * Buscar productos con scoring
   */
  async searchProducts(query: string, categoria?: string, limit: number = 10): Promise<Product[]> {
    try {
      const searchParams = new URLSearchParams({
        q: query,
        limit: String(limit)
      })

      if (categoria) {
        searchParams.append('categoria', categoria)
      }

      const response = await apiClient.get<ApiResponse<Product[]>>(
        `/api/products/search?${searchParams.toString()}`
      )
      
      return response.data || []
    } catch (error) {
      if (error instanceof ApiError) {
        throw new Error(error.data?.message || 'Error en la búsqueda')
      }
      throw new Error('Error de conexión al servidor')
    }
  }

  /**
   * Obtener todas las categorías disponibles
   */
  async getCategories(): Promise<string[]> {
    try {
      const response = await apiClient.get<ApiResponse<string[]>>('/api/products/categorias')
      return response.data || []
    } catch (error) {
      if (error instanceof ApiError) {
        throw new Error(error.data?.message || 'Error al obtener categorías')
      }
      throw new Error('Error de conexión al servidor')
    }
  }

  /**
   * Subir una imagen a un producto
   */
  async uploadProductImage(productId: string, imageFile: File): Promise<string> {
    try {
      const formData = new FormData()
      formData.append('image', imageFile)

      const response = await apiClient.postFormData<UploadImageResponse>(
        `/api/products/${productId}/upload-image`,
        formData
      )

      if (!response.success || !response.data?.imageUrl) {
        throw new Error('Error al subir la imagen')
      }

      return response.data.imageUrl
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.isUnauthorized) {
          throw new Error('Debes iniciar sesión para subir imágenes')
        }
        if (error.isForbidden) {
          throw new Error('No tienes permisos para modificar este producto')
        }
        if (error.isNotFound) {
          throw new Error('Producto no encontrado')
        }
        throw new Error(error.data?.message || 'Error al subir imagen')
      }
      throw new Error('Error de conexión al servidor')
    }
  }

  /**
   * Subir múltiples imágenes a un producto
   */
  async uploadProductImages(productId: string, imageFiles: File[]): Promise<string[]> {
    try {
      const formData = new FormData()
      
      imageFiles.forEach((file) => {
        formData.append('images', file)
      })

      const response = await apiClient.postFormData<UploadImagesResponse>(
        `/api/products/${productId}/upload-images`,
        formData
      )

      if (!response.success || !response.data?.imageUrls) {
        throw new Error('Error al subir las imágenes')
      }

      return response.data.imageUrls
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.isUnauthorized) {
          throw new Error('Debes iniciar sesión para subir imágenes')
        }
        if (error.isForbidden) {
          throw new Error('No tienes permisos para modificar este producto')
        }
        if (error.isNotFound) {
          throw new Error('Producto no encontrado')
        }
        throw new Error(error.data?.message || 'Error al subir imágenes')
      }
      throw new Error('Error de conexión al servidor')
    }
  }
}

// Instancia singleton del servicio de productos
export const productsService = new ProductsService()
