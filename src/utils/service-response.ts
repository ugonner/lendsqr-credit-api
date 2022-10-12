import { IGenericResponse, IGenericReturnType } from "../typings";

export class ServiceResponse {
  constructor() {}
  static fail<T>(
    message: string,
    data: T
  ): IGenericReturnType<T> {
    return { message, status: false, data };
  }

  static success<T>(
    message: string,
    data: T
  ): IGenericReturnType<T> {
    return { message, status: true, data };
  }

}