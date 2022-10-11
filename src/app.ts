import express from 'express';
import 'express-async-errors';
import errorHandler from './middlewares/ErrorHandler';
import carRoute from './routes/Car';

const app = express();
app.use(express.json());
app.use(carRoute);
app.use(errorHandler);

export default app;
