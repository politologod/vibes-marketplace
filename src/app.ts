
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
  origin: ['http://localhost:3001'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token']
}));

// Middleware para parsear JSON (opcional pero común)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Ruta de ejemplo
connection();

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'Vibes Marketplace API Documentation'
}));

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