import { NextFunction, Router } from "express";
import { TransactionController } from "./transaction.controller";
import { Request, Response } from "express";
import { DTOValidationGuard } from "../guards/validation.guard";
import { TransactionDTO, UserTransactionDTO } from "./transaction.dto";
import { AuthGuard } from "../guards/auth.guard";
const transactionController = new TransactionController();
const router = Router();

router.put(
  "/fund-account",
  DTOValidationGuard.validationSchema(UserTransactionDTO),
  AuthGuard.isLoggedIn(),
  (req: Request, res: Response, next: NextFunction) => {
    transactionController.fundAccount(req, res);
  }
);

router.put(
  "/withdraw-fund",
  AuthGuard.isLoggedIn(),
  DTOValidationGuard.validationSchema(UserTransactionDTO),
  (req: Request, res: Response) => {
    transactionController.withdrawFund(req, res);
  }
);

export default router;
