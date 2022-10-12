import { Request, Response } from 'express';
// import { IService } from '../interfaces/IService';
import { ICar } from '../interfaces/ICar';

export default class CarController {
  constructor(private _service: any) {}

  public async read(
    _req: Request,
    res: Response,
  ) {
    const list = await this._service.read();
    return res.status(200).json(list);
  }

  public async create(
    req: Request, 
    res: Response<ICar & { _id: string }>,
  ) {
    const created = await this._service.create(req.body);
    return res.status(201).json(created);
  }
}