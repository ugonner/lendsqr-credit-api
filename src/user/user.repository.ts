import { date } from "joi";
import { Knex } from "knex";
import knex from '../../database/app.knexfile';
import { IGenericResponse, IGenericReturnType, IUser } from "../typings";
import { ApiResponse } from "../utils/api-response";
import { ServiceResponse } from "../utils/service-response";

export class UserRepository {
  constructor() {}

  async createUser(user: IUser): Promise<IGenericReturnType<IUser | unknown>> {
    try {
      const data = await knex("user").insert(user);
      return ServiceResponse.success("success", data);
    } catch (error) {
      return ApiResponse.fail("Database Error", 500, error);
    }
  }

  async getUsers(user: IUser): Promise<IGenericReturnType<IUser[] | unknown>> {
    try {
      const data = await knex("user").select("*");
      return ServiceResponse.success("success", data);
    } catch (error) {
      return ApiResponse.fail("Database Error", 500, error);
    }
  }

  async getUser(
    userProperty: string
  ): Promise<IGenericReturnType<IUser | unknown>> {
    try {
      const data = await knex("user")
        .select("*")
        .where("user.id", userProperty)
        .orWhere("user.email", userProperty)
        .first();
        
      return ServiceResponse.success("success ", data);
    } catch (error) {
      return ApiResponse.fail("Database Error", 500, error);
    }
  }

  async getUserBorrowerRequests(
    userId: string
  ): Promise<IGenericReturnType<IUser[] | unknown>> {
    try {
      const data = await knex("user")
        .select(
          "user.id",
          "user.name",
          "user.email",
          "borrowbid.amount",
          "borrowbid.rate",
          "borrowbid.duration"
        )
        .from("user")
        .innerJoin("borrowbid", "user.id", "borrowbid.borrower")
        .where("user.id", "borrowbid.borrower");
      return ServiceResponse.success("success", data);
    } catch (error) {
      return ServiceResponse.fail("Database Error", error);
    }
  }

  async getUserLends(
    userId: string
  ): Promise<IGenericReturnType<IUser[] | unknown>> {
    try {
      const data = await knex("user")
        .select(
          "user.id",
          "user.name",
          "user.email",
          "borrowbid.amount",
          "borrowbid.rate",
          "borrowbid.duration"
        )
        .from("user")
        .innerJoin("borrowbid", "user.id", "borrowbid.borrower")
        .where("user.id", "borrowbid.borrower");
      return ServiceResponse.success("success", data);
    } catch (error) {
      return ServiceResponse.fail("Database Error", error);
    }
  }

  async updateUser(user: IUser): Promise<IGenericReturnType<Number | unknown>> {
    try {
      const data = await knex("user").update(user).where("id", user.id);
      return ServiceResponse.success("success user update", data);
    } catch (error) {
      return ServiceResponse.fail("failed to update user", error);
    }
  }

  async deleteUser(
    userId: string
  ): Promise<IGenericReturnType<number | unknown>> {
    try {
      const data = await knex("user").del().where("id", userId);
      return ServiceResponse.success("Failed to delete", data);
    } catch (error) {
      return ServiceResponse.fail("Database Error", error);
    }
  }

  
}
