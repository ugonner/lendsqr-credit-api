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
const app_knexfile_1 = __importDefault(require("../../database/app.knexfile"));
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
const test_fakes_1 = __importDefault(require("../test.fakes"));
let adminAuthToken;
let borrowerAuthToken;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield app_knexfile_1.default.migrate.latest({ directory: "dist/database/migrations" });
        console.log("Migration complete");
    }
    catch (e) {
        console.log("FAILED", e);
    }
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield app_knexfile_1.default.migrate.rollback({ directory: "dist/database/migrations" });
        app_knexfile_1.default.destroy();
    }
    catch (e) {
        console.log(e);
    }
}));
describe("Authentication", () => {
    it("should create user, registration", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post(`/user/register`)
            .send(test_fakes_1.default.user_1);
        const response_2 = yield (0, supertest_1.default)(app_1.default)
            .post(`/user/register`)
            .send(test_fakes_1.default.user_2);
        expect(response.body.status).toBeTruthy();
        expect(response.body.statusCode).toBe(201);
    }));
    it("should login user, registration", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).post(`/user/login`).send(test_fakes_1.default.user_1);
        const response_2 = yield (0, supertest_1.default)(app_1.default)
            .post("/user/login")
            .send(test_fakes_1.default.user_2);
        adminAuthToken = response.headers["authorization"];
        borrowerAuthToken = response_2.headers["authorization"];
        expect(response.body.status).toBeTruthy();
        expect(response.body.statusCode).toBe(200);
        expect(response_2.body.status).toBeTruthy();
        expect(response_2.body.statusCode).toBe(200);
    }));
});
describe("Transactions: fund and withdraw fund", () => {
    it("should fund account", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .put(`/transaction/fund-account`)
            .set("authorization", borrowerAuthToken)
            .send(test_fakes_1.default.fundAccount);
        const response2 = yield (0, supertest_1.default)(app_1.default)
            .put(`/transaction/fund-account`)
            .set("authorization", adminAuthToken)
            .send(test_fakes_1.default.fundAccountLender);
        expect(response.body.status).toBeTruthy();
        expect(response.body.statusCode).toBe(201);
    }));
    it("should withdraw fund", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .put(`/transaction/withdraw-fund`)
            .set("authorization", borrowerAuthToken)
            .send(test_fakes_1.default.withdrawFund);
        expect(response.body.status).toBeTruthy();
        expect(response.body.statusCode).toBe(201);
    }));
    it("should not withdraw beyound balance", () => __awaiter(void 0, void 0, void 0, function* () {
        test_fakes_1.default.withdrawFund.amount = "100000";
        const response = yield (0, supertest_1.default)(app_1.default)
            .put(`/transaction/withdraw-fund`)
            .set("authorization", borrowerAuthToken)
            .send(test_fakes_1.default.withdrawFund);
        expect(response.body.status).toBeFalsy();
        expect(response.body.statusCode).not.toBe(201);
    }));
});
describe("Loan: propose loans and bid for loans, accept loans, repay", () => {
    it("propose loan as a lender or admin", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post(`/loan/create-loan`)
            .set("authorization", adminAuthToken)
            .send(test_fakes_1.default.loanData);
        expect(response.body.status).toBeTruthy();
        expect(response.body.statusCode).toBe(201);
    }));
    it("should not propose loan as a borrower or with fund insufficiency", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post(`/loan/create-loan`)
            .set("authorization", borrowerAuthToken)
            .send(test_fakes_1.default.loanData);
        test_fakes_1.default.loanData.amount = "400000";
        const response2 = yield (0, supertest_1.default)(app_1.default)
            .post(`/loan/create-loan`)
            .set("authorization", borrowerAuthToken)
            .send(test_fakes_1.default.loanData);
        expect(response.body.status).not.toBeTruthy();
        expect(response2.body.status).not.toBeTruthy();
        expect(response.body.statusCode).not.toBe(201);
    }));
    test("that users / borrower can view all awailable loan proposals from leanders", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .get(`/loan/loans`)
            .set("authorization", adminAuthToken);
        expect(response.body.status).toBeTruthy();
        expect(response.body.statusCode).toBe(200);
    }));
    it("should bid for loan", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post(`/loan/create-loanbid`)
            .set("authorization", borrowerAuthToken)
            .send(test_fakes_1.default.loanBidData);
        expect(response.body.status).toBeTruthy();
        expect(response.body.statusCode).toBe(201);
    }));
    test("that lender and admins should see all loan bids made to particular laon proposal", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .get(`/loan/loan/loanbids/1`)
            .set("authorization", adminAuthToken);
        expect(response.body.status).toBeTruthy();
        expect(response.body.statusCode).toBe(200);
    }));
    test("that lender can see all loan bids made to his loan proposals", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .get(`/loan/user/loanbids/1`)
            .set("authorization", adminAuthToken);
        expect(response.body.status).toBeTruthy();
        expect(response.body.statusCode).toBe(200);
    }));
    it("should accept bid for loan", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .put(`/loan/accept-loanbid`)
            .set("authorization", adminAuthToken)
            .send(test_fakes_1.default.acceptLoan);
        expect(response.body.status).toBeTruthy();
        expect(response.body.statusCode).toBe(200);
    }));
    test("that user can view all debts;", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .get(`/loan/debts/2`)
            .set("authorization", adminAuthToken);
        expect(response.body.status).toBeTruthy();
        expect(response.body.statusCode).toBe(200);
    }));
    it("should repay loan", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .put(`/loan/repay-loan`)
            .set("authorization", borrowerAuthToken)
            .send(test_fakes_1.default.repayLoan);
        console.log(adminAuthToken);
        console.log(response.body);
        expect(response.body.status).toBeTruthy();
        expect(response.body.statusCode).toBe(200);
    }));
});
// describe("create accounts", () => {
//   it("should create accounts", async () => {
//     const response = await request(app)
//       .post(`${constants.BASE_URL}/accounts/create`)
//       .set("Authorization", `Bearer ${constants.userOne.token}`);
//     const response2 = await request(app)
//       .post(`${constants.BASE_URL}/accounts/create`)
//       .set("Authorization", `Bearer ${constants.userTwo.token}`);
//     expect(response.status).toBe(201);
//     expect(response.body.data.user_id).toBe(constants.userOne.id);
//     constants.userOne.account_number = response.body.data.account_number;
//     constants.userTwo.account_number = response2.body.data.account_number;
//   });
// });
// describe("Accounts Fund And Balance", () => {
//   it("should Fund Account", async () => {
//     const response = await request(app)
//       .post(`${constants.BASE_URL}/accounts/fund`)
//       .send({ amount: 50000 })
//       .set("Authorization", `Bearer ${constants.userTwo.token}`);
//     expect(response.status).toBe(201);
//   });
//   it("should get account balance of a user", async () => {
//     const response = await request(app)
//       .get(`${constants.BASE_URL}/accounts/balance`)
//       .set("Authorization", `Bearer ${constants.userTwo.token}`);
//     expect(response.status).toBe(200);
//     expect(response.body.data.balance).toBe(50000);
//   });
// });
// describe("withdraw and transfer", () => {
//   it("should withdraw from account", async () => {
//     const response = await request(app)
//       .post(`${constants.BASE_URL}/accounts/withdraw`)
//       .send({ amount: 10000 })
//       .set("Authorization", `Bearer ${constants.userTwo.token}`);
//     expect(response.body.data.balance).toBe(40000);
//     expect(response.status).toBe(201);
//   });
//   it("should transfer funds", async () => {
//     const response = await request(app)
//       .post(`${constants.BASE_URL}/accounts/transfer`)
//       .send({
//         amount: 10000,
//         receiverAcct: constants.userOne.account_number,
//       })
//       .set("Authorization", `Bearer ${constants.userTwo.token}`);
//     expect(response.status).toBe(200);
//   });
//   it("should receive funds", async () => {
//     const response = await request(app)
//       .get(`${constants.BASE_URL}/accounts/balance`)
//       .set("Authorization", `Bearer ${constants.userOne.token}`);
//     expect(response.status).toBe(200);
//     expect(response.body.data.balance).toBe(10000);
//   });
