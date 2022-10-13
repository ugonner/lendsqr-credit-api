export interface Transaction{
    id?: string;
    amount: number;
    payer: number;
    receiver: number;
    paymentRef?: string;
}

export interface Account {
  userId: number;
  balance: number;
  id?: number;
}
