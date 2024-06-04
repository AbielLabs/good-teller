import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BaseRepository } from 'src/base.repository';
import { Transaction } from '../model/transaction.model';
import { TTransactionType } from '../types';

@Injectable()
export class TransactionRepository extends BaseRepository<Transaction> {
  constructor(
    @InjectModel(Transaction.name)
    private readonly transaction: Model<Transaction>,
  ) {
    super(transaction);
  }

  async queryManyByType(
    firm_id: string,
    type: TTransactionType,
  ): Promise<Transaction[]> {
    return await this.transaction.find({ type, firm_id });
  }

  async balanceSheet(firm_id: string) {
    //calculate firm's assets
    const assets = await this.transaction.aggregate([
      { $match: { firm_id, type: 'asset' } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]);

    //calculate firm's liability
    const liabilities = await this.transaction.aggregate([
      { $match: { firm_id, type: 'liability' } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]);

    const assetsTotal = assets[0]?.total || 0;
    const liabilitiesTotal = liabilities[0]?.total || 0;
    const equity = assetsTotal - liabilitiesTotal;

    return {
      asset: assetsTotal,
      liability: liabilitiesTotal,
      equity,
    };
  }

  async incomeStatement(firm_id: string) {
    // Calculate revenue
    const revenue = await this.transaction.aggregate([
      { $match: { firm_id, type: 'revenue' } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]);

    // Calculate expenses
    const expenses = await this.transaction.aggregate([
      { $match: { firm_id, type: 'expense' } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]);

    const revenueTotal = revenue[0]?.total || 0;
    const expensesTotal = expenses[0]?.total || 0;
    const netIncome = revenueTotal - expensesTotal;

    return {
      revenue: revenueTotal,
      expenses: expensesTotal,
      netIncome,
    };
  }
}
