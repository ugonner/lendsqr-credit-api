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
exports.UserRepository = void 0;
const app_knexfile_1 = __importDefault(require("../../database/app.knexfile"));
const api_response_1 = require("../utils/api-response");
const service_response_1 = require("../utils/service-response");
class UserRepository {
    constructor() { }
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield (0, app_knexfile_1.default)("user").insert(user);
                return service_response_1.ServiceResponse.success("success", data);
            }
            catch (error) {
                return api_response_1.ApiResponse.fail("Database Error", 500, error);
            }
        });
    }
    getUsers(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield (0, app_knexfile_1.default)("user").select("*");
                return service_response_1.ServiceResponse.success("success", data);
            }
            catch (error) {
                return api_response_1.ApiResponse.fail("Database Error", 500, error);
            }
        });
    }
    getUser(userProperty) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield (0, app_knexfile_1.default)("user")
                    .select("*")
                    .where("user.id", userProperty)
                    .orWhere("user.email", userProperty)
                    .first();
                return service_response_1.ServiceResponse.success("success ", data);
            }
            catch (error) {
                return api_response_1.ApiResponse.fail("Database Error", 500, error);
            }
        });
    }
    getUserBorrowerRequests(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield (0, app_knexfile_1.default)("user")
                    .select("user.id", "user.name", "user.email", "borrowbid.amount", "borrowbid.rate", "borrowbid.duration")
                    .from("user")
                    .innerJoin("borrowbid", "user.id", "borrowbid.borrower")
                    .where("user.id", "borrowbid.borrower");
                return service_response_1.ServiceResponse.success("success", data);
            }
            catch (error) {
                return service_response_1.ServiceResponse.fail("Database Error", error);
            }
        });
    }
    getUserLends(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield (0, app_knexfile_1.default)("user")
                    .select("user.id", "user.name", "user.email", "borrowbid.amount", "borrowbid.rate", "borrowbid.duration")
                    .from("user")
                    .innerJoin("borrowbid", "user.id", "borrowbid.borrower")
                    .where("user.id", "borrowbid.borrower");
                return service_response_1.ServiceResponse.success("success", data);
            }
            catch (error) {
                return service_response_1.ServiceResponse.fail("Database Error", error);
            }
        });
    }
    updateUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield (0, app_knexfile_1.default)("user").update(user).where("id", user.id);
                return service_response_1.ServiceResponse.success("success user update", data);
            }
            catch (error) {
                return service_response_1.ServiceResponse.fail("failed to update user", error);
            }
        });
    }
    deleteUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield (0, app_knexfile_1.default)("user").del().where("id", userId);
                return service_response_1.ServiceResponse.success("Failed to delete", data);
            }
            catch (error) {
                return service_response_1.ServiceResponse.fail("Database Error", error);
            }
        });
    }
}
exports.UserRepository = UserRepository;
