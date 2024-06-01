import { Module } from '@nestjs/common';

import { UserRepository } from './repositories/user.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserModel } from './model/user.model';
import { UserController } from './controller/user.controller';
import { UserService } from './services/user.service';
import { FirmService } from '../firm/service/firm.service';
import { FirmRepository } from '../firm/repository/firm.repository';
import { Firm, FirmModel } from '../firm/model/firm.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserModel,
      },
      {
        name: Firm.name,
        schema: FirmModel,
      },
    ]),
  ],
  controllers: [UserController],
  providers: [UserRepository, UserService, FirmService, FirmRepository],
})
export class UserModule {}
