import { Request, response, Response } from "express";
import { TransactionService } from "./transaction.service";

export class TransactionController {
  private transactionService: TransactionService;
  constructor() {
    this.transactionService = new TransactionService();
  }
  async fundAccount(req: Request, res: Response) {
    const { userId, amount } = req.body;
    const data = await this.transactionService.fundWallet(userId, amount);
    return res.json(data);
  }
  async withdrawFund(req: Request, res: Response) {
    const { userId, amount } = req.body;
    const data = await this.transactionService.withdrawFund(userId, amount);
    return res.json(data);
  }
}
