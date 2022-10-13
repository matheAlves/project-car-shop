import { Router } from 'express';
import MotorcycleModel from '../models/Motorcycle';
import MotorcyleController from '../controllers/Motorcycle';
import MotorcycleService from '../services/Motorcycle';

const motorcycleRoute = Router();

const motorcycle = new MotorcycleModel();
const motorcycleService = new MotorcycleService(motorcycle);
const motorcyleController = new MotorcyleController(motorcycleService);
const address = '/motorcycles';

motorcycleRoute.post(`${address}`, (req, res) => motorcyleController.create(req, res));
motorcycleRoute.get(`${address}`, (req, res) => motorcyleController.read(req, res));
motorcycleRoute.get(`${address}/:id`, (req, res) => motorcyleController.readOne(req, res));
motorcycleRoute.put(`${address}/:id`, (req, res) => motorcyleController.update(req, res));
motorcycleRoute.delete(`${address}/:id`, (req, res) => motorcyleController.delete(req, res));

export default motorcycleRoute;