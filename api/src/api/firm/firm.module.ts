import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Firm, FirmModel } from './model/firm.model';
import { FirmRepository } from './repository/firm.repository';
import { FirmController } from './controllers/firm.controller';
import { FirmService } from './service/firm.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Firm.name,
        schema: FirmModel,
      },
    ]),
  ],
  controllers: [FirmController],
  providers: [FirmRepository, FirmService],
})
export class FirmModule {}
