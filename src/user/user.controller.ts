import { IUser } from "../typings";
import { UserService } from "./user.service";
import { Request, response, Response } from "express";

export class UserController {
  userservice: UserService;
  constructor() {
    this.userservice = new UserService();
  }

  async createUser(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;
    const user: IUser = { email, name, password };
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
    const user: IUser = { id, email, name};
    const data = await this.userservice.updateUser(user);
    return res.json(data);
  }

  async login(req: Request, res: Response): Promise<Response> {
    const { email, authToken } = req.body;
    const data = await this.userservice.loginUser(email, authToken);
    return res.json(data);
  }
}