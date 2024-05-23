import { Model } from 'mongoose';

export class baseRepository<T> {
  constructor(private readonly model: Model<T>) {}

  public async create<T>(payload: T): Promise<T> {
    return (await this.model.create(payload)) as T;
  }

  public async queryAll<T>(): Promise<T[]> {
    return (await this.model.find()) as T[];
  }

  public async queryById<T>(id: string): Promise<T> {
    return (await this.model.findById(id)) as T;
  }

  public async queryByEmail<T>(email: string): Promise<T> {
    return (await this.model.findOne({ email })) as T;
  }

  public async update<T, U>(id: string, payload: U): Promise<T> {
    return (await this.model.findOneAndUpdate({ id }, payload, {
      new: true,
    })) as T;
  }

  public async deleteOne<T>(id: string): Promise<T> {
    return (await this.model.findByIdAndDelete(id)) as T;
  }
}
