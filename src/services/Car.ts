import { ErrorTypes } from '../errors/catalog';
import { ICar, CarZodSchema } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';
// import { IService } from '../interfaces/IService';

class CarService {
  constructor(private _car:IModel<ICar>) {}

  public async read(): Promise<ICar[]> {
    return this._car.read();
  }

  public async create(obj:unknown): Promise<ICar & { _id: string }> {
    const parsed = CarZodSchema.safeParse(obj);
    if (!parsed.success) {
      throw parsed.error;
    }

    const created = await this._car.create(parsed.data);

    return created;
  }

  public async update(_id: string, obj: unknown): Promise<ICar & { _id: string }> {
    const parsed = CarZodSchema.safeParse(obj);
    if (!parsed.success) {
      throw parsed.error;
    }

    const updated = await this._car.update(_id, parsed.data);

    if (!updated) throw new Error(ErrorTypes.EntityNotFound);

    return updated;
  }
}

export default CarService;