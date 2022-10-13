import { LoanService } from "./loan.service";
import { Request, Response } from "express";
import { Loan, LoanBid } from "./loan.model";
import { Helper } from "../utils/helper";
import { Transaction } from "../transaction/transaction.model";
export class LoanController {
  private loanservice: LoanService;
  constructor() {
    this.loanservice = new LoanService();
  }

  async createLoan(req: Request, res: Response) {
    const { durationTerm, lender, amount, rate, duration, loanType } = req.body;
    const dueDate = Helper.getDueDate(duration, durationTerm).toDateString();
    const totalAmount = Helper.getAmountOnLoan(
      loanType,
      rate,
      amount,
      duration
    );
    console.log(totalAmount + " " + dueDate);
    const loan: Loan = {
      lender,
      amount,
      rate,
      duration,
      dueDate,
      amountPaid: 0.0,
      totalAmount,
      loanType,
    };
    const data = await this.loanservice.createLoan(loan);
    return res.json(data);
  }

  async createLoanBid(req: Request, res: Response) {
    const {
      loan,
      durationTerm,
      borrower,
      lender,
      amount,
      rate,
      duration,
      loanType,
    } = req.body;
    const dueDate = Helper.getDueDate(
      duration,
      durationTerm
    ).toLocaleDateString(); //
    const totalAmount = Helper.getAmountOnLoan(
      loanType,
      rate,
      amount,
      duration
    );
    const loanBid: LoanBid = {
      loan,
      lender,
      borrower,
      amount,
      rate,
      duration,
      dueDate,
      totalAmount,
      loanType,
    };
    const data = await this.loanservice.createLoanBid(loanBid);
    return res.json(data);
  }

  async acceptLoanBid(req: Request, res: Response) {
    const { loanId, loanBidId } = req.body;
    const data = await this.loanservice.acceptLoanBid(loanId, loanBidId);
    return res.json(data);
  }

  async repayLoan(req: Request, res: Response) {
    const { loanId, receiver, payer, amount } = req.body;
    const transaction: Transaction = {
      receiver,
      payer,
      amount,
    };
    const data = await this.loanservice.repayLoanBid(transaction, loanId);
    res.json(data);
  }

  async getAvailableLoans(req: Request, res: Response) {
    const data = await this.loanservice.getLoans();
    return res.json(data);
  }

  async getUserbrrowRequest(req: Request, res: Response) {
    const userId = Number(req.params.userId);
    const data = await this.loanservice.getUserBorrowRequests(userId);
    return res.json(data);
  }

  async getUserDueDebts(req: Request, res: Response) {
    const userId = Number(req.params.userId);
    const data = await this.loanservice.getUserDueDebts(userId);
    return res.json(data);
  }

  async getUserDebts(req: Request, res: Response) {
    const userId = Number(req.params.userId);
    const data = await this.loanservice.getUserLoanBids(userId);
    return res.json(data);
  }

  async getLoanLoanBids(req: Request, res: Response) {
    const loanId = Number(req.params.loanId);
    const data = await this.loanservice.getLoanLoanBids(loanId);
    return res.json(data);
  }
}