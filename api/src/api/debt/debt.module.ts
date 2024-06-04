import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Debt, DebtModel } from './model/debt.model';
import { DebtRepository } from './repository/debt.repository';
import { DebtController } from './controller/debt.controller';
import { DebtService } from './service/debt.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Debt.name,
        schema: DebtModel,
      },
    ]),
  ],
  providers: [DebtRepository, DebtService],
  controllers: [DebtController],
})
export class DebtModule {}
