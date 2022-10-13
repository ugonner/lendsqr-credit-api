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
exports.LoanController = void 0;
const loan_service_1 = require("./loan.service");
const helper_1 = require("../utils/helper");
class LoanController {
    constructor() {
        this.loanservice = new loan_service_1.LoanService();
    }
    createLoan(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { durationTerm, lender, amount, rate, duration, loanType } = req.body;
            const dueDate = helper_1.Helper.getDueDate(duration, durationTerm).toDateString();
            const totalAmount = helper_1.Helper.getAmountOnLoan(loanType, rate, amount, duration);
            console.log(totalAmount + " " + dueDate);
            const loan = {
                lender,
                amount,
                rate,
                duration,
                dueDate,
                amountPaid: 0.0,
                totalAmount,
                loanType,
            };
            const data = yield this.loanservice.createLoan(loan);
            return res.json(data);
        });
    }
    createLoanBid(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { loan, durationTerm, borrower, lender, amount, rate, duration, loanType, } = req.body;
            const dueDate = helper_1.Helper.getDueDate(duration, durationTerm).toLocaleDateString(); //
            const totalAmount = helper_1.Helper.getAmountOnLoan(loanType, rate, amount, duration);
            const loanBid = {
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
            const data = yield this.loanservice.createLoanBid(loanBid);
            return res.json(data);
        });
    }
    acceptLoanBid(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { loanId, loanBidId } = req.body;
            const data = yield this.loanservice.acceptLoanBid(loanId, loanBidId);
            return res.json(data);
        });
    }
    repayLoan(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { loanId, receiver, payer, amount } = req.body;
            const transaction = {
                receiver,
                payer,
                amount,
            };
            const data = yield this.loanservice.repayLoanBid(transaction, loanId);
            res.json(data);
        });
    }
    getAvailableLoans(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.loanservice.getLoans();
            return res.json(data);
        });
    }
    getUserbrrowRequest(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = Number(req.params.userId);
            const data = yield this.loanservice.getUserBorrowRequests(userId);
            return res.json(data);
        });
    }
    getUserDueDebts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = Number(req.params.userId);
            const data = yield this.loanservice.getUserDueDebts(userId);
            return res.json(data);
        });
    }
    getUserDebts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = Number(req.params.userId);
            const data = yield this.loanservice.getUserLoanBids(userId);
            return res.json(data);
        });
    }
    getLoanLoanBids(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const loanId = Number(req.params.loanId);
            const data = yield this.loanservice.getLoanLoanBids(loanId);
            return res.json(data);
        });
    }
}
exports.LoanController = LoanController;
