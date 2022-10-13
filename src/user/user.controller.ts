import { IUser } from "../typings";
import { UserService } from "./user.service";
import { Request, response, Response } from "express";

export class UserController {
  userservice: UserService;
  constructor() {
    this.userservice = new UserService();
  }

  async createUser(req: Request, res: Response): Promise<Response> {
    const { name, email, password, role } = req.body;
    const user: IUser = { email, name, password, role };
    const data = await this.userservice.createUser(user);
    return res.json(data);
  }

  async getUser(req: Request, res: Response): Promise<Response> {
    const userId = req.params.userId;
    const user = await this.userservice.getUser(userId);
    return res.json(user);
  }

  async updateUser(req: Request, res: Response): Promise<Response> {
    const { id, name, email } = req.body;
    const user: IUser = { id, email, name };
    const data = await this.userservice.updateUser(user);
    return res.json(data);
  }

  async assignRole(req: Request, res: Response): Promise<Response> {
    const { id, name, email, role } = req.body;
    const user: IUser = { id, email, name, role };
    const data = await this.userservice.updateUser(user);
    return res.json(data);
  }

  async login(req: Request, res: Response): Promise<Response> {
    const { email, authToken } = req.body;
    const data = await this.userservice.loginUser(email, authToken);
    if (!data.status) return res.json(data);
    const userData = <IUser>data.data;
    res.setHeader(`${process.env.LS_TOKEN}`, "Bearer "+<string>userData?.role);
    return res.json(data);
  }
}