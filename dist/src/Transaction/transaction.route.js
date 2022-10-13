"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const transaction_controller_1 = require("./transaction.controller");
const validation_guard_1 = require("../guards/validation.guard");
const transaction_dto_1 = require("./transaction.dto");
const auth_guard_1 = require("../guards/auth.guard");
const transactionController = new transaction_controller_1.TransactionController();
const router = (0, express_1.Router)();
router.put("/fund-account", validation_guard_1.DTOValidationGuard.validationSchema(transaction_dto_1.UserTransactionDTO), auth_guard_1.AuthGuard.isLoggedIn(), (req, res, next) => {
    transactionController.fundAccount(req, res);
});
router.put("/withdraw-fund", auth_guard_1.AuthGuard.isLoggedIn(), validation_guard_1.DTOValidationGuard.validationSchema(transaction_dto_1.UserTransactionDTO), (req, res) => {
    transactionController.withdrawFund(req, res);
});
exports.default = router;
