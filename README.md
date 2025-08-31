# Vibes Marketplace Backend

Backend para un marketplace desarrollado con Express.js, TypeScript y MongoDB.

## 🚀 Tecnologías

- **Node.js** - Entorno de ejecución
- **Express.js** - Framework web
- **TypeScript** - Lenguaje tipado
- **MongoDB** - Base de datos NoSQL
- **Mongoose** - ODM para MongoDB
- **dotenv** - Manejo de variables de entorno

## 📦 Instalación

1. Clona el repositorio:
```bash
git clone <url-del-repo>
cd vibes-marketplace-backend
```

2. Instala las dependencias:
```bash
npm install
```

3. Configura las variables de entorno:
```bash
cp .env.example .env
```
Edita el archivo `.env` con tus configuraciones:
```
DATABASE_URL=mongodb://localhost:27017/vibes-marketplace
```

## 🛠️ Scripts Disponibles

- `npm run dev` - Ejecuta el servidor en modo desarrollo con recarga automática
- `npm run build` - Compila TypeScript a JavaScript
- `npm run start` - Ejecuta el servidor desde archivos compilados
- `npm run build:watch` - Compila en modo observación

## 🏃‍♂️ Ejecutar el Proyecto

### Desarrollo
```bash
npm run dev
```
El servidor se ejecutará en `http://localhost:3000`

### Producción
```bash
npm run build
npm start
```

## 📁 Estructura del Proyecto

```
src/
├── app.ts              # Punto de entrada de la aplicación
├── configs/
│   └── database.ts     # Configuración de la base de datos
├── routes/             # Rutas de la API (próximamente)
├── models/             # Modelos de Mongoose (próximamente)
├── controllers/        # Controladores (próximamente)
└── middleware/         # Middleware personalizado (próximamente)
```

## 🔗 API Endpoints

### Base
- `GET /` - Mensaje de bienvenida

## 📋 Requisitos

- Node.js >= 18
- MongoDB >= 4.4
- npm >= 8

## 🔧 Configuración de MongoDB

### Opción 1: MongoDB Local
Instala MongoDB localmente y usa:
```
DATABASE_URL=mongodb://localhost:27017/vibes-marketplace
```

### Opción 2: MongoDB Atlas (Cloud)
1. Crea una cuenta en [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Crea un cluster
3. Obtén la cadena de conexión
4. Úsala en tu archivo `.env`:
```
DATABASE_URL=mongodb+srv://usuario:password@cluster.mongodb.net/vibes-marketplace
```

## 🤝 Contribuir

1. Fork el proyecto
2. Crea tu rama de características (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT.
