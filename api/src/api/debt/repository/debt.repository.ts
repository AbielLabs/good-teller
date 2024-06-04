import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/base.repository';
import { Debt } from '../model/debt.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class DebtRepository extends BaseRepository<Debt> {
  constructor(@InjectModel(Debt.name) private readonly debtModel: Model<Debt>) {
    super(debtModel);
  }

  async queryByUserId(user_id: string): Promise<Debt[]> {
    return await this.debtModel.find({ user_id });
  }

  async getAggregate(firm_id: string): Promise<number> {
    const debts = await this.debtModel.aggregate([
      { $match: { firm_id } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]);

    const debtTotal: number = debts[0]?.total || 0;

    return debtTotal;
  }
}
