import { Request, Response, NextFunction } from "express";
import { ObjectSchema, required, ValidationResult } from "joi";
import { ApiResponse } from "../utils/api-response";
export class AuthGuard {
  static isLoggedIn() {
    return function isLoggedIn(req: Request, res: Response, next: NextFunction){
      const userRole = <string>req.headers[`${process.env.LS_TOKEN}`];
      if (userRole) return next();
      throw new Error("unauthorixed access " + userRole);
    }
  }
}
