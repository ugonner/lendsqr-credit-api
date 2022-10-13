"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthGuard = void 0;
class AuthGuard {
    static isLoggedIn() {
        return function isLoggedIn(req, res, next) {
            const userRole = req.headers[`${process.env.LS_TOKEN}`];
            if (userRole)
                return next();
            throw new Error("unauthorixed access " + userRole);
        };
    }
}
exports.AuthGuard = AuthGuard;
