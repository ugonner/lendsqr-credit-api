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
exports.UserController = void 0;
const user_service_1 = require("./user.service");
class UserController {
    constructor() {
        this.userservice = new user_service_1.UserService();
    }
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password, role } = req.body;
            const user = { email, name, password, role };
            const data = yield this.userservice.createUser(user);
            return res.json(data);
        });
    }
    getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.userId;
            const user = yield this.userservice.getUser(userId);
            return res.json(user);
        });
    }
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, name, email } = req.body;
            const user = { id, email, name };
            const data = yield this.userservice.updateUser(user);
            return res.json(data);
        });
    }
    assignRole(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, name, email, role } = req.body;
            const user = { id, email, name, role };
            const data = yield this.userservice.updateUser(user);
            return res.json(data);
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, authToken } = req.body;
            const data = yield this.userservice.loginUser(email, authToken);
            if (!data.status)
                return res.json(data);
            const userData = data.data;
            res.setHeader(`${process.env.LS_TOKEN}`, "Bearer " + (userData === null || userData === void 0 ? void 0 : userData.role));
            return res.json(data);
        });
    }
}
exports.UserController = UserController;
