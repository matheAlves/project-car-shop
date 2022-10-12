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

describe('Car Service', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);
  beforeEach(() => sinon.restore())

  describe('reading all cars', () => {
    const allCars = [ validCar, updatedCar ]    

    it('returns a list of all cars', async () => {
      sinon.stub(Model, 'find').resolves(allCars)
      const result = await carService.read();
      expect(result).to.deep.equal(allCars)
    })
  })
  
  describe('finding a car by id', () => {

    it('returns a car when id is valid', async () => {
      sinon.stub(Model, 'findOne').resolves(carWithId)
      const result = await carService.readOne('6346e197322610a228e710d9')
      expect(result).to.deep.equal(carWithId)
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

  describe('creates a new car', () => {

    it('returns the created car when successful', async () => {
      sinon.stub(Model, 'create').resolves(carWithId)
      const result = await carService.create(validCar)
      expect(result).to.deep.equal(carWithId)
    })
  })
})
