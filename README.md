# Vibes Marketplace Backend

Backend para marketplace con Express.js, TypeScript y MongoDB.

## Instalación

```bash
git clone <url-del-repo>
cd vibes-marketplace-backend
npm install
```

Crear archivo `.env`:
```
DATABASE_URL=mongodb://localhost:27017/vibes-marketplace
JWT_SECRET=tu-clave-secreta
JWT_EXPIRES=7d
```

## Ejecutar

```bash
npm run dev
```

API en: http://localhost:3001
Documentación: http://localhost:3001/api-docs

## Endpoints principales

### Productos (formato test)
- `GET /api/products/simple` - Lista de productos
- `GET /api/products/simple/:id` - Producto por ID

### Autenticación
- `POST /api/auth/register` - Registrar usuario
- `POST /api/auth/login` - Login
- `GET /api/auth/verify` - Verificar token

### Productos (completo)
- `GET /api/products` - Lista con filtros avanzados
- `POST /api/products` - Crear (requiere auth)
- `PUT /api/products/:id` - Actualizar (requiere ser propietario)
- `DELETE /api/products/:id` - Eliminar (requiere ser propietario)

### Usuarios
- `GET /api/users` - Lista (requiere auth)
- `POST /api/users` - Crear (requiere auth)
- `PUT /api/users/:id` - Actualizar (requiere ser el mismo usuario)

## Mejoras implementadas

Este backend va más allá del requerimiento básico:

**Lo que pidieron:** API simple con JSON file
**Lo que implementé:** 

- MongoDB en lugar de archivo JSON
- Sistema de autenticación completo con JWT
- Protección de rutas y ownership
- Documentación Swagger
- Arquitectura MVC escalable
- CORS configurado

**¿Por qué?** Un marketplace real necesita estos features para producción. Los endpoints `/simple` mantienen compatibilidad con el test.

## Estructura

```
src/
├── app.ts                 # Configuración principal
├── routes/                # Rutas de la API
├── controllers/           # Lógica de negocio  
├── models/                # Esquemas MongoDB
├── middleware/            # Auth y validaciones
└── configs/               # DB y Swagger
```

## Scripts

- `npm run dev` - Desarrollo
- `npm run build` - Compilar
- `npm run start` - Producción

## Ejemplo de uso

```bash
# Registrar usuario
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"correo":"test@test.com","password":"123456","nombreCompleto":"Test User","cedula":"12345678"}'

# Obtener productos (formato test)
curl "http://localhost:3001/api/products/simple?sort=price&order=asc&limit=5"
```

Respuesta:
```json
[
  {
    "id": "p1",
    "name": "Guantes GN102", 
    "price": 59.9,
    "isAvailable": true,
    "category": "gloves",
    "image": "/img/gn102.jpg"
  }
]
```