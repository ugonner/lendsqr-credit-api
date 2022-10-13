"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = __importDefault(require("knex"));
//import config from "./app.knexfile";
const knexfile_1 = __importDefault(require("./knexfile"));
const knexConnection = (0, knex_1.default)(knexfile_1.default[process.env.NODE_ENV]);
//export default config;
exports.default = knexConnection;
