export interface IModel<T> {
  create(obj:T):Promise<T & { _id: string }>,
  read():Promise<T[]>,
  readOne(_id:string):Promise<T | null>,
  update(_id:string, obj:T):Promise<T & { _id: string } | null>,
  delete(_id:string):Promise<T | null>,
}
