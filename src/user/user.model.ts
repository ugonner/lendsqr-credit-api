import { IUser } from "../typings";

export class User implements IUser {
    name: string = "";
    email: string = "";
    password?: string = "";
}