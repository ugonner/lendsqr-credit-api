"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleGuard = void 0;
class RoleGuard {
    static allowRoles(roles) {
        return function (req, res, next) {
            const invalidRoles = roles.filter((role) => !RoleGuard.roles.includes(role));
            if (invalidRoles.length)
                throw new Error("invalid role " + invalidRoles);
            let userRole = req.headers[`${process.env.LS_TOKEN}`];
            userRole = /bearer /i.test(userRole) ? userRole.trim().split(" ")[1] : userRole;
            if (userRole && roles.includes(userRole))
                return next();
            throw new Error("unauthorixed access");
        };
    }
}
exports.RoleGuard = RoleGuard;
RoleGuard.roles = ["lender", "user", "admin"];
