import { Module } from '@nestjs/common';
import { TransactionRepository } from './repository/transaction.repository';
import { TransactionService } from './service/transaction.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Transaction, TransactionModel } from './model/transaction.model';
import { TransactionController } from './controllers/transaction.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Transaction.name,
        schema: TransactionModel,
      },
    ]),
  ],
  controllers: [TransactionController],
  providers: [TransactionRepository, TransactionService],
})
export class TransactionModule {}
