import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';

import { configs } from 'src/configs';
import { AuthService } from '../service/auth.service';
import { TFirmWithId } from 'src/api/firm/types';
import { TUserWithId } from 'src/api/user/types';
import { Firm } from 'src/api/firm/model/firm.model';

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configs.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    const account: TUserWithId | TFirmWithId =
      await this.authService.getAccountById(payload.id);

    if (account.accountType === 'user') {
      const firm = (await this.authService.getAccountById(
        account.firm_id,
      )) as unknown as Firm;

      return {
        id: account._id,
        firm_id: account.firm_id,
        accountType: account.accountType,
        isSubscribed: firm.isSubscribed,
      };
    }

    return {
      id: account._id,
      accountType: account.accountType,
      isSubscribed: account.isSubscribed,
    };
  }
}
