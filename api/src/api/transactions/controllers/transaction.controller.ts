import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { TransactionService } from '../service/transaction.service';
import { HttpRoute } from 'src/constants';
import {
  CreateTransactionDto,
  UpdateTransactionDto,
} from '../dto/transaction.dto';
import { JWTGuard } from 'src/api/auth/guards/jwt.Guard';
import { GetCurrentAccountId, GetFirmId } from 'src/decorators';
import { Transaction } from '../model/transaction.model';
import { ErrorInterceptor } from 'src/errors/interceptors/exrror.interceptor';
import { OnlySubscribedUsers } from 'src/api/auth/guards/subscription.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Transaction')
@UseGuards(JWTGuard)
@UseInterceptors(new ErrorInterceptor())
@UseGuards(OnlySubscribedUsers)
@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post(HttpRoute.WITHOUT_PARAM)
  async createTransaction(
    @GetCurrentAccountId() user_id: string,
    @GetFirmId() firm_id: string,
    @Body() createTransactionDto: CreateTransactionDto,
  ) {
    return await this.transactionService.createTransaction({
      user_id,
      firm_id,
      ...createTransactionDto,
    });
  }

  @Get(HttpRoute.WITHOUT_PARAM)
  async getAllTransaction(): Promise<Transaction[]> {
    return await this.transactionService.queryAllTransaction();
  }

  @Get('firm')
  async getAllTransactionByFirm(
    @GetFirmId() firm_id: string,
  ): Promise<Transaction[]> {
    return await this.transactionService.queryAllTransactionByFirm(firm_id);
  }

  @Get(HttpRoute.WITH_ID_PARAM)
  async getTransactionById(@Param('id') id: string): Promise<Transaction> {
    return await this.transactionService.queryTransactionById(id);
  }

  @Patch(HttpRoute.WITH_ID_PARAM)
  async UpdateTransactionById(
    @Param('id') id: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ): Promise<Transaction> {
    return await this.transactionService.updateTrancsaction(
      id,
      updateTransactionDto,
    );
  }

  @Delete(HttpRoute.WITH_ID_PARAM)
  async deleteTransactionById(@Param('id') id: string): Promise<Transaction> {
    return await this.transactionService.deleteOne(id);
  }
}
