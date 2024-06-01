import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Subscription, SubscriptionModel } from './model/subscription.model';
import { SubscriptionRepository } from './repository/subscription.repository';
import { FirmService } from '../firm/service/firm.service';
import { FirmRepository } from '../firm/repository/firm.repository';
import { Firm, FirmModel } from '../firm/model/firm.model';
import { SubscriptionController } from './controller/subscription.controller';
import { SubscriptionService } from './service/subscription.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Subscription.name,
        schema: SubscriptionModel,
      },
      {
        name: Firm.name,
        schema: FirmModel,
      },
    ]),
  ],
  providers: [
    SubscriptionRepository,
    SubscriptionService,
    FirmService,
    FirmRepository,
  ],
  controllers: [SubscriptionController],
})
export class SubscriptionModule {}
