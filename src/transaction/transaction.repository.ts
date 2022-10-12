import knex from "../../database/app.knexfile";
import { IGenericReturnType } from "../typings";
import { ServiceResponse } from "../utils/service-response";
import { Account, Transaction } from "./transaction.model";

export class TransactionRepository {
  constructor() {}

  async createTransaction(
    transaction: Transaction
  ): Promise<IGenericReturnType<number[] | unknown>> {
    try {
      const data = await knex("transaction").insert(transaction);
      return ServiceResponse.success("success", data);
    } catch (err) {
      return ServiceResponse.fail("UNABLE TO INSERT transaction", err);
    }
  }

  async updateTransaction(
    transaction: Transaction
  ): Promise<IGenericReturnType<number[] | unknown>> {
    try {
      const data = await knex("transaction").insert(transaction);
      return ServiceResponse.success("success", data);
    } catch (err) {
      return ServiceResponse.fail("UNABLE TO INSERT transaction", err);
    }
  }

  async createAccount(
    accountData: Account
  ): Promise<IGenericReturnType<number | unknown>> {
    try {
      const newAcc = await knex("account").insert(accountData);
      return ServiceResponse.success("account creted", newAcc);
    } catch (error) {
      return ServiceResponse.fail("error creating account", error);
    }
  }

  static async getUserAccount(
    userId: number
  ): Promise<IGenericReturnType<Account | unknown>> {
    try {
      const newAcc = await knex("account").select("*").where("userId", userId).first();
      return ServiceResponse.success("account creted", newAcc);
    } catch (error) {
      return ServiceResponse.fail("error creating account", error);
    }
  }

  async updateUserAccount(
    userId: number,
    operator: string,
    amount: number
  ): Promise<IGenericReturnType<number | unknown>> {
    try {
      let data;
      console.log(userId +" my "+ operator +" "+ amount)
      if(operator === "+"){
        data = await knex("account").increment("balance", amount).where("userId", userId);
      }else{
        data = await knex("account").decrement("balance", amount).where("userId", userId);
      }
      return ServiceResponse.success("Failed to update", data);
    } catch (error) {
      return ServiceResponse.fail("Database Error", error);
    }
  }
}