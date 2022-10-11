/* eslint-disable class-methods-use-this */
import { Model } from 'mongoose';
import { IModel } from '../interfaces/IModel';

abstract class MongoModel<T> implements IModel<T> {
  constructor(protected _model: Model<T>) {}
  
  read(): Promise<T[]> {
    throw new Error('a');
  }
  readOne(_id: string): Promise<any> {
    throw new Error('b');
  }
  update(_id: string, _obj: T): Promise<any> {
    throw new Error('Method not implemented.');
  }
  delete(_id: string): Promise<any> {
    throw new Error('Method not implemented.');
  }

  public async create(obj:T):Promise<T & { _id: string }> {
    const created = await this._model.create({ ...obj });

    return created as T & { _id: string };
  }
}

export default MongoModel;