import { Account } from "../transaction/transaction.model";
import { TransactionService } from "../transaction/transaction.service";
import { IGenericResponse, IUser } from "../typings";
import { ApiResponse } from "../utils/api-response";
import { ServiceResponse } from "../utils/service-response";
import { UserRepository } from "./user.repository";

export class UserService {
  userRepository: UserRepository;
  transactionService: TransactionService;
  constructor() {
    this.userRepository = new UserRepository();
    this.transactionService = new TransactionService();
  }

  async createUser(user: IUser): Promise<IGenericResponse<number | unknown>> {
    const userExists = (await this.userRepository.getUser(user.email)).data as number[];
    if(userExists && userExists[0] > 0) return ApiResponse.fail("email already exists", 400, user);
    
    const returnData = await this.userRepository.createUser(user);
    const createdUser = returnData.data as number[];
    if (returnData.status) {
      const userAccount: Account = {userId: createdUser[0], balance: 0.00 }
      await this.transactionService.createAccount(userAccount);
      return ApiResponse.success("user created", 201, returnData.data);
    }
    return ApiResponse.fail(
      "user not created",
      returnData.status,
      returnData.data
    );
  }

  async updateUser(user: IUser): Promise<IGenericResponse<number | unknown>> {
    const returnData = await this.userRepository.updateUser(user);
    if (returnData.status) {
      return ApiResponse.success("user updated", 201, returnData.data);
    }
    return ApiResponse.fail(
      "user not updated",
      returnData.status,
      returnData.data
    );
  }

  async getUser(userid: string): Promise<IGenericResponse<IUser | unknown>> {
    const returnData = await this.userRepository.getUser(userid);
    if (returnData.status) {
      return ApiResponse.success("user found", 200, returnData.data);
    }
    return ApiResponse.fail(
      "user not found",
      returnData.status,
      returnData.data
    );
  }

  async deleteUser(
    userid: string
  ): Promise<IGenericResponse<number | unknown>> {
    const returnData = await (await this.userRepository.deleteUser(userid));
    if (returnData.status) {
      return ApiResponse.success("user found", 200, returnData.data);
    }
    return ApiResponse.fail(
      "user not found",
      returnData.status,
      returnData.data
    );
  }
  
  async loginUser(
    email: string, userToken: string
  ): Promise<IGenericResponse<number | unknown>> {
    const returnData = await this.userRepository.getUser(email);
    console.log(returnData);
    if (!returnData.status) {
      return ApiResponse.fail("Email not found, sign up", 400, returnData.data);
    }
    if(userToken !== process.env.AUTH_TOKEN) return ApiResponse.fail("not authenticated ", 400, returnData.data);
    const data = returnData.data as IUser;
    const authToken = process.env.AUTH_TOKEN;
    return ApiResponse.success(
      "logged in successfull",
      200,
      {...data, authToken}
    );
  }

}