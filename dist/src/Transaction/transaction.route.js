"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const transaction_controller_1 = require("./transaction.controller");
const transactionController = new transaction_controller_1.TransactionController();
const router = (0, express_1.Router)();
router.put("/fund-account", (req, res) => {
    console.log(req.body);
    transactionController.fundAccount(req, res);
});
router.put("/withdraw-fund", (req, res) => {
    transactionController.withdrawFund(req, res);
});
exports.default = router;
