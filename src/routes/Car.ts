import { Router } from 'express';
import CarModel from '../models/Car';
import CarController from '../controllers/Car';
import CarService from '../services/Car';

const carRoute = Router();

const car = new CarModel();
const carService = new CarService(car);
const carController = new CarController(carService);

carRoute.post('/cars', (req, res) => carController.create(req, res));

export default carRoute;