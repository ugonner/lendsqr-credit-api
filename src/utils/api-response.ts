import { IGenericResponse } from "../typings";

export class ApiResponse {
  constructor() {}
  static fail<T>(
    message: string,
    statusCode: number,
    data: T
  ): IGenericResponse<T> {
    return { message, status: false, statusCode, data };
  }

  static success<T>(
    message: string,
    statusCode: number,
    data: T 
  ): IGenericResponse<T> {
    return { message, status: true, statusCode, data };
  }

}