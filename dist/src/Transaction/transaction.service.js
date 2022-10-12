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
exports.TransactionService = void 0;
const user_repository_1 = require("../user/user.repository");
const api_response_1 = require("../utils/api-response");
const transaction_repository_1 = require("./transaction.repository");
class TransactionService {
    constructor() {
        this.transactionRepository = new transaction_repository_1.TransactionRepository();
        this.userRepository = new user_repository_1.UserRepository();
    }
    fundWallet(userId, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.transactionRepository.updateUserAccount(userId, "+", amount);
            if (data.status)
                return api_response_1.ApiResponse.success("account funded", 201, data.data);
            return api_response_1.ApiResponse.fail("FAILURE", 400, data.data);
        });
    }
    withdrawFund(userId, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            const canWithdraw = TransactionService.userCanTransfer(userId, amount);
            if (!canWithdraw)
                return api_response_1.ApiResponse.fail("not enough fund", 400, amount);
            const data = yield this.transactionRepository.updateUserAccount(userId, "-", amount);
            if (data.status)
                return api_response_1.ApiResponse.success("funds withdrawn", 201, data.data);
            return api_response_1.ApiResponse.fail("FAILURE", 400, data.data);
        });
    }
    static userCanTransfer(userId, transferAmount) {
        return __awaiter(this, void 0, void 0, function* () {
            const userAccout = (yield (yield transaction_repository_1.TransactionRepository.getUserAccount(userId)).data);
            return userAccout.balance < transferAmount ? false : true;
        });
    }
    makeTransaction(transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const canTransfer = yield TransactionService.userCanTransfer(transaction.payer, transaction.amount);
            if (!canTransfer)
                return api_response_1.ApiResponse.fail("not enough funds", 400, null);
            yield this.transactionRepository.updateUserAccount(transaction.payer, "-", transaction.amount);
            yield this.transactionRepository.updateUserAccount(transaction.receiver, "+", transaction.amount);
            const data = yield this.transactionRepository.createTransaction(transaction);
            if (data.status)
                return api_response_1.ApiResponse.success("updated success", 200, data.data);
            return api_response_1.ApiResponse.fail("updated fail", 400, data.data);
        });
    }
    createAccount(accountData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.transactionRepository.createAccount(accountData);
        });
    }
}
exports.TransactionService = TransactionService;
