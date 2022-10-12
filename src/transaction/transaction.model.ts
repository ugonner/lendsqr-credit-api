export class Transaction{
    id?: string = "";
    amount: number = 0;
    payer: number = 0;
    receiver: number = 0;
    paymentRef?: string = "";
}
export class Account {
  userId: number = 0;
  balance: number = 0;
  id?: number = 0;
}
