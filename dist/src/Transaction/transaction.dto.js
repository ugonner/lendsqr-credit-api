"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserTransactionDTO = exports.TransactionDTO = void 0;
const joi_1 = __importDefault(require("joi"));
exports.TransactionDTO = joi_1.default.object({
    payer: joi_1.default.number()
        .required(),
    receiver: joi_1.default.number()
        .required(),
    amount: joi_1.default.string()
        .pattern(/^[0-9\.]+$/)
        .required(),
});
exports.UserTransactionDTO = joi_1.default.object({
    userId: joi_1.default.number()
        .required(),
    amount: joi_1.default.string()
        .pattern(/^[0-9\.]+$/)
        .required(),
});
