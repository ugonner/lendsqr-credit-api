"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const user_route_1 = __importDefault(require("./user/user.route"));
const loan_route_1 = __importDefault(require("./loan/loan.route"));
const transaction_route_1 = __importDefault(require("./transaction/transaction.route"));
const api_response_1 = require("./utils/api-response");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use([(0, cors_1.default)(), (0, morgan_1.default)('dev')]);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use("/user", user_route_1.default);
app.use("/loan", loan_route_1.default);
app.use("/transaction", transaction_route_1.default);
app.use("/", (req, res) => {
    const response = api_response_1.ApiResponse.success("system runming successfully", 200, true);
    res.send(JSON.stringify(response));
});
app.use((err, req, res, next) => {
    if (err) {
        const error = api_response_1.ApiResponse.fail(err.message, 500, err);
        return res.json(error);
    }
    const response = api_response_1.ApiResponse.success("process running fine", 200, true);
    return res.json(response);
});
app.listen(process.env.PORT, () => {
    console.log('connected');
});
exports.default = app;
