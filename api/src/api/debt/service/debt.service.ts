import { Injectable } from '@nestjs/common';
import { DebtRepository } from '../repository/debt.repository';
import { Debt } from '../model/debt.model';
import { CreateDebtDto, UpdateDebtDto } from '../dto/create-ddebt';

@Injectable()
export class DebtService {
  constructor(private readonly debtRepository: DebtRepository) {}

  public async createDebt(payload: CreateDebtDto): Promise<Debt> {
    return this.debtRepository.create<Debt, any>(payload);
  }

  async getDebtById(_id: string) {
    return this.debtRepository.queryById<Debt>(_id);
  }

  async updateDebtById(_id: string, payload: UpdateDebtDto) {
    return this.debtRepository.update<Debt, UpdateDebtDto>(_id, payload);
  }

  async getDebtsByFirm(firm_id: string) {
    return this.debtRepository.queryManyByFirm<Debt>(firm_id);
  }

  async getDebtsByUser(user_id: string) {
    return this.debtRepository.queryByUserId(user_id);
  }

  async getDebtAggregate(firm_id: string): Promise<number> {
    return await this.debtRepository.getAggregate(firm_id);
  }
}
