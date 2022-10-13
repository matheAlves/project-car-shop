import { IModel } from '../interfaces/IModel';
import { IMotorcycle, MotorcycleZodSchema } from '../interfaces/IMotorcycle';
import { ErrorTypes } from '../errors/catalog';

export default class MotorcycleService {
  constructor(private _motorcycle:IModel<IMotorcycle>) {}

  public async read(): Promise<IMotorcycle[]> {
    return this._motorcycle.read();
  }

  public async readOne(_id: string): Promise<IMotorcycle | null> {
    return this._motorcycle.readOne(_id);
  }

  public async create(obj:unknown): Promise<IMotorcycle> {
    const parsed = MotorcycleZodSchema.safeParse(obj);
    if (!parsed.success) {
      throw parsed.error;
    }

    const created = await this._motorcycle.create(parsed.data);

    return created;
  }

  public async delete(_id: string): Promise<IMotorcycle | null> {
    return this._motorcycle.delete(_id);
  }

  public async update(_id: string, obj: unknown): Promise<IMotorcycle> {
    const parsed = MotorcycleZodSchema.safeParse(obj);
    if (!parsed.success) {
      throw parsed.error;
    }

    const updated = await this._motorcycle.update(_id, parsed.data);

    if (!updated) throw new Error(ErrorTypes.EntityNotFound);

    return updated;
  }
}