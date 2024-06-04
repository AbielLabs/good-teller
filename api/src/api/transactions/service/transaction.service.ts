import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { TransactionRepository } from '../repository/transaction.repository';
import { UpdateTransactionDto } from '../dto/transaction.dto';
import { Transaction } from '../model/transaction.model';
import { TransactionWithUserId, TTransactionType } from '../types';

@Injectable()
export class TransactionService {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  async createTransaction(
    payload: TransactionWithUserId,
  ): Promise<Transaction> {
    const transaction: Transaction = await this.transactionRepository.create<
      Transaction,
      TransactionWithUserId
    >(payload);

    if (!transaction)
      throw new HttpException(
        'could not create transaction',
        HttpStatus.BAD_REQUEST,
      );
    return transaction;
  }

  async queryAllTransaction(): Promise<Transaction[]> {
    const transactions: Transaction[] =
      await this.transactionRepository.queryAll<Transaction>();

    if (!transactions)
      throw new HttpException(
        'could not create transactions',
        HttpStatus.BAD_REQUEST,
      );
    return transactions;
  }

  async queryAllTransactionByFirm(firm_id: string): Promise<Transaction[]> {
    const transactions: Transaction[] =
      await this.transactionRepository.queryManyByFirm(firm_id);

    if (!transactions)
      throw new HttpException(
        'could not fetch transactions',
        HttpStatus.NOT_FOUND,
      );
    return transactions;
  }

  async queryManyTransactionByType(
    firm_id: string,
    type: TTransactionType,
  ): Promise<Transaction[]> {
    const transactions: Transaction[] =
      await this.transactionRepository.queryManyByType(firm_id, type);

    if (!transactions)
      throw new HttpException(
        'could not fetch transactions',
        HttpStatus.NOT_FOUND,
      );
    return transactions;
  }

  async queryTransactionById(id: string): Promise<Transaction> {
    const transaction: Transaction =
      await this.transactionRepository.queryById<Transaction>(id);

    if (!transaction)
      throw new HttpException(
        'could not fetch transaction',
        HttpStatus.NOT_FOUND,
      );
    return transaction;
  }

  async updateTrancsaction(
    id: string,
    payload: UpdateTransactionDto,
  ): Promise<Transaction> {
    const transaction: Transaction = await this.transactionRepository.update<
      Transaction,
      UpdateTransactionDto
    >(id, payload);

    if (!transaction)
      throw new HttpException(
        'could not update transaction',
        HttpStatus.BAD_REQUEST,
      );
    return transaction;
  }

  async deleteOne(id: string): Promise<Transaction> {
    const transaction: Transaction =
      await this.transactionRepository.deleteOne<Transaction>(id);

    if (!transaction)
      throw new HttpException(
        'could not update transaction',
        HttpStatus.BAD_REQUEST,
      );
    return transaction;
  }

  async getBalanceSheet(firm_id: string) {
    return await this.transactionRepository.balanceSheet(firm_id);
  }

  async getIncomeStatement(firm_id: string) {
    return await this.transactionRepository.incomeStatement(firm_id);
  }
}
