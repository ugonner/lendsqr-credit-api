"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DTOValidationGuard = void 0;
class DTOValidationGuard {
    static validationSchema(validationSchema) {
        return function (req, res, next) {
            const validationResult = validationSchema.validate(req.body);
            if (validationResult.error)
                throw new Error(validationResult.error.message);
            return next();
        };
    }
}
exports.DTOValidationGuard = DTOValidationGuard;
