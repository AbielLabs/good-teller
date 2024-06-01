import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

import { SubscriptionRepository } from '../repository/subscription.repository';
import { FirmService } from 'src/api/firm/service/firm.service';
import { Subscription } from '../model/subscription.model';
import { AMonthFromToday, AYearFromToday } from 'src/utils/date';
import { CreateSubscriptionDto } from '../dto/create-subscription.dto';

@Injectable()
export class SubscriptionService {
  constructor(
    private readonly subscriptionRepository: SubscriptionRepository,
    private readonly firmService: FirmService,
  ) {}

  public async createSubscription(
    subscribers_id: string,
    payload: CreateSubscriptionDto,
  ) {
    const firm = await this.firmService.updateFirmById(subscribers_id, {
      isSubscribed: false,
    });
    if (!firm) throw new BadRequestException('could not subscribe user!');

    const subscription_start_date: Date = new Date(Date.now());
    const subscription_end_date: Date = this.getDate(payload.type);

    return await this.subscriptionRepository.create<Subscription, Subscription>(
      {
        firm_id: firm.id,
        subscription_start_date,
        subscription_end_date,
        email: firm.email,
        ...payload,
      },
    );
  }

  public async removeSubscription(
    subscribers_id: string,
    subscription_id: string,
  ) {
    const firm = await this.firmService.updateFirmById(subscribers_id, {
      isSubscribed: false,
    });
    if (!firm) throw new BadRequestException('could not subscribe user!');

    const deletedSubscription: Subscription =
      await this.subscriptionRepository.deleteOne<Subscription>(
        subscription_id,
      );
    if (!deletedSubscription)
      throw new InternalServerErrorException(
        'could not remove expired subscription!',
      );
  }

  public async getAllSubscription() {
    const subscriptions: Subscription[] =
      await this.subscriptionRepository.queryAll<Subscription>();

    return subscriptions;
  }

  private getDate(type: string): Date {
    if (type === 'monthly') return AMonthFromToday();
    return AYearFromToday();

    //compare date
    //if (
    //  new Date(Date.now()).toISOString() === new Date(Date.now()).toISOString()
    //)
  }
}
