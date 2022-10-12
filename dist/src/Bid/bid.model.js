"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BorrowBid = exports.LendBid = void 0;
class LendBid {
    constructor() {
        this.id = 0;
        this.lender = 0;
        this.amount = 0;
        this.rate = 1;
        this.dueDate = "";
        this.duration = "";
        this.loanType = "simple";
    }
}
exports.LendBid = LendBid;
class BorrowBid {
    constructor() {
        this.id = 0;
        this.loan = "";
        this.borrower = "";
        this.lender = "";
        this.amount = 0;
        this.rate = 1;
        this.duration = "";
        this.dueDate = "";
        this.loanType = "simple";
    }
}
exports.BorrowBid = BorrowBid;
