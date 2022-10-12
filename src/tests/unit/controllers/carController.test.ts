import * as sinon from 'sinon';
import chai from 'chai';
const { expect } = chai;
import { Model } from 'mongoose';
import { 
  validCar, 
  updatedCar,
  carWithId,
} from '../../mocks/CarMocks'
import CarModel from '../../../models/Car';
import CarService from '../../../services/Car';
import CarController from '../../../controllers/Car';
import { Request, Response } from 'express';

describe('Car Controller', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);
  const carController = new CarController(carService)
  let req = {} as Request;
  let res = {} as Response;
  beforeEach(() => sinon.restore())

  describe('reading all cars', () => {
    const allCars = [ validCar, updatedCar ]    

    it('returns a list of all cars', async () => {
      sinon.stub(carService, 'read').resolves(allCars)

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);

      await carController.read(req, res);
      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(allCars)).to.be.true;
    })
  })
  
  describe('finding a car by id', () => {
    req.params = {id: '6346e197322610a228e710d9'}
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);

    it('returns a car when id is valid', async () => {
      sinon.stub(carService, 'readOne').resolves(carWithId)
      await carController.readOne(req, res)
      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carWithId)).to.be.true;
    })

    it('returns an error when id is invalid', async () => {
      let error: any
      try {
        await carModel.readOne('invalidId')
      } catch (e) {
        error = e
      }

      expect(error.message).to.deep.equal('InvalidMongoId')
    })
  })

  // describe('creates a new car', () => {

  //   it('returns the created car when successful', async () => {
  //     sinon.stub(Model, 'create').resolves(carWithId)
  //     const result = await carService.create(validCar)
  //     expect(result).to.deep.equal(carWithId)
  //   })
  // })
})
