/* eslint-disable class-methods-use-this */
import { IService } from '../interfaces/IService';
import { ICar, CarZodSchema } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';

class CarService implements IService<ICar> {
  constructor(private _car:IModel<ICar>) {}

  read(): Promise<ICar[]> {
    throw new Error('a');
  }
  readOne(_id: string): Promise<any> {
    throw new Error('b');
  }
  update(_id: string, _obj: ICar): Promise<any> {
    throw new Error('Method not implemented.');
  }
  delete(_id: string): Promise<any> {
    throw new Error('Method not implemented.');
  }

  public async create(obj:unknown): Promise<ICar & { _id: string }> {
    const parsed = CarZodSchema.safeParse(obj);
    if (!parsed.success) {
      throw parsed.error;
    }

    const created = await this._car.create(parsed.data);

    return created;
  }
}

export default CarService;