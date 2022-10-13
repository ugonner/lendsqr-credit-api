import {Request, Response, NextFunction } from "express";
import { ObjectSchema, ValidationResult } from "joi";
import { ApiResponse } from "../utils/api-response";
export class DTOValidationGuard{
    static validationSchema(validationSchema: ObjectSchema){
        return function(req: Request, res: Response, next: NextFunction){
            const validationResult: ValidationResult = validationSchema.validate(req.body);
            if (validationResult.error) throw new Error(validationResult.error.message);
            return next();
        }
        
    }
}
