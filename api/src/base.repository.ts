import { Model } from 'mongoose';

export class BaseRepository<T> {
  constructor(private readonly model: Model<T>) {}

  public async create<T, U>(payload: U): Promise<T> {
    return (await this.model.create(payload)) as T;
  }

  public async queryAll<T>(): Promise<T[]> {
    return (await this.model.find()) as T[];
  }

  async queryManyByFirm<T>(firm_id: string): Promise<T[]> {
    return await this.model.find({ firm_id });
  }

  public async queryById<T>(_id: string): Promise<T> {
    return (await this.model.findById({ _id })) as T;
  }

  public async queryByEmail<T>(email: string): Promise<T> {
    return (await this.model.findOne({ email })) as T;
  }

  public async update<T, U>(_id: string, payload: U): Promise<T> {
    return (await this.model.findOneAndUpdate({ _id }, payload, {
      new: true,
    })) as T;
  }
  public async findByIdAndUpdate<T, U>(_id: string, payload: U): Promise<T> {
    return (await this.model.findByIdAndUpdate(_id, payload, {
      new: true,
    })) as T;
  }

  public async deleteOne<T>(_id: string): Promise<T> {
    return (await this.model.findByIdAndDelete(_id)) as T;
  }
}
