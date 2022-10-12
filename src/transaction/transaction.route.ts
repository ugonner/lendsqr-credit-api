import { Router } from "express";
import { TransactionController } from "./transaction.controller";
import { Request, Response } from "express";
const transactionController = new TransactionController();
const router = Router();

router.put("/fund-account", (req: Request, res: Response) => {
    console.log(req.body)
  transactionController.fundAccount(req, res);
});

router.put("/withdraw-fund", (req: Request, res: Response) => {
  transactionController.withdrawFund(req, res);
});

export default router;
