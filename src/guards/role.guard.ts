import { Request, Response, NextFunction } from "express";
import { ObjectSchema, required, ValidationResult } from "joi";
import { ApiResponse } from "../utils/api-response";
export class RoleGuard {
  static roles: string[] = ["lender", "user", "admin"];
  static allowRoles(
    roles: string[]
  ) {
    return function (req: Request, res: Response, next: NextFunction) { 
      const invalidRoles: string[] = roles.filter(
        (role: string) => !RoleGuard.roles.includes(role)
      );
      if (invalidRoles.length)
        throw new Error("invalid role " + invalidRoles);
      let userRole = <string>req.headers[`${process.env.LS_TOKEN}`];
      userRole = /bearer /i.test(userRole) ? userRole.trim().split(" ")[1]  : userRole;
      if (userRole && roles.includes(userRole)) return next();
    const response = ApiResponse.fail(
      "Unauthorized access",
      403,
      new Error("unauthorixed access " + userRole)
    );
    return res.json(response);
    }   
  }
}
