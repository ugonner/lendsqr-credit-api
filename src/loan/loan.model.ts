import { IUser } from "../typings";

export interface IBid {
  id?: number;
  amount: number;
  rate: number;
  loanType: string;
  duration: number;
  dueDate?: string;
  durationType?: string;
  totalAmount?: number;
  claimed?: boolean;
  lender: number | IUser;
  borrower?: number | IUser;
}

export interface Loan extends IBid {
  repaid?: boolean;
  amountPaid: number;
}
export interface LoanBid extends IBid {
  loan: string | IBid;
}
