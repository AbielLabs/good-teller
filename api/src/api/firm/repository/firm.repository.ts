import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/base.repository';
import { Firm } from '../model/firm.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class FirmRepository extends BaseRepository<Firm> {
  constructor(@InjectModel(Firm.name) private readonly firmModel: Model<Firm>) {
    super(firmModel);
  }

  async AddUser(firm_id: string, user_id: string): Promise<string> {
    const firm = await this.firmModel.findById({ _id: firm_id });
    if (!firm) throw new HttpException('firm not found!', HttpStatus.NOT_FOUND);

    const updatedFirm = await firm.updateOne({
      $push: {
        users: user_id,
      },
    });
    if (!updatedFirm)
      throw new HttpException('could not update firm', HttpStatus.BAD_REQUEST);

    return user_id;
  }

  async AddTransaction(
    firm_id: string,
    transaction_id: string,
  ): Promise<string> {
    const firm = await this.firmModel.findById({ _id: firm_id });
    if (!firm) throw new HttpException('firm not found!', HttpStatus.NOT_FOUND);

    const updatedFirm: Firm = await firm.updateOne({
      $push: {
        transactions: transaction_id,
      },
    });
    if (!updatedFirm)
      throw new HttpException('could not update firm', HttpStatus.BAD_REQUEST);

    return transaction_id;
  }
}
