"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoanService = void 0;
const transaction_service_1 = require("../transaction/transaction.service");
const user_repository_1 = require("../user/user.repository");
const api_response_1 = require("../utils/api-response");
const helper_1 = require("../utils/helper");
const loan_repository_1 = require("./loan.repository");
class LoanService {
    constructor() {
        this.loanRepository = new loan_repository_1.LoanRepository();
        this.userRepository = new user_repository_1.UserRepository();
        this.transactionService = new transaction_service_1.TransactionService();
    }
    createLoan(loan) {
        return __awaiter(this, void 0, void 0, function* () {
            const canLend = yield transaction_service_1.TransactionService.userCanTransfer(loan.lender, loan.amount);
            const { loanType, rate, amount, duration } = loan;
            const totalAmount = helper_1.Helper.getAmountOnLoan(loanType, rate, amount, duration);
            loan.totalAmount = totalAmount;
            const data = yield this.loanRepository.createLoan(loan);
            if (data.status)
                return api_response_1.ApiResponse.success("loan created", 201, data.data);
            return api_response_1.ApiResponse.fail("unable to create loan", 400, data.data);
        });
    }
    createLoanBid(loan) {
        return __awaiter(this, void 0, void 0, function* () {
            const { loanType, rate, amount, duration } = loan;
            const totalAmount = helper_1.Helper.getAmountOnLoan(loanType, rate, amount, duration);
            loan.totalAmount = totalAmount;
            const data = yield this.loanRepository.createLoanBid(loan);
            if (data.status)
                return api_response_1.ApiResponse.success("loan bid created", 201, data.data);
            return api_response_1.ApiResponse.fail("unable to create loan bid", 400, data.data);
        });
    }
    acceptLoanBid(loanId, loanBidId) {
        return __awaiter(this, void 0, void 0, function* () {
            const loan = (yield this.loanRepository.getLoan(loanId)).data;
            const loanBid = (yield this.loanRepository.getLoanBid(loanBidId)).data;
            loan.claimed = true;
            loan.borrower = Number(loanBid.borrower);
            const updateData = yield this.loanRepository.updateLoan(loan);
            if (updateData.status)
                return api_response_1.ApiResponse.success("LOAN BID ACCEPTED", 200, updateData.data);
            return api_response_1.ApiResponse.fail("LOAN BID ACCEPTED", 400, updateData.data);
        });
    }
    repayLoanBid(transaction, loanId) {
        return __awaiter(this, void 0, void 0, function* () {
            const transferFund = (yield this.transactionService.makeTransaction(transaction));
            if (!transferFund.status)
                return api_response_1.ApiResponse.fail(transferFund.message, 400, transferFund.data);
            const loan = (yield this.loanRepository.getLoan(loanId)).data;
            const { amount, loanType, rate, duration, amountPaid } = loan;
            const totalAmount = helper_1.Helper.getAmountOnLoan(loanType, rate, amount, duration);
            if (Number(loan.totalAmount) <= amountPaid)
                return api_response_1.ApiResponse.fail("YOUR LOAN HAS FULLY REPAID", 400, loan.totalAmount);
            if (loan.amount + amountPaid >= totalAmount) {
                loan.repaid = true;
            }
            loan.amountPaid += Number(transaction.amount);
            loan.totalAmount = totalAmount;
            const updateData = yield this.loanRepository.updateLoan(loan);
            let message = `loan repayment success, with balance of ${loan.amountPaid} of ${totalAmount}`;
            if (updateData.status)
                return api_response_1.ApiResponse.success(message, 200, updateData.data);
            return api_response_1.ApiResponse.fail("failed to repay ", 400, updateData.data);
        });
    }
    getLoan(loanId) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.loanRepository.getLoan(loanId);
            if (data.status)
                return api_response_1.ApiResponse.success("loan found", 200, data.data);
            return api_response_1.ApiResponse.fail("unable to create loan", 400, data.data);
        });
    }
    getLoans() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.loanRepository.getLoans();
            if (data.status)
                return api_response_1.ApiResponse.success("loan found", 200, data.data);
            return api_response_1.ApiResponse.fail("unable to create loan", 400, data.data);
        });
    }
    getUserBorrowRequests(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.loanRepository.getUserBorrowRequests(userId);
            if (data.status)
                return api_response_1.ApiResponse.success("loan found", 200, data.data);
            return api_response_1.ApiResponse.fail("unable to create loan", 400, data.data);
        });
    }
    getUserLoanBids(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.loanRepository.getUserLoanBids(userId);
            if (data.status)
                return api_response_1.ApiResponse.success("loan found", 200, data.data);
            return api_response_1.ApiResponse.fail("unable to create loan", 400, data.data);
        });
    }
    getLoanLoanBids(loanId) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.loanRepository.getLoanLoanBids(loanId);
            if (data.status)
                return api_response_1.ApiResponse.success("loan found", 200, data.data);
            return api_response_1.ApiResponse.fail("unable to create loan", 400, data.data);
        });
    }
    updateLoanBid(loan) {
        return __awaiter(this, void 0, void 0, function* () {
            const bid = ((yield this.loanRepository.getLoanBid(loan.id)).data);
            if (bid.claimed || loan.borrower !== bid.borrower)
                return api_response_1.ApiResponse.fail("Loan is already claimed", 400, bid);
            const data = yield this.loanRepository.updateLoanBid(loan);
            if (data.status)
                return api_response_1.ApiResponse.success("loan found", 200, data.data);
            return api_response_1.ApiResponse.fail("unable to create loan", 400, data.data);
        });
    }
}
exports.LoanService = LoanService;
