"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserRoleDTO = exports.UserDTO = void 0;
const joi_1 = __importDefault(require("joi"));
exports.UserDTO = joi_1.default.object({
    name: joi_1.default.string().required(),
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().alphanum().required(),
    role: joi_1.default.string().alphanum(),
});
exports.UpdateUserRoleDTO = joi_1.default.object({
    id: joi_1.default.number().required(),
    role: joi_1.default.string().required(),
});
