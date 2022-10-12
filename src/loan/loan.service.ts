import { Transaction } from "../transaction/transaction.model";
import { TransactionService } from "../transaction/transaction.service";
import { IGenericResponse, IUser } from "../typings";
import { UserRepository } from "../user/user.repository";
import { ApiResponse } from "../utils/api-response";
import { Helper } from "../utils/helper";
import { Loan, LoanBid } from "./loan.model";
import { LoanRepository } from "./loan.repository";

export class LoanService {
  loanRepository: LoanRepository;
  userRepository: UserRepository;
  transactionService: TransactionService;
  constructor() {
    this.loanRepository = new LoanRepository();
    this.userRepository = new UserRepository();
    this.transactionService = new TransactionService();
  }

  async createLoan(loan: Loan): Promise<IGenericResponse<number | unknown>> {
    const canLend = await TransactionService.userCanTransfer(<number>loan.lender, loan.amount)   
    const { loanType, rate, amount, duration } = loan; 
    const totalAmount = Helper.getAmountOnLoan(
      loanType,
      rate,
      amount,
      duration
    );
    loan.totalAmount = totalAmount;
    const data = await this.loanRepository.createLoan(loan);
        if (data.status) return ApiResponse.success("loan created", 201, data.data);
        return ApiResponse.fail("unable to create loan", 400, data.data);
  
    }

  async createLoanBid(
    loan: LoanBid
  ): Promise<IGenericResponse<number | unknown>> {
    const { loanType, rate, amount, duration } = loan;
    const totalAmount = Helper.getAmountOnLoan(
      loanType,
      rate,
      amount,
      duration
    );
    loan.totalAmount = totalAmount;
    const data = await this.loanRepository.createLoanBid(loan);
    if (data.status)
      return ApiResponse.success("loan bid created", 201, data.data);
    return ApiResponse.fail("unable to create loan bid", 400, data.data);
  }

  async acceptLoanBid(loanId: number, loanBidId: number) {
    const loan: Loan = <Loan>(await this.loanRepository.getLoan(loanId)).data;
    const loanBid: LoanBid = <LoanBid>(await this.loanRepository.getLoanBid(loanBidId)).data;
    loan.claimed = true;
    loan.borrower = Number(loanBid.borrower);
    const updateData = await this.loanRepository.updateLoan(loan);
    
    if(updateData.status) return ApiResponse.success("LOAN BID ACCEPTED", 200, updateData.data)
    
    return ApiResponse.fail("LOAN BID ACCEPTED", 400, updateData.data);
    
  }

  async repayLoanBid(transaction: Transaction, loanId: number) {
    
    const transferFund = (await this.transactionService.makeTransaction(transaction));
    if(!transferFund.status) return ApiResponse.fail(transferFund.message, 400, transferFund.data);
    const loan = (await this.loanRepository.getLoan(<number>loanId)).data as Loan
    
    const {amount, loanType, rate, duration, amountPaid} = loan;
   const totalAmount = Helper.getAmountOnLoan(loanType, rate, amount, duration);
     
    if (Number(loan.totalAmount) <= amountPaid) return ApiResponse.fail("YOUR LOAN HAS FULLY REPAID", 400, loan.totalAmount);
    if(loan.amount + amountPaid >= totalAmount){
        loan.repaid = true;
    }
    loan.amountPaid += Number(transaction.amount);
    loan.totalAmount = totalAmount;
    const updateData = await this.loanRepository.updateLoan(loan);
    
    let message = `loan repayment success, with balance of ${loan.amountPaid} of ${totalAmount}`;
    if (updateData.status)
      return ApiResponse.success(message, 200, updateData.data);

    return ApiResponse.fail("failed to repay ", 400, updateData.data);
  }

  async getLoan(loanId: number): Promise<IGenericResponse<Loan | unknown>> {
    const data = await this.loanRepository.getLoan(loanId);
    if (data.status) return ApiResponse.success("loan found", 200, data.data);
    return ApiResponse.fail("unable to create loan", 400, data.data);
  }

  async getLoans(): Promise<IGenericResponse<Loan[] | unknown>> {
    const data = await this.loanRepository.getLoans();
    if (data.status) return ApiResponse.success("loan found", 200, data.data);
    return ApiResponse.fail("unable to create loan", 400, data.data);
  }

  async getUserBorrowRequests(
    userId: number
  ): Promise<IGenericResponse<LoanBid[] | unknown>> {
    const data = await this.loanRepository.getUserBorrowRequests(userId);
    if (data.status) return ApiResponse.success("loan found", 200, data.data);
    return ApiResponse.fail("unable to create loan", 400, data.data);
  }

  async getUserLoanBids(
    userId: number
  ): Promise<IGenericResponse<LoanBid[] | unknown>> {
    const data = await this.loanRepository.getUserLoanBids(userId);
    if (data.status) return ApiResponse.success("loan found", 200, data.data);
    return ApiResponse.fail("unable to create loan", 400, data.data);
  }

  async getLoanLoanBids(
    loanId: number
  ): Promise<IGenericResponse<LoanBid[] | unknown>> {
    const data = await this.loanRepository.getLoanLoanBids(loanId);
    if (data.status) return ApiResponse.success("loan found", 200, data.data);
    return ApiResponse.fail("unable to create loan", 400, data.data);
  }

  async updateLoanBid(
    loan: LoanBid
  ): Promise<IGenericResponse<LoanBid | unknown>> {
    const bid = <LoanBid>(
      (await this.loanRepository.getLoanBid(<number>loan.id)).data
    );
    if (bid.claimed || loan.borrower !== bid.borrower)
      return ApiResponse.fail("Loan is already claimed", 400, bid);

    const data = await this.loanRepository.updateLoanBid(loan);
    if (data.status) return ApiResponse.success("loan found", 200, data.data);
    return ApiResponse.fail("unable to create loan", 400, data.data);
  }

}