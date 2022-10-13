import { IGenericResponse, IUser } from "../typings";
import { UserRepository } from "../user/user.repository";
import { ApiResponse } from "../utils/api-response";
import { Account, Transaction } from "./transaction.model";
import { TransactionRepository } from "./transaction.repository";

export class TransactionService {
  transactionRepository: TransactionRepository;
  private userRepository: UserRepository;
  constructor() {
    this.transactionRepository = new TransactionRepository();
    this.userRepository = new UserRepository();
  }

  async fundWallet(userId: number, amount: number) {
    const data = await this.transactionRepository.updateUserAccount(
      userId,
      "+",
      amount
    );
    if (data.status)
      return ApiResponse.success("account funded", 201, data.data);
    return ApiResponse.fail("FAILURE", 400, data.data);
  }

  async withdrawFund(userId: number, amount: number) {
    const canWithdraw = await TransactionService.userCanTransfer(userId, amount);
    
    if(!canWithdraw) return ApiResponse.fail("not enough fund", 400, amount)
    const data = await this.transactionRepository.updateUserAccount(
      userId,
      "-",
      amount
    );
    if (data.status)
      return ApiResponse.success("funds withdrawn", 201, data.data);
    return ApiResponse.fail("FAILURE", 400, data.data);
  }

  static async userCanTransfer(
    userId: number,
    transferAmount: number
  ): Promise<boolean> {
    const userAccout = <Account>(
      await (
        await TransactionRepository.getUserAccount(userId)
      ).data
    );
    return Number(userAccout.balance) >= Number(transferAmount);
  }

  async makeTransaction(
    transaction: Transaction
  ): Promise<IGenericResponse<number[] | unknown>> {
    const canTransfer = await TransactionService.userCanTransfer(
      transaction.payer,
      transaction.amount
    );

    if (!canTransfer) return ApiResponse.fail("not enough funds", 400, null);

    await this.transactionRepository.updateUserAccount(
      transaction.payer,
      "-",
      transaction.amount
    );
    await this.transactionRepository.updateUserAccount(
      transaction.receiver,
      "+",
      transaction.amount
    );

    const data = await this.transactionRepository.createTransaction(
      transaction
    );
    if (data.status)
      return ApiResponse.success("updated success", 200, data.data);
    return ApiResponse.fail("updated fail", 400, data.data);
  }

  async createAccount(accountData: Account){
      return await this.transactionRepository.createAccount(accountData)
}
}