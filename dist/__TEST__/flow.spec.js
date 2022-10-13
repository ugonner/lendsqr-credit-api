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
const db_1 = __importDefault(require("../database/db"));
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db_1.default.migrate.latest({ directory: "migrations" });
        console.log("Migration complete");
    }
    catch (e) {
        console.log("Migration Failed");
    }
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db_1.default.migrate.rollback({ directory: "migrations" });
        db_1.default.destroy();
    }
    catch (e) {
        console.log(e);
    }
}));
const constants = {
    BASE_URL: "/api/v1",
    userOne: {
        password: "password",
        email: "userone@gmail.com",
        username: "userone",
    },
    userTwo: {
        password: "password",
        email: "usertwo@gmail.com",
        username: "usertwo",
    },
};
describe("Authentication", () => {
    it("should Signup", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post(`${constants.BASE_URL}/auth/signup`)
            .send(constants.userOne);
        const response1 = yield (0, supertest_1.default)(app_1.default)
            .post(`${constants.BASE_URL}/auth/signup`)
            .send(constants.userTwo);
        expect(response.body.status).toBe("success");
        expect(response.status).toBe(201);
        expect(response.body.user.name).toBe(constants.userOne.username);
        expect(response.body.user.email).toBe(constants.userOne.email);
        constants.userOne.token = response.body.token.token;
        constants.userOne.id = response.body.user.id;
        constants.userTwo.token = response1.body.token.token;
        constants.userTwo.id = response1.body.user.id;
        expect(response.status).toBe(201);
    }));
    it("should signin a user", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post(`${constants.BASE_URL}/auth/login`)
            .send({
            email: constants.userOne.email,
            password: constants.userOne.password,
        });
        expect(response.body.status).toBe("success");
        expect(response.status).toBe(200);
        expect(response.body.user.name).toBe(constants.userOne.username);
        expect(response.body.user.email).toBe(constants.userOne.email);
    }));
});
describe("create accounts", () => {
    it("should create accounts", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post(`${constants.BASE_URL}/accounts/create`)
            .set("Authorization", `Bearer ${constants.userOne.token}`);
        const response2 = yield (0, supertest_1.default)(app_1.default)
            .post(`${constants.BASE_URL}/accounts/create`)
            .set("Authorization", `Bearer ${constants.userTwo.token}`);
        expect(response.status).toBe(201);
        expect(response.body.data.user_id).toBe(constants.userOne.id);
        constants.userOne.account_number = response.body.data.account_number;
        constants.userTwo.account_number = response2.body.data.account_number;
    }));
});
describe("Accounts Fund And Balance", () => {
    it("should Fund Account", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post(`${constants.BASE_URL}/accounts/fund`)
            .send({ amount: 50000 })
            .set("Authorization", `Bearer ${constants.userTwo.token}`);
        expect(response.status).toBe(201);
    }));
    it("should get account balance of a user", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .get(`${constants.BASE_URL}/accounts/balance`)
            .set("Authorization", `Bearer ${constants.userTwo.token}`);
        expect(response.status).toBe(200);
        expect(response.body.data.balance).toBe(50000);
    }));
});
describe("withdraw and transfer", () => {
    it("should withdraw from account", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post(`${constants.BASE_URL}/accounts/withdraw`)
            .send({ amount: 10000 })
            .set("Authorization", `Bearer ${constants.userTwo.token}`);
        expect(response.body.data.balance).toBe(40000);
        expect(response.status).toBe(201);
    }));
    it("should transfer funds", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post(`${constants.BASE_URL}/accounts/transfer`)
            .send({
            amount: 10000,
            receiverAcct: constants.userOne.account_number,
        })
            .set("Authorization", `Bearer ${constants.userTwo.token}`);
        expect(response.status).toBe(200);
    }));
    it("should receive funds", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .get(`${constants.BASE_URL}/accounts/balance`)
            .set("Authorization", `Bearer ${constants.userOne.token}`);
        expect(response.status).toBe(200);
        expect(response.body.data.balance).toBe(10000);
    }));
});
