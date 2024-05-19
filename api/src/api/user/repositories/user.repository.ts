import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { baseRepository } from 'src/base.repository';
import { User } from '../model/user.model';
import { Model } from 'mongoose';

@Injectable()
export class UserRepository extends baseRepository<User> {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {
    super(userModel);
  }
}
