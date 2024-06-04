export type TransactionWithUserId = {
  user_id: string;
  firm_id: string;
  type: string;
  amount: number;
  date?: Date;
};

export type TTransactionType =
  | 'liability'
  | 'asset'
  | 'revenue'
  | 'expense'
  | 'debt';
