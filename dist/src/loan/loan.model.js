"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoanBid = exports.Loan = void 0;
class Loan {
    constructor() {
        this.id = 0;
        this.amount = 0;
        this.rate = 1;
        this.dueDate = "";
        this.duration = 0;
        this.lender = 0;
        this.borrower = 0;
        this.claimed = false;
        this.repaid = false;
        this.loanType = "simple";
        this.amountPaid = 0;
        this.totalAmount = 0;
    }
}
exports.Loan = Loan;
//const cp = P(1+r/n)^(nt);
class LoanBid {
    constructor() {
        this.id = 0;
        this.loan = "";
        this.borrower = "";
        this.lender = "";
        this.amount = 0;
        this.rate = 1;
        this.duration = 0;
        this.dueDate = "";
        this.claimed = false;
        this.loanType = "simple";
        this.totalAmount = 0;
    }
}
exports.LoanBid = LoanBid;
