import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { FirmRepository } from '../repository/firm.repository';
import { Firm } from '../model/firm.model';
import { validate_Id } from 'src/utils';
import { CreateFirmDto, UpdateFirmDto } from '../dto/create-firm.dto';

@Injectable()
export class FirmService {
  constructor(private readonly firmRepository: FirmRepository) {}

  async createFirm(payload: CreateFirmDto): Promise<Firm> {
    const firm = await this.firmRepository.create<Firm, unknown>({
      accountType: 'admin',
      ...payload,
      isSubscribed: false,
      isVerified: true,
    });
    if (!firm)
      throw new HttpException('could not create firm', HttpStatus.BAD_REQUEST);
    return firm;
  }

  async getAllFirms(): Promise<Firm[]> {
    const firm = await this.firmRepository.queryAll<Firm>();
    if (!firm)
      throw new HttpException(
        'could not retrieve firms',
        HttpStatus.BAD_REQUEST,
      );
    return firm;
  }

  async getFirmById(id: string): Promise<Firm> {
    const isValid: boolean = validate_Id(id);
    if (!isValid)
      throw new HttpException('invalid firm id', HttpStatus.BAD_REQUEST);

    return await this.firmRepository.queryById<Firm>(id);
  }

  async getFirmByEmail(email: string): Promise<Firm> {
    return await this.firmRepository.queryByEmail<Firm>(email);
  }

  async updateFirmById(id: string, payload: UpdateFirmDto): Promise<Firm> {
    const isValid: boolean = validate_Id(id);
    if (!isValid)
      throw new HttpException('invalid firm id', HttpStatus.BAD_REQUEST);

    const firm = await this.firmRepository.findByIdAndUpdate<
      Firm,
      UpdateFirmDto
    >(id, payload);
    if (!firm)
      throw new HttpException('could not update firm', HttpStatus.BAD_REQUEST);
    return firm;
  }

  async deleteFirmById(id: string): Promise<Firm> {
    const isValid: boolean = validate_Id(id);
    if (!isValid)
      throw new HttpException('invalid firm id', HttpStatus.BAD_REQUEST);

    const firm = await this.firmRepository.deleteOne<Firm>(id);
    if (!firm)
      throw new HttpException('could not delete firm', HttpStatus.BAD_REQUEST);
    return firm;
  }

  async AddUser(firm_id, user_id: string): Promise<string> {
    const isValidFirmId: boolean = validate_Id(firm_id);
    const isValidUserId: boolean = validate_Id(user_id);
    if (!isValidFirmId || !isValidUserId)
      throw new HttpException('invalid ids', HttpStatus.BAD_REQUEST);

    const newUser: string = await this.firmRepository.AddUser(firm_id, user_id);
    if (!newUser)
      throw new HttpException('could not add user', HttpStatus.BAD_REQUEST);

    return newUser;
  }

  async AddTransaction(firm_id, transaction_id: string): Promise<string> {
    const isValidFirmId: boolean = validate_Id(firm_id);
    const isValidTransactionId: boolean = validate_Id(transaction_id);
    if (!isValidFirmId || !isValidTransactionId)
      throw new HttpException('invalid ids', HttpStatus.BAD_REQUEST);

    const newTransaction: string = await this.firmRepository.AddUser(
      firm_id,
      transaction_id,
    );
    if (!newTransaction)
      throw new HttpException('could not add user', HttpStatus.BAD_REQUEST);

    return newTransaction;
  }
}
