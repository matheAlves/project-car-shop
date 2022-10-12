import { Model, isValidObjectId } from 'mongoose';
import { ErrorTypes } from '../errors/catalog';
import { IModel } from '../interfaces/IModel';

abstract class MongoModel<T> implements IModel<T> {
  constructor(protected _model: Model<T>) {}
  
  public async read(): Promise<T[]> {
    const list = await this._model.find({});
    return list;
  }

  public async readOne(_id: string): Promise<T | null> {
    if (!isValidObjectId(_id)) throw Error(ErrorTypes.InvalidMongoId);

    const result = await this._model.findOne({ _id });

    if (!result) throw Error(ErrorTypes.EntityNotFound);

    return result;
  }
  
  public async create(obj:T):Promise<T> {
    const created = await this._model.create({ ...obj });

    return created as T & { _id: string };
  }

  public async update(_id: string, obj:Partial<T>): Promise<T | null> {
    if (!isValidObjectId(_id)) throw Error(ErrorTypes.InvalidMongoId);

    const updated = await this._model.findByIdAndUpdate(
      { _id },
      { ...obj },
      { new: true },
    );

    if (!updated) return null;

    return updated as T & { _id: string };
  }

  public async delete(_id: string): Promise<T | null> {
    if (!isValidObjectId(_id)) throw Error(ErrorTypes.InvalidMongoId);

    const deleted = await this._model.findByIdAndRemove(_id);

    if (!deleted) throw Error(ErrorTypes.EntityNotFound);

    return deleted;
  }

}

export default MongoModel;