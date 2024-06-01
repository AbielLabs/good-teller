export type TUser = {
  name: string;
  email: string;
  password: string;
  firm_id: string;
  role: 'firm' | 'user';
  accountType: 'user';
  isVerified: boolean;
};

export type TUserWithId = TUser & {
  _id: string;
};

export type TUserWithoutPassword = Omit<TUser, 'password'>;

export type TUserRole = 'admin' | 'user';
