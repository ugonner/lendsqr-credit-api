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
exports.LoanRepository = void 0;
const app_knexfile_1 = __importDefault(require("../../database/app.knexfile"));
const api_response_1 = require("../utils/api-response");
const service_response_1 = require("../utils/service-response");
class LoanRepository {
    constructor() { }
    createLoan(bid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield (0, app_knexfile_1.default)("loan").insert(bid);
                return service_response_1.ServiceResponse.success("success", data);
            }
            catch (error) {
                return service_response_1.ServiceResponse.fail("Database Error", error);
            }
        });
    }
    createLoanBid(bid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield (0, app_knexfile_1.default)("Loanbid").insert(bid);
                return service_response_1.ServiceResponse.success("success", data);
            }
            catch (error) {
                return service_response_1.ServiceResponse.fail("Database Error", error);
            }
        });
    }
    getLoan(loanId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield (0, app_knexfile_1.default)("loan").select("*").where("id", loanId).first();
                return service_response_1.ServiceResponse.success("Failed to delete", data);
            }
            catch (error) {
                return service_response_1.ServiceResponse.fail("Database Error", error);
            }
        });
    }
    getLoanBid(loanId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield (0, app_knexfile_1.default)("loanbid").select("*").where("id", loanId).first();
                return service_response_1.ServiceResponse.success("Failed to delete", data);
            }
            catch (error) {
                return service_response_1.ServiceResponse.fail("Database Error", error);
            }
        });
    }
    getLoanLoanBids(loanId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield (0, app_knexfile_1.default)("loanbid")
                    .select("user.id", "user.name", "user.email", "Loanbid.amount", "Loanbid.rate", "Loanbid.loantype", "Loanbid.duration", "loanbid.dueDate")
                    .innerJoin("user", "user.id", "Loanbid.borrower")
                    .where("loanbid.loan", loanId);
                return service_response_1.ServiceResponse.success("Failed to delete", data);
            }
            catch (error) {
                return service_response_1.ServiceResponse.fail("Database Error", error);
            }
        });
    }
    getLoans() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield (0, app_knexfile_1.default)("loan").select("*");
                return service_response_1.ServiceResponse.success("success", data);
            }
            catch (error) {
                return api_response_1.ApiResponse.fail("Database Error", 500, error);
            }
        });
    }
    getLoanBids() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield (0, app_knexfile_1.default)("loanbid").select("*");
                return service_response_1.ServiceResponse.success("success", data);
            }
            catch (error) {
                return api_response_1.ApiResponse.fail("Database Error", 500, error);
            }
        });
    }
    getUserBorrowRequests(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield (0, app_knexfile_1.default)("loanbid")
                    .select("user.id", "user.name", "user.email", "Loanbid.amount", "Loanbid.rate", "Loanbid.loantype", "Loanbid.duration", "loanbid.dueDate")
                    .innerJoin("user", "user.id", "Loanbid.borrower")
                    .where("loanbid.lender", userId);
                return service_response_1.ServiceResponse.success("success", data);
            }
            catch (error) {
                return service_response_1.ServiceResponse.fail("Database Error", error);
            }
        });
    }
    getUserLoans(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield (0, app_knexfile_1.default)("user").select("*").where("loan.lender", userId);
                return service_response_1.ServiceResponse.success("success", data);
            }
            catch (error) {
                return service_response_1.ServiceResponse.fail("Database Error", error);
            }
        });
    }
    getUserLoanBids(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield (0, app_knexfile_1.default)("Loanbid")
                    .select("user.id", "user.name", "user.email", "Loanbid.id", "Loanbid.amount", "Loanbid.rate", "Loanbid.duration", "loanbid.dueDate")
                    .innerJoin("user", "user.id", "Loanbid.lender")
                    .where("Loanbid.borrower", userId);
                return service_response_1.ServiceResponse.success("success", data);
            }
            catch (error) {
                return service_response_1.ServiceResponse.fail("Database Error", error);
            }
        });
    }
    updateLoanBid(loan) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield (0, app_knexfile_1.default)("Loanbid").update(loan).where("id", loan.id);
                return service_response_1.ServiceResponse.success("success user update", data);
            }
            catch (error) {
                return service_response_1.ServiceResponse.fail("failed to update user", error);
            }
        });
    }
    updateLoan(loan) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield (0, app_knexfile_1.default)("Loan").update(loan).where("id", loan.id);
                return service_response_1.ServiceResponse.success("success user update", data);
            }
            catch (error) {
                return service_response_1.ServiceResponse.fail("failed to update user", error);
            }
        });
    }
    acceptLoanBid(loanId, borrowerId, loanBidId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, app_knexfile_1.default)("loanbid").update({ accepted: true }).where("id", loanBidId);
                const data = yield (0, app_knexfile_1.default)("loan")
                    .update({ accepted: true, borrower: borrowerId, loanBid: loanBidId })
                    .where("id", loanId);
                return service_response_1.ServiceResponse.success("success", data);
            }
            catch (error) {
                return service_response_1.ServiceResponse.fail("Database Error", error);
            }
        });
    }
    repayLoan(loanId, borrowerId, loanBidId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield (0, app_knexfile_1.default)("loan")
                    .update({ borrower: borrowerId, loanBid: loanBidId })
                    .where("id", loanId);
                return service_response_1.ServiceResponse.success("Failed to delete", data);
            }
            catch (error) {
                return service_response_1.ServiceResponse.fail("Database Error", error);
            }
        });
    }
    deleteLoan(loanId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield (0, app_knexfile_1.default)("loan").del().where("id", loanId);
                return service_response_1.ServiceResponse.success("Failed to delete", data);
            }
            catch (error) {
                return service_response_1.ServiceResponse.fail("Database Error", error);
            }
        });
    }
    deleteLoanBid(loanId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield (0, app_knexfile_1.default)("loanbid").del().where("id", loanId);
                return service_response_1.ServiceResponse.success("Failed to delete", data);
            }
            catch (error) {
                return service_response_1.ServiceResponse.fail("Database Error", error);
            }
        });
    }
}
exports.LoanRepository = LoanRepository;
