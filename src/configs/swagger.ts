import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Vibes Marketplace API',
      version: '1.0.0',
      description: 'API para marketplace de productos con gestión de usuarios y transacciones',
      contact: {
        name: 'Vibes Marketplace',
        email: 'hbdev62@gmail.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor de desarrollo'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Ingresa tu token JWT'
        }
      },
      schemas: {
        User: {
          type: 'object',
          required: ['cedula', 'correo', 'numeroTelefono', 'direccion', 'nombreCompleto', 'edad'],
          properties: {
            _id: {
              type: 'string',
              description: 'ID único del usuario',
              example: '68b3cb904afd5aa749d185c3'
            },
            cedula: {
              type: 'string',
              description: 'Cédula de identidad',
              example: '12345678'
            },
            correo: {
              type: 'string',
              format: 'email',
              description: 'Correo electrónico',
              example: 'juan.perez@gmail.com'
            },
            numeroTelefono: {
              type: 'string',
              description: 'Número de teléfono',
              example: '+58414-1234567'
            },
            direccion: {
              type: 'string',
              description: 'Dirección completa',
              example: 'Av. Principal, Caracas, Venezuela'
            },
            cuentasBancarias: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  banco: { type: 'string', example: 'Banco de Venezuela' },
                  numeroCuenta: { type: 'string', example: '01020123456789012345' },
                  tipoCuenta: { type: 'string', enum: ['ahorro', 'corriente'], example: 'ahorro' }
                }
              }
            },
            pagoMovil: {
              type: 'object',
              properties: {
                banco: { type: 'string', example: 'Banco de Venezuela' },
                telefono: { type: 'string', example: '04141234567' },
                cedula: { type: 'string', example: '12345678' }
              }
            },
            correoBinanceUSDT: {
              type: 'string',
              format: 'email',
              description: 'Correo para transacciones Binance USDT',
              example: 'juan.crypto@gmail.com'
            },
            foto: {
              type: 'string',
              description: 'URL de la foto del usuario',
              example: 'https://ejemplo.com/fotos/juan-perez.jpg'
            },
            nombreCompleto: {
              type: 'string',
              description: 'Nombre completo del usuario',
              example: 'Juan Carlos Pérez'
            },
            edad: {
              type: 'number',
              minimum: 18,
              maximum: 120,
              description: 'Edad del usuario',
              example: 28
            },
            fechaCreacion: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha de creación del usuario'
            },
            fechaActualizacion: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha de última actualización'
            }
          }
        },
        Product: {
          type: 'object',
          required: ['nombre', 'descripcion', 'precio', 'categoria', 'imagenes', 'stock', 'vendedorId', 'condicion'],
          properties: {
            _id: {
              type: 'string',
              description: 'ID único del producto',
              example: '68b3cfaf973555fa3a81ca52'
            },
            nombre: {
              type: 'string',
              maxLength: 200,
              description: 'Nombre del producto',
              example: 'Laptop Gaming ASUS ROG Strix G15'
            },
            descripcion: {
              type: 'string',
              maxLength: 2000,
              description: 'Descripción detallada del producto',
              example: 'Laptop gaming de alta gama con procesador AMD Ryzen 7'
            },
            precio: {
              type: 'number',
              minimum: 0.01,
              description: 'Precio en USD',
              example: 899.99
            },
            categoria: {
              type: 'string',
              description: 'Categoría del producto',
              example: 'Electrónicos'
            },
            subcategoria: {
              type: 'string',
              description: 'Subcategoría del producto',
              example: 'Laptops'
            },
            imagenes: {
              type: 'array',
              items: { type: 'string' },
              description: 'URLs de imágenes del producto',
              example: ['https://ejemplo.com/productos/laptop1-front.jpg']
            },
            stock: {
              type: 'number',
              minimum: 0,
              description: 'Cantidad disponible',
              example: 5
            },
            vendedorId: {
              type: 'string',
              description: 'ID del usuario vendedor',
              example: '68b3cc0d4afd5aa749d185ce'
            },
            estado: {
              type: 'string',
              enum: ['activo', 'inactivo', 'agotado'],
              description: 'Estado del producto',
              example: 'activo'
            },
            condicion: {
              type: 'string',
              enum: ['nuevo', 'usado', 'reacondicionado'],
              description: 'Condición del producto',
              example: 'nuevo'
            },
            especificaciones: {
              type: 'object',
              properties: {
                marca: { type: 'string', example: 'ASUS' },
                modelo: { type: 'string', example: 'ROG Strix G15 G513' },
                color: { type: 'string', example: 'Negro' },
                talla: { type: 'string', example: 'M' },
                peso: { type: 'number', example: 2.3 },
                dimensiones: { type: 'string', example: '35.4 x 25.9 x 2.2 cm' },
                material: { type: 'string', example: 'Cuero genuino' }
              }
            },
            etiquetas: {
              type: 'array',
              items: { type: 'string' },
              description: 'Etiquetas para búsqueda',
              example: ['gaming', 'laptop', 'asus']
            },
            valoraciones: {
              type: 'object',
              properties: {
                promedio: { type: 'number', minimum: 0, maximum: 5, example: 4.5 },
                cantidad: { type: 'number', minimum: 0, example: 10 }
              }
            },
            descuento: {
              type: 'object',
              properties: {
                porcentaje: { type: 'number', minimum: 0, maximum: 100, example: 5 },
                fechaInicio: { type: 'string', format: 'date-time' },
                fechaFin: { type: 'string', format: 'date-time' }
              }
            },
            fechaCreacion: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha de creación del producto'
            },
            fechaActualizacion: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha de última actualización'
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: false
            },
            message: {
              type: 'string',
              example: 'Error al procesar la solicitud'
            },
            error: {
              type: 'string',
              example: 'Detalles del error'
            }
          }
        },
        Success: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true
            },
            data: {
              type: 'object',
              description: 'Datos de respuesta'
            },
            message: {
              type: 'string',
              example: 'Operación exitosa'
            }
          }
        },
        PaginatedProducts: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true
            },
            data: {
              type: 'array',
              items: { $ref: '#/components/schemas/Product' }
            },
            pagination: {
              type: 'object',
              properties: {
                currentPage: { type: 'number', example: 1 },
                totalPages: { type: 'number', example: 5 },
                totalProducts: { type: 'number', example: 50 },
                hasNextPage: { type: 'boolean', example: true },
                hasPrevPage: { type: 'boolean', example: false }
              }
            },
            filters: {
              type: 'object',
              properties: {
                search: { type: 'string', example: 'laptop' },
                sort: { type: 'string', example: 'precio' },
                order: { type: 'string', example: 'asc' },
                available: { type: 'string', example: 'true' }
              }
            }
          }
        }
      }
    }
  },
  apis: ['./src/routes/*.ts', './src/controllers/*.ts']
};

const specs = swaggerJsdoc(options);

export { swaggerUi, specs };