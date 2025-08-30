
import express, { type Express, type Request, type Response } from 'express';
// Crea una instancia de la aplicación Express
const app: Express = express();
const port: number = 3000;

// Middleware para parsear JSON (opcional pero común)
app.use(express.json());

// Ruta de ejemplo
app.get('/', (req: Request, res: Response) => {
  res.send('¡Hola Mundo!');
});

// Inicia el servidor
app.listen(port, () => {
  console.log(` Servidor corriendo en http://localhost:${port}`);
});