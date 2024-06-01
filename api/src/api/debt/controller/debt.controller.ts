import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { DebtService } from '../service/debt.service';
import { HttpRoute } from 'src/constants';
import { GetCurrentAccountId, GetFirmId } from 'src/decorators';
import { ApiTags } from '@nestjs/swagger';
import { JWTGuard } from 'src/api/auth/guards/jwt.Guard';
import { Debt } from '../model/debt.model';
import { CreateDebtDto, UpdateDebtDto } from '../dto/create-ddebt';

@ApiTags('Debt')
@UseGuards(JWTGuard)
@Controller('debt')
export class DebtController {
  constructor(private readonly debtService: DebtService) {}

  @Post(HttpRoute.WITHOUT_PARAM)
  async createDebt(@Body() payload: CreateDebtDto): Promise<Debt> {
    return this.debtService.createDebt(payload);
  }

  @Get(HttpRoute.WITH_ID_PARAM)
  async getDebtById(@Param('id') id: string): Promise<Debt> {
    return this.debtService.getDebtById(id);
  }

  @Get(HttpRoute.WITHOUT_PARAM)
  async getDebtsByFirm(@GetFirmId() firm_id: string): Promise<Debt[]> {
    return this.debtService.getDebtsByFirm(firm_id);
  }

  @Get('/me')
  async getDebtsByUser(
    @GetCurrentAccountId() user_id: string,
  ): Promise<Debt[]> {
    return this.debtService.getDebtsByUser(user_id);
  }

  @Patch(HttpRoute.WITH_ID_PARAM)
  async updateDebtsByUser(
    @Param('id') id: string,
    @Body() payload: UpdateDebtDto,
  ): Promise<Debt> {
    return this.debtService.updateDebtById(id, payload);
  }
}
