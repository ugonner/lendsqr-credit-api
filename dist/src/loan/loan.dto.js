"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateLoanDTO = exports.UpdateLoanBidDTO = exports.LoanBidDTO = exports.LoanDTO = void 0;
const joi_1 = __importDefault(require("joi"));
exports.LoanDTO = joi_1.default.object({
    lender: joi_1.default.string().pattern(/^[0-9]+$/i).required(),
    amount: joi_1.default.string().pattern(/^[0-9.]+$/).required(),
    rate: joi_1.default.string().pattern(/^[0-9\.]+$/i).required(),
    duration: joi_1.default.string().pattern(/^[0-9]+$/i).required(),
    durationType: joi_1.default.string().pattern(/^[a-z]+$/i).required(),
    loanType: joi_1.default.string()
});
exports.LoanBidDTO = joi_1.default.object({
    loan: joi_1.default.string().pattern(/^[0-9]+$/i).required(),
    borrower: joi_1.default.string().pattern(/^[0-9]+$/i).required(),
    lender: joi_1.default.string().pattern(/^[0-9]+$/i).required(),
    amount: joi_1.default.string().pattern(/^[0-9\.]+$/i).required(),
    rate: joi_1.default.string().pattern(/^[0-9\.]+$/i).required(),
    duration: joi_1.default.string().pattern(/^[0-9]+$/i).required(),
    durationType: joi_1.default.string().pattern(/^[a-z]+$/i).required(),
    loanType: joi_1.default.string()
});
exports.UpdateLoanBidDTO = joi_1.default.object({
    loan: joi_1.default.string().pattern(/^[0-9]+$/i),
    lender: joi_1.default.string().pattern(/^[0-9]+$/i),
    amount: joi_1.default.string().pattern(/[^[0-9\.]+$/i),
    rate: joi_1.default.string().pattern(/^[0-9\.]+$/i),
    duration: joi_1.default.string().pattern(/^[0-9]+$/i),
    durationType: joi_1.default.string().pattern(/^[a-z]+$/i),
});
exports.UpdateLoanDTO = joi_1.default.object({
    lender: joi_1.default.string().pattern(/^[0-9]+$/i),
    amount: joi_1.default.string().pattern(/[^[0-9\.]+$/i),
    rate: joi_1.default.string().pattern(/^[0-9\.]+$/i),
    duration: joi_1.default.string().pattern(/^[0-9]+$/i),
    durationType: joi_1.default.string().pattern(/^[a-z]+$/i),
});
