
export interface IGenericReturnType<T> {
  message: string;
  status: Boolean;
  data: T;
}

export interface IGenericResponse<T> extends IGenericReturnType<T> {
  statusCode: number;
}

export interface IUser {
  id?: number;
  name: string;
  email: string;
  password?: string;
  role?: string;
}

