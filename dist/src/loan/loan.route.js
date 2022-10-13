"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_guard_1 = require("../guards/auth.guard");
const role_guard_1 = require("../guards/role.guard");
const validation_guard_1 = require("../guards/validation.guard");
const loan_controller_1 = require("./loan.controller");
const loan_dto_1 = require("./loan.dto");
const router = (0, express_1.Router)();
const loanController = new loan_controller_1.LoanController();
router.post("/create-loan", auth_guard_1.AuthGuard.isLoggedIn(), role_guard_1.RoleGuard.allowRoles(["admin", "lender"]), validation_guard_1.DTOValidationGuard.validationSchema(loan_dto_1.LoanDTO), (req, res) => {
    loanController.createLoan(req, res);
});
router.post("/create-LoanBid", auth_guard_1.AuthGuard.isLoggedIn(), validation_guard_1.DTOValidationGuard.validationSchema(loan_dto_1.LoanBidDTO), (req, res) => {
    loanController.createLoanBid(req, res);
});
router.get("/debts/:userId", auth_guard_1.AuthGuard.isLoggedIn(), (req, res) => {
    loanController.getUserDueDebts(req, res);
});
router.get("/loans", (req, res) => {
    loanController.getAvailableLoans(req, res);
});
router.put("/accept-loanbid", auth_guard_1.AuthGuard.isLoggedIn(), role_guard_1.RoleGuard.allowRoles(["admin", "lender"]), (req, res) => {
    loanController.acceptLoanBid(req, res);
});
router.put("/repay-loan", auth_guard_1.AuthGuard.isLoggedIn(), (req, res) => {
    loanController.repayLoan(req, res);
});
router.get("/loan/loanbids/:loanId", auth_guard_1.AuthGuard.isLoggedIn(), (req, res) => {
    loanController.getLoanLoanBids(req, res);
});
router.get("/user/loanbids/:userId", auth_guard_1.AuthGuard.isLoggedIn(), (req, res) => {
    loanController.getUserbrrowRequest(req, res);
});
router.get("/user/debts/:userId", auth_guard_1.AuthGuard.isLoggedIn(), (req, res) => {
    loanController.getUserDebts(req, res);
});
router.get("/loans", (req, res) => {
    loanController.getAvailableLoans(req, res);
});
exports.default = router;
