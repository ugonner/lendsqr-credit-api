import knex from "../../database/app.knexfile";
import { IBid, IGenericResponse, IGenericReturnType, IUser } from "../typings";
import { ApiResponse } from "../utils/api-response";
import { ServiceResponse } from "../utils/service-response";
import { LoanBid, Loan } from "./loan.model";

export class LoanRepository {
  constructor() {}

  async createLoan(bid: Loan): Promise<IGenericReturnType<number[] | unknown>> {
    
    try {
      const data = await knex("loan").insert(bid);
      return ServiceResponse.success("success", data);
    } catch (error) {
      return ServiceResponse.fail("Database Error", error);
    }
  }

  async createLoanBid(
    bid: LoanBid
  ): Promise<IGenericReturnType<number[] | unknown>> {
    try {
      const data = await knex("Loanbid").insert(bid);
      return ServiceResponse.success("success", data);
    } catch (error) {
      return ServiceResponse.fail("Database Error", error);
    }
  }

  async getLoan(loanId: number): Promise<IGenericReturnType<Loan | unknown>> {
    try {
      const data = await knex("loan").select("*").where("id", loanId).first();
      return ServiceResponse.success("Failed to delete", data);
    } catch (error) {
      return ServiceResponse.fail("Database Error", error);
    }
  }

  async getLoanBid(loanId: number): Promise<IGenericReturnType<LoanBid | unknown>> {
    try {
      const data = await knex("loanbid").select("*").where("id", loanId).first();
      return ServiceResponse.success("Failed to delete", data);
    } catch (error) {
      return ServiceResponse.fail("Database Error", error);
    }
  }

  async getLoanLoanBids(
    loanId: number
  ): Promise<IGenericReturnType<LoanBid[] | unknown>> {
    try {
      const data = await knex("loanbid")
        .select(
          "user.id",
          "user.name",
          "user.email",
          "Loanbid.amount",
          "Loanbid.rate",
          "Loanbid.loantype",
          "Loanbid.duration",
          "loanbid.dueDate"
        )
        .innerJoin("user", "user.id", "Loanbid.borrower")
        .where("loanbid.loan", loanId);

      return ServiceResponse.success("Failed to delete", data);
    } catch (error) {
      return ServiceResponse.fail("Database Error", error);
    }
  }

  async getLoans(): Promise<IGenericReturnType<Loan[] | unknown>> {
    try {
      const data = await knex("loan").select("*");
      return ServiceResponse.success("success", data);
    } catch (error) {
      return ApiResponse.fail("Database Error", 500, error);
    }
  }

  async getLoanBids(): Promise<IGenericReturnType<LoanBid[] | unknown>> {
    try {
      const data = await knex("loanbid").select("*");
      return ServiceResponse.success("success", data);
    } catch (error) {
      return ApiResponse.fail("Database Error", 500, error);
    }
  }

  async getUserBorrowRequests(
    userId: number
  ): Promise<IGenericReturnType<LoanBid[] | unknown>> {
    try {
      const data = await knex("loanbid")
        .select(
          "user.id",
          "user.name",
          "user.email",
          "Loanbid.amount",
          "Loanbid.rate",
          "Loanbid.loantype",
          "Loanbid.duration",
          "loanbid.dueDate"
        )
        .innerJoin("user", "user.id", "Loanbid.borrower")
        .where("loanbid.lender", userId);
      return ServiceResponse.success("success", data);
    } catch (error) {
      return ServiceResponse.fail("Database Error", error);
    }
  }

  async getUserLoans(
    userId: number
  ): Promise<IGenericReturnType<IUser[] | unknown>> {
    try {
      const data = await knex("user").select("*").where("loan.lender", userId);
      return ServiceResponse.success("success", data);
    } catch (error) {
      return ServiceResponse.fail("Database Error", error);
    }
  }

  async getUserLoanBids(
    userId: number
  ): Promise<IGenericReturnType<IBid[] | unknown>> {
    try {
      const data = await knex("Loanbid")
        .select(
          "user.id",
          "user.name",
          "user.email",
          "Loanbid.id",
          "Loanbid.amount",
          "Loanbid.rate",
          "Loanbid.duration",
          "loanbid.dueDate"
        )
        .innerJoin("user", "user.id", "Loanbid.lender")
        .where("Loanbid.borrower", userId);
      return ServiceResponse.success("success", data);
    } catch (error) {
      return ServiceResponse.fail("Database Error", error);
    }
  }

  async updateLoanBid(
    loan: LoanBid
  ): Promise<IGenericReturnType<Number | unknown>> {
    try {
      const data = await knex("Loanbid").update(loan).where("id", loan.id);
      return ServiceResponse.success("success user update", data);
    } catch (error) {
      return ServiceResponse.fail("failed to update user", error);
    }
  }

  async updateLoan(loan: Loan): Promise<IGenericReturnType<Number | unknown>> {
    try {
      const data = await knex("Loan").update(loan).where("id", loan.id);
      return ServiceResponse.success("success user update", data);
    } catch (error) {
      return ServiceResponse.fail("failed to update user", error);
    }
  }

  async acceptLoanBid(
    loanId: number,
    borrowerId: number,
    loanBidId: number
  ): Promise<IGenericReturnType<number | unknown>> {
    try {
      await knex("loanbid").update({ accepted: true }).where("id", loanBidId);

      const data = await knex("loan")
        .update({ accepted: true, borrower: borrowerId, loanBid: loanBidId })
        .where("id", loanId);
      return ServiceResponse.success("success", data);
    } catch (error) {
      return ServiceResponse.fail("Database Error", error);
    }
  }

  async repayLoan(
    loanId: number,
    borrowerId: number,
    loanBidId: number
  ): Promise<IGenericReturnType<number | unknown>> {
    try {

      const data = await knex("loan")
        .update({ borrower: borrowerId, loanBid: loanBidId })
        .where("id", loanId);
      return ServiceResponse.success("Failed to delete", data);
    } catch (error) {
      return ServiceResponse.fail("Database Error", error);
    }
  }

  async deleteLoan(
    loanId: number
  ): Promise<IGenericReturnType<number | unknown>> {
    try {
      const data = await knex("loan").del().where("id", loanId);
      return ServiceResponse.success("Failed to delete", data);
    } catch (error) {
      return ServiceResponse.fail("Database Error", error);
    }
  }

  async deleteLoanBid(
    loanId: number
  ): Promise<IGenericReturnType<number | unknown>> {
    try {
      const data = await knex("loanbid").del().where("id", loanId);
      return ServiceResponse.success("Failed to delete", data);
    } catch (error) {
      return ServiceResponse.fail("Database Error", error);
    }
  }
}