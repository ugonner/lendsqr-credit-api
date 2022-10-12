"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const loan_controller_1 = require("./loan.controller");
const router = (0, express_1.Router)();
const loanController = new loan_controller_1.LoanController();
router.post("/create-loan", (req, res) => {
    loanController.createLoan(req, res);
});
router.post("/create-LoanBid", (req, res) => {
    loanController.createLoanBid(req, res);
});
router.get("/loans", (req, res) => {
    loanController.getAvailableLoans(req, res);
});
router.put("/accept-loanbid", (req, res) => {
    loanController.acceptLoanBid(req, res);
});
router.put("/repay-loan", (req, res) => {
    loanController.repayLoan(req, res);
});
router.get("/loan/loanbids/:loanId", (req, res) => {
    loanController.getLoanLoanBids(req, res);
});
router.get("/user/loanbids/:userId", (req, res) => {
    loanController.getUserbrrowRequest(req, res);
});
router.get("/user/debts/:userId", (req, res) => {
    loanController.getUserDebts(req, res);
});
router.get("/loans", (req, res) => {
    loanController.getAvailableLoans(req, res);
});
exports.default = router;
