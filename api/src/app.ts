
import express, { type Express, type Request, type Response } from 'express';
import connection from './configs/database.js';
import productRoutes from './routes/product.routes.js';
import userRoutes from './routes/user.routes.js';
import authRoutes from './routes/auth.routes.js';
import { swaggerUi, specs } from './configs/swagger.js';
import cors from 'cors';



const app: Express = express();
const port: number = 3001;

app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001', 'https://vibes-marketplace.vercel.app'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token']
}));

connection();

const jsonMiddleware = express.json();

app.use('/api/auth', jsonMiddleware, authRoutes);
app.use('/api/users', jsonMiddleware, userRoutes);

app.use('/api/products', (req, res, next) => {
  if (req.path.includes('/upload-image')) {
    return next();
  }
  jsonMiddleware(req, res, next);
}, productRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'Vibes Marketplace API Documentation'
}));

// Endpoint para descargar el archivo OpenAPI JSON
app.get('/api-docs.json', (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(specs);
});

app.get('/', (req: Request, res: Response) => {
  res.json({
    message: '¡Bienvenido a Vibes Marketplace API!',
    documentation: 'http://localhost:3001/api-docs',
    endpoints: {
      users: 'http://localhost:3001/api/users',
      products: 'http://localhost:3001/api/products'
    }
  });
});

// Inicia el servidor
app.listen(port, () => {
  console.log(` Servidor corriendo en http://localhost:${port}`);
});
