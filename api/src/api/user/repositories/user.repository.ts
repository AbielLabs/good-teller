import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseRepository } from 'src/base.repository';
import { User } from '../model/user.model';
import { Model } from 'mongoose';
import { TUserRole } from '../types';

@Injectable()
export class UserRepository extends BaseRepository<User> {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {
    super(userModel);
  }

  public async updateUserRole(id: string, role: TUserRole): Promise<User> {
    return await this.userModel.findByIdAndUpdate(id, { role }, { new: true });
  }
}
