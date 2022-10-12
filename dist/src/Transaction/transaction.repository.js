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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionRepository = void 0;
const app_knexfile_1 = __importDefault(require("../../database/app.knexfile"));
const service_response_1 = require("../utils/service-response");
class TransactionRepository {
    constructor() { }
    createTransaction(transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield (0, app_knexfile_1.default)("transaction").insert(transaction);
                return service_response_1.ServiceResponse.success("success", data);
            }
            catch (err) {
                return service_response_1.ServiceResponse.fail("UNABLE TO INSERT transaction", err);
            }
        });
    }
    updateTransaction(transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield (0, app_knexfile_1.default)("transaction").insert(transaction);
                return service_response_1.ServiceResponse.success("success", data);
            }
            catch (err) {
                return service_response_1.ServiceResponse.fail("UNABLE TO INSERT transaction", err);
            }
        });
    }
    createAccount(accountData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newAcc = yield (0, app_knexfile_1.default)("account").insert(accountData);
                return service_response_1.ServiceResponse.success("account creted", newAcc);
            }
            catch (error) {
                return service_response_1.ServiceResponse.fail("error creating account", error);
            }
        });
    }
    static getUserAccount(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newAcc = yield (0, app_knexfile_1.default)("account").select("*").where("userId", userId).first();
                return service_response_1.ServiceResponse.success("account creted", newAcc);
            }
            catch (error) {
                return service_response_1.ServiceResponse.fail("error creating account", error);
            }
        });
    }
    updateUserAccount(userId, operator, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let data;
                console.log(userId + " my " + operator + " " + amount);
                if (operator === "+") {
                    data = yield (0, app_knexfile_1.default)("account").increment("balance", amount).where("userId", userId);
                }
                else {
                    data = yield (0, app_knexfile_1.default)("account").decrement("balance", amount).where("userId", userId);
                }
                return service_response_1.ServiceResponse.success("Failed to update", data);
            }
            catch (error) {
                return service_response_1.ServiceResponse.fail("Database Error", error);
            }
        });
    }
}
exports.TransactionRepository = TransactionRepository;
