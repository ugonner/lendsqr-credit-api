import { Router } from "express"
import { UserController } from "./user.controller";
import { Request, Response } from "express";
const userController = new UserController();
const router = Router();
router.post("/register", (req: Request, res: Response) => {
  userController.createUser(req, res);
});
router.post("/login", (req: Request, res: Response) => {
  userController.login(req, res);
});
router.get("/:userId", (req: Request, res: Response) => {
  userController.getUser(req, res);
});
router.get("/:userId", (req: Request, res: Response) => {
  userController.getUser(req, res);
});
export default router