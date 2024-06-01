import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Delete,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { HttpRoute } from 'src/constants';
import { ErrorInterceptor } from 'src/errors/interceptors/exrror.interceptor';
import { FirmService } from '../service/firm.service';
import { Firm } from '../model/firm.model';
import { UpdateFirmDto } from '../dto/create-firm.dto';
import { OnlySubscribedUsers } from 'src/api/auth/guards/subscription.guard';
import { JWTGuard } from 'src/api/auth/guards/jwt.Guard';

@ApiTags('Firm')
@UseGuards(JWTGuard)
@UseInterceptors(new ErrorInterceptor())
@UseGuards(OnlySubscribedUsers)
@Controller('firm')
export class FirmController {
  constructor(private readonly firmService: FirmService) {}

  @Get(HttpRoute.WITHOUT_PARAM)
  async getAllFirm(): Promise<Firm[]> {
    return await this.firmService.getAllFirms();
  }

  @Get(HttpRoute.WITH_ID_PARAM)
  async getFirmById(@Param('id') id: string): Promise<Firm> {
    return await this.firmService.getFirmById(id);
  }

  @Patch(HttpRoute.WITH_ID_PARAM)
  async updateFirmById(
    @Param('id') id: string,
    @Body() updateFirmDto: UpdateFirmDto,
  ): Promise<Firm> {
    return await this.firmService.updateFirmById(id, updateFirmDto);
  }

  @Delete(HttpRoute.WITH_ID_PARAM)
  async deleteFirmById(@Param('id') id: string): Promise<Firm> {
    return await this.firmService.deleteFirmById(id);
  }
}
