import { IBid, IUser } from "../typings";

export class Loan implements IBid {
  id?: number = 0;
  amount: number = 0;
  rate: number = 1;
  dueDate: string = "";
  duration: number = 0;
  lender: number | IUser = 0;
  borrower?: number | IUser = 0;
  claimed?: boolean = false;
  repaid?: boolean = false;
  loanType: string = "simple";
  amountPaid: number = 0;
  totalAmount?: number = 0;
}
//const cp = P(1+r/n)^(nt);
export class LoanBid implements IBid {
  id?: number = 0;
  loan: string | IBid = "";
  borrower: string | IUser = "";
  lender: string | IUser = "";
  amount: number = 0;
  rate: number = 1;
  duration: number = 0;
  dueDate: string = "";
  claimed?: boolean = false;
  loanType: string = "simple";
  totalAmount: number = 0;
}