import { Firm } from '../model/firm.model';

export type TFirmWithId = Firm & {
  _id: string;
  accounType: 'admin';
};
export type TFirmAccountType = Firm & {
  accounType: 'admin';
  password: string;
  email: string;
  name: string;
  isVerifiend: true;
  isSubscribed: true;
};
