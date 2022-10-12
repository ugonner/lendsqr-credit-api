"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Account = exports.Transaction = void 0;
class Transaction {
    constructor() {
        this.id = "";
        this.amount = 0;
        this.payer = 0;
        this.receiver = 0;
        this.paymentRef = "";
    }
}
exports.Transaction = Transaction;
class Account {
    constructor() {
        this.userId = 0;
        this.balance = 0;
        this.id = 0;
    }
}
exports.Account = Account;
