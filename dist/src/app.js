"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const user_route_1 = __importDefault(require("./user/user.route"));
const loan_route_1 = __importDefault(require("./loan/loan.route"));
const transaction_route_1 = __importDefault(require("./transaction/transaction.route"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use([(0, cors_1.default)(), (0, morgan_1.default)('dev')]);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded());
app.use("/user", user_route_1.default);
app.use("/loan", loan_route_1.default);
app.use("/transaction", transaction_route_1.default);
app.use("/", (req, res) => {
    res.send(`Cannot bad error ${req.url}`);
});
app.use((err, req, res, next) => {
    if (err) {
        return res.json(err);
    }
    return res.send("success");
});
app.listen(3400, () => {
    console.log('connected');
});
