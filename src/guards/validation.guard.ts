import {Request, Response, NextFunction } from "express";
import { ObjectSchema, ValidationResult } from "joi";
import { ApiResponse } from "../utils/api-response";
export class DTOValidationGuard{
    static validationSchema(validationSchema: ObjectSchema){
        return function(req: Request, res: Response, next: NextFunction){
            const validationResult: ValidationResult = validationSchema.validate(req.body);
            if (validationResult.error)
            {
              const response = ApiResponse.fail(
                validationResult.error.message,
                400,
                new Error(validationResult.error.message)
              );
              return res.json(response);
      
            }
            return next();
        }
        
    }
}
