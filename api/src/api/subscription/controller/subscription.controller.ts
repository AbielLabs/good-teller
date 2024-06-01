import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { SubscriptionService } from '../service/subscription.service';
import { JWTGuard } from 'src/api/auth/guards/jwt.Guard';
import { CreateSubscriptionDto } from '../dto/create-subscription.dto';
import { GetFirmId } from 'src/decorators';
import { Subscription } from '../model/subscription.model';

@ApiTags('Subscription')
@UseGuards(JWTGuard)
@Controller('subscription')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Post('/')
  async createSubscription(
    @GetFirmId() firm_id: string,
    @Body() createSubscriptionDto: CreateSubscriptionDto,
  ): Promise<Subscription> {
    return await this.subscriptionService.createSubscription(
      firm_id,
      createSubscriptionDto,
    );
  }

  @Get('/')
  async getAllSubscription(): Promise<Subscription[]> {
    return await this.subscriptionService.getAllSubscription();
  }
}
