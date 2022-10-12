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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const transaction_service_1 = require("../transaction/transaction.service");
const api_response_1 = require("../utils/api-response");
const user_repository_1 = require("./user.repository");
class UserService {
    constructor() {
        this.userRepository = new user_repository_1.UserRepository();
        this.transactionService = new transaction_service_1.TransactionService();
    }
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const userExists = (yield this.userRepository.getUser(user.email)).data;
            if (userExists && userExists[0] > 0)
                return api_response_1.ApiResponse.fail("email already exists", 400, user);
            const returnData = yield this.userRepository.createUser(user);
            const createdUser = returnData.data;
            if (returnData.status) {
                const userAccount = { userId: createdUser[0], balance: 0.00 };
                yield this.transactionService.createAccount(userAccount);
                return api_response_1.ApiResponse.success("user created", 201, returnData.data);
            }
            return api_response_1.ApiResponse.fail("user not created", returnData.status, returnData.data);
        });
    }
    updateUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const returnData = yield this.userRepository.updateUser(user);
            if (returnData.status) {
                return api_response_1.ApiResponse.success("user updated", 201, returnData.data);
            }
            return api_response_1.ApiResponse.fail("user not updated", returnData.status, returnData.data);
        });
    }
    getUser(userid) {
        return __awaiter(this, void 0, void 0, function* () {
            const returnData = yield this.userRepository.getUser(userid);
            if (returnData.status) {
                return api_response_1.ApiResponse.success("user found", 200, returnData.data);
            }
            return api_response_1.ApiResponse.fail("user not found", returnData.status, returnData.data);
        });
    }
    deleteUser(userid) {
        return __awaiter(this, void 0, void 0, function* () {
            const returnData = yield (yield this.userRepository.deleteUser(userid));
            if (returnData.status) {
                return api_response_1.ApiResponse.success("user found", 200, returnData.data);
            }
            return api_response_1.ApiResponse.fail("user not found", returnData.status, returnData.data);
        });
    }
    loginUser(email, userToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const returnData = yield this.userRepository.getUser(email);
            console.log(returnData);
            if (!returnData.status) {
                return api_response_1.ApiResponse.fail("Email not found, sign up", 400, returnData.data);
            }
            if (userToken !== process.env.AUTH_TOKEN)
                return api_response_1.ApiResponse.fail("not authenticated ", 400, returnData.data);
            const data = returnData.data;
            const authToken = process.env.AUTH_TOKEN;
            return api_response_1.ApiResponse.success("logged in successfull", 200, Object.assign(Object.assign({}, data), { authToken }));
        });
    }
}
exports.UserService = UserService;
